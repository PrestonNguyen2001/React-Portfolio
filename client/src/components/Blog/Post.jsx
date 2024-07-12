import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../Comment/CommentSection";
import "../../styles/Post.css";

const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/posts/slug/${slug}` // Ensure the endpoint is correct
        );
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
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full text-xs">
        <p className="post-author">By: {post.userId}</p>
        <p className="post-date">Published on: {formattedDate}</p>
      </div>

      <div className="post-content-container">
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
      <CommentSection postId={post._id} />
    </div>
  );
};

export default Post;
