import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Textarea } from "flowbite-react";
import PropTypes from "prop-types";
import "../../styles/CommentSection.css";

const CommentForm = ({ postId, onNewComment }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }

    try {
      console.log("Submitting new comment:", comment);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/comment/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: comment,
            postId,
            userId: currentUser._id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      const newComment = await response.json();
      console.log("New comment added:", newComment);
      onNewComment(newComment);
      setComment("");
      setCommentError(null);
      setIsFormExpanded(false);
    } catch (error) {
      setCommentError(error.message);
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="flex items-start gap-2 my-5 text-gray-500 text-sm">
      {currentUser ? (
        <>
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
        </>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  onNewComment: PropTypes.func.isRequired,
};

export default CommentForm;
