import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import "../../styles/CommentSection.css";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        console.log(`Fetching comments for postId: ${postId}`);
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/comment/getPostComments/${postId}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Comments fetched:", data);
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleNewComment = (newComment) => {
    setComments([newComment, ...comments]);
  };

  const handleLike = async (commentId) => {
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }

    try {
      console.log("Liking comment:", commentId);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/comment/likeComment/${commentId}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to like comment");
      }

      const updatedComment = await response.json();
      console.log("Comment liked:", updatedComment);
      setComments(
        comments.map((comment) =>
          comment._id === commentId ? updatedComment : comment
        )
      );
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  const handleEdit = async (commentId, editedContent) => {
    try {
      console.log("Editing comment:", commentId);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/comment/editComment/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: editedContent }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit comment");
      }

      const updatedComment = await response.json();
      console.log("Comment edited:", updatedComment);
      setComments(
        comments.map((comment) =>
          comment._id === commentId ? updatedComment : comment
        )
      );
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }

    try {
      console.log("Deleting comment:", commentId);
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/comment/deleteComment/${commentId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      console.log("Comment deleted:", commentId);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="comment-section">
      <CommentForm postId={postId} onNewComment={handleNewComment} />
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="modal-body">
            <HiOutlineExclamationCircle className="modal-icon" />
            <h3>Are you sure you want to delete this comment?</h3>
            <Button
              className="button"
              onClick={() => handleDelete(commentToDelete)}
            >
              Yes, delete it
            </Button>
            <Button className="button" onClick={() => setShowModal(false)}>
              No, cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

CommentSection.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default CommentSection;
