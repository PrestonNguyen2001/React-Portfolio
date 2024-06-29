import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Comment from "./Comment";
import { Modal, Button, Textarea } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import "../../styles/CommentSection.css"; // Import the new CSS

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comment/getPostComments/${postId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }

    try {
      const response = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      const newComment = await response.json();
      setComments([newComment, ...comments]);
      setComment("");
      setCommentError(null);
      setIsFormExpanded(false);
    } catch (error) {
      setCommentError(error.message);
    }
  };

  const handleLike = async (commentId) => {
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }

    try {
      const response = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Failed to like comment");
      }

      const updatedComment = await response.json();
      setComments(
        comments.map((comment) =>
          comment._id === commentId ? updatedComment : comment
        )
      );
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    try {
      const response = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit comment");
      }

      const updatedComment = await response.json();
      setComments(
        comments.map((c) => (c._id === comment._id ? updatedComment : c))
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
      const response = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="comment-section">
      {currentUser ? (
        <div className="flex items-start gap-2 my-5 text-gray-500 text-sm">
          <img
            className="h-10 w-10 object-cover rounded-full align-top"
            src={currentUser.profilePicture}
            alt=""
          />
          <form
            onClick={() => setIsFormExpanded(true)}
            onSubmit={handleSubmit}
            className={`comment-form ${isFormExpanded ? "expanded" : ""}`}
          >
            <Textarea
              className="textarea"
              placeholder="Add a comment..."
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onBlur={() => !comment && setIsFormExpanded(false)}
            />
            {isFormExpanded && (
              <div className="button-container">
                <Button
                  className="button"
                  type="button"
                  onClick={() => {
                    setIsFormExpanded(false);
                    setComment("");
                  }}
                >
                  Cancel
                </Button>
                <Button className="button" type="submit">
                  Comment
                </Button>
              </div>
            )}
          </form>
          {commentError && <p className="error">{commentError}</p>}
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
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
