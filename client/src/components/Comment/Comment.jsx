import moment from "moment";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";
import PropTypes from "prop-types";
import "../../styles/CommentSection.css";
import { getToken } from "../../utils/authUtils";

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        console.log(`Fetching user data for userId: ${comment.userId}`);
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        console.log("User data fetched:", data);
        if (res.ok) {
          setUser(data);
        } else {
          console.error(
            "Failed to fetch user data:",
            res.status,
            res.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    getUser();
  }, [comment.userId]);

  const handleLike = async () => {
    try {
      console.log("Liking comment:", comment._id);
      const token = getToken();
      if (!token) {
        console.error("No authentication token found");
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/comment/likeComment/${
          comment._id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to like comment");
      }
      onLike(comment._id);
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const token = getToken();
      if (!token) {
        console.error("No authentication token found");
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/comment/editComment/${
          comment._id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: editedContent }),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to edit comment");
      }
      setIsEditing(false);
      onEdit(comment._id, editedContent);
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      console.log("Deleting comment:", comment._id);
      const token = getToken();
      if (!token) {
        console.error("No authentication token found");
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/comment/deleteComment/${
          comment._id
        }`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to delete comment");
      }
      onDelete(comment._id);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
              <button
                type="button"
                onClick={handleLike}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="text-gray-400 hover:text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="text-gray-400 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
    numberOfLikes: PropTypes.number.isRequired,
  }).isRequired,
  onLike: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Comment;
