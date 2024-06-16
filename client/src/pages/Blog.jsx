import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../redux/post/postSlice";
import BlogPost from "../components/Blog/BlogPost"; // Import the BlogPost component
import "../styles/Blog.css";

const Blog = () => {
  const dispatch = useDispatch();
  const { posts, totalPosts, lastMonthPosts } = useSelector(
    (state) => state.post
  );
  const [startIndex, setStartIndex] = useState(0);
  const limit = 9;
  const order = "desc";

  useEffect(() => {
    dispatch(getPosts({ startIndex, limit, order }));
  }, [dispatch, startIndex, limit, order]);

  const handleLoadMore = () => {
    setStartIndex((prevIndex) => prevIndex + limit);
  };

  return (
    <div className="blog-container">
      <h1 className="blog-title">Blogs</h1>
      <div className="blog-stats">
        <p>Total Posts: {totalPosts}</p>
        <p>Posts in Last Month: {lastMonthPosts}</p>
      </div>
      <div className="blog-posts">
        {posts.map((post) => (
          <BlogPost key={post._id} post={post} />
        ))}
      </div>
      {startIndex + limit < totalPosts && (
        <button onClick={handleLoadMore} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
};

export default Blog;
