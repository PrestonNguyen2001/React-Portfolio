import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../components/Comment/CommentSection";
import "../styles/Post.css";

const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setPost(data.post);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString();

  return (
    <div className="post-container">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-category">{post.category}</p>

      {post.image && (
        <img src={post.image} alt={post.title} className="post-image" />
      )}
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full  text-xs">
        <p className="post-author">By: {post.userId}</p>
        <p className="post-date">Published on: {formattedDate}</p>
      </div>

      <div className="post-content-container">
        <p className="post-content">{post.content}</p>
      </div>
      <CommentSection postId={post._id} />
    </div>
  );
};

export default Post;
