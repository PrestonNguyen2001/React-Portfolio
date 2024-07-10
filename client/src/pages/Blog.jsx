import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../redux/post/postSlice";
import "../styles/Blog.css";
import { MovingCards } from "../components/Effects/MovingCards"; // Adjust the path according to your folder structure

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

  useEffect(() => {
    console.log("Posts being passed to BlogPost:", posts);
  }, [posts]);

  const handleLoadMore = () => {
    setStartIndex((prevIndex) => prevIndex + limit);
  };

  const blogItems = posts.map((post) => ({
    quote: post.description,
    name: post.title,
    title: "Blog Post",
    image: post.image,
    link: `/posts/${post.slug}`,
  }));

  return (
    <section id="blogs" className="py-20">
      <h1 className="heading">
        Latest
        <span className="text-purple"> Blogs</span>
      </h1>
      <div className="blog-stats">
        <p>Total Posts: {totalPosts}</p>
        <p>Posts in Last Month: {lastMonthPosts}</p>
      </div>
      <div className="flex flex-col items-center max-lg:mt-10">
        <div className="h-[60vh] md:h-[40rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden mb-10">
          <MovingCards items={blogItems} direction="right" speed="slow" />
        </div>
      </div>
      {startIndex + limit < totalPosts && (
        <button onClick={handleLoadMore} className="load-more-button">
          Load More
        </button>
      )}
    </section>
  );
};

export default Blog;
