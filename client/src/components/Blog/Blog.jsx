import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../redux/post/postSlice";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import BlogPost from "./BlogPost";
import "../../styles/Blog.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const Blog = () => {
  const dispatch = useDispatch();
  const { posts, totalPosts, lastMonthPosts } = useSelector(
    (state) => state.post
  );
  const [startIndex, setStartIndex] = useState(0);
  const limit = 9;
  const order = "desc";
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    dispatch(getPosts({ startIndex, limit, order }));
  }, [dispatch, startIndex, limit, order]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Log the posts only once when the component is initially rendered
  useEffect(() => {
    console.log("Posts being passed to BlogPost:", posts);
  }, [posts]);

  const handleLoadMore = () => {
    setStartIndex((prevIndex) => prevIndex + limit);
  };

  return (
    <motion.div
      ref={ref}
      className="blog-container"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <h1 className="blog-title">Blogs</h1>
      <div className="blog-stats">
        <p>Total Posts: {totalPosts}</p>
        <p>Posts in Last Month: {lastMonthPosts}</p>
      </div>
      <motion.div className="blog-posts" variants={containerVariants}>
        {posts.map((post) => {
          if (!post.slug) {
            console.error("Error: Post data is missing or incomplete:", post);
            return null;
          }
          return (
            <motion.div
              key={post._id}
              className="blog-post"
              variants={itemVariants}
            >
              <BlogPost post={post} />
            </motion.div>
          );
        })}
      </motion.div>
      {startIndex + limit < totalPosts && (
        <motion.button
          onClick={handleLoadMore}
          className="load-more-button"
          variants={itemVariants}
        >
          Load More
        </motion.button>
      )}
    </motion.div>
  );
};

export default Blog;
