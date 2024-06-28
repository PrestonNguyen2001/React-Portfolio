import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  return (
    <div className="post-container">
      <h1 className="post-title">{post.title}</h1>
      {post.image && (
        <img src={post.image} alt={post.title} className="post-image" />
      )}
      <p className="post-category">Category: {post.category}</p>
      <p className="post-content">{post.content}</p>
      <p className="post-author">By: {post.userId}</p>
    </div>
  );
};

export default Post;
