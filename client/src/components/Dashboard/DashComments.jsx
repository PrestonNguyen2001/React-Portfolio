import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { getAuthHeaders } from "../../utils/authUtils"; // Ensure getAuthHeaders is imported correctly

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      console.log("Fetching comments...");
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/comment/getcomments`,
          {
            headers: {
              "Content-Type": "application/json",
              ...getAuthHeaders(),
            },
            credentials: "include",
          }
        );
        console.log("Fetch comments response:", res);
        const data = await res.json();
        console.log("Fetch comments data:", data);
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
          console.log("Comments and Show More set successfully");
        } else {
          console.error("Error fetching comments:", data.message);
          setError(data.message);
        }
      } catch (error) {
        console.error("Error fetching comments:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser.isAdmin) {
      console.log("Current user is admin, fetching comments...");
      fetchComments();
    } else {
      console.log("Current user is not admin or not logged in");
    }
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    console.log("Fetching more comments from index:", startIndex);
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/comment/getcomments?startIndex=${startIndex}`,
        {
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          credentials: "include",
        }
      );
      console.log("Fetch more comments response:", res);
      const data = await res.json();
      console.log("Fetch more comments data:", data);
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
        console.log("More comments and Show More set successfully");
      } else {
        console.error("Error fetching more comments:", data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error("Error fetching more comments:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async () => {
    console.log("Deleting comment with ID:", commentIdToDelete);
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/comment/deleteComment/${commentIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          credentials: "include",
        }
      );
      console.log("Delete comment response:", res);
      const data = await res.json();
      console.log("Delete comment data:", data);
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
        console.log("Comment deleted and modal closed successfully");
      } else {
        console.error("Error deleting comment:", data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error("Error deleting comment:", error.message);
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
          {comments.length > 0 ? (
            <>
              <Table hoverable className="shadow-md">
                <Table.Head>
                  <Table.HeadCell>Date updated</Table.HeadCell>
                  <Table.HeadCell>Comment content</Table.HeadCell>
                  <Table.HeadCell>Number of likes</Table.HeadCell>
                  <Table.HeadCell>PostId</Table.HeadCell>
                  <Table.HeadCell>UserId</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                {comments.map((comment) => (
                  <Table.Body className="divide-y" key={comment._id}>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>
                        {new Date(comment.updatedAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>{comment.content}</Table.Cell>
                      <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                      <Table.Cell>{comment.postId}</Table.Cell>
                      <Table.Cell>{comment.userId}</Table.Cell>
                      <Table.Cell>
                        <span
                          onClick={() => {
                            setShowModal(true);
                            setCommentIdToDelete(comment._id);
                            console.log(
                              "Set commentIdToDelete to:",
                              comment._id
                            );
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
                  className="w-full text-teal-500 self-center text-sm py-7"
                >
                  Show more
                </button>
              )}
            </>
          ) : (
            !loading && <p>You have no comments yet!</p>
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
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteComment}>
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
