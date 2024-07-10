import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../utils/authUtils";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("Fetching posts...");
        const headers = getAuthHeaders();
        console.log("Auth headers:", headers);
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`, {
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          credentials: "include",
        });
        console.log("Fetch posts response:", res);
        const data = await res.json();
        console.log("Fetch posts data:", data);
        if (res.ok) {
          setPosts(data.posts || []);
        } else {
          console.error("Error fetching posts:", data.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };
    fetchPosts();
  }, []);

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      console.log("Deleting post with ID:", postIdToDelete);
      const headers = getAuthHeaders();
      console.log("Auth headers:", headers);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/posts/${postIdToDelete}/${
          currentUser._id
        }`,
        {
          method: "DELETE",
          credentials: "include",
          headers,
        }
      );
      console.log("Delete post response:", res);
      const data = await res.json();
      console.log("Delete post data:", data);
      if (res.ok) {
        setPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
      } else {
        console.error("Error deleting post:", data.message);
      }
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  return (
    <div>
      {currentUser.isAdmin && (
        <Link to={"/create-post"}>
          <Button
            type="button"
            gradientDuoTone="purpleToPink"
            className="w-full"
          >
            Create a post
          </Button>
        </Link>
      )}
      {posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <div key={post._id} className="mb-4">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <Button
                color="failure"
                onClick={() => {
                  setShowModal(true);
                  setPostIdToDelete(post._id);
                }}
              >
                Delete
              </Button>
              <Button
                color="primary"
                onClick={() => navigate(`/update-post/${post._id}`)}
              >
                Edit
              </Button>
            </div>
          ))}
        </>
      ) : (
        <p>You have no posts yet!</p>
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
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
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
