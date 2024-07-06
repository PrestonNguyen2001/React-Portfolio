import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { getAuthHeaders } from "../../utils/authUtils";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      console.log("Fetching users...");
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/user/getusers`,
          {
            headers: {
              "Content-Type": "application/json",
              ...getAuthHeaders(),
            },
            credentials: "include",
          }
        );
        console.log("Fetch users response:", res);
        const data = await res.json();
        console.log("Fetch users data:", data);
        if (res.ok) {
          setUsers(data.users);
          setShowMore(data.users.length >= 9);
          console.log("Users and Show More set successfully");
        } else {
          console.error("Error fetching users:", data.message);
          setError(data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser.isAdmin) {
      console.log("Current user is admin, fetching users...");
      fetchUsers();
    } else {
      console.log("Current user is not admin or not logged in");
    }
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    console.log("Fetching more users from index:", startIndex);
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/user/getusers?startIndex=${startIndex}`,
        {
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          credentials: "include",
        }
      );
      console.log("Fetch more users response:", res);
      const data = await res.json();
      console.log("Fetch more users data:", data);
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        setShowMore(data.users.length >= 9);
        console.log("More users and Show More set successfully");
      } else {
        console.error("Error fetching more users:", data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error("Error fetching more users:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    console.log("Deleting user with ID:", userIdToDelete);
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/delete/${userIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          credentials: "include",
        }
      );
      console.log("Delete user response:", res);
      const data = await res.json();
      console.log("Delete user data:", data);
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
        console.log("User deleted and modal closed successfully");
      } else {
        console.error("Error deleting user:", data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin ? (
        <>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {users.length > 0 ? (
            <>
              <Table hoverable className="shadow-md">
                <Table.Head>
                  <Table.HeadCell>Date created</Table.HeadCell>
                  <Table.HeadCell>User image</Table.HeadCell>
                  <Table.HeadCell>Username</Table.HeadCell>
                  <Table.HeadCell>Email</Table.HeadCell>
                  <Table.HeadCell>Admin</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                {users.map((user) => (
                  <Table.Body className="divide-y" key={user._id}>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                        <img
                          src={user.profilePicture}
                          alt={user.username}
                          className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                        />
                      </Table.Cell>
                      <Table.Cell>{user.username}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>
                        {user.isAdmin ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaTimes className="text-red-500" />
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          onClick={() => {
                            setShowModal(true);
                            setUserIdToDelete(user._id);
                            console.log("Set userIdToDelete to:", user._id);
                          }}
                          className="font-medium text-red-500 hover:underline cursor-pointer"
                        >
                          Delete
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
              {showMore && (
                <button
                  onClick={handleShowMore}
                  className="w-full text-teal-500 self-center"
                >
                  Show more
                </button>
              )}
            </>
          ) : (
            !loading && <p>You have no users yet!</p>
          )}
        </>
      ) : (
        <p>You are not authorized to view this page.</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I&apos;m sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
