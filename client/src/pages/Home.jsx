import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
// import { useEffect, useState } from "react";
// import PostCard from "../components/PostCard";
import Type from "../components/Type";
import Home2 from "./Home2";

export default function Home() {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await fetch("/api/post/getPosts");
  //     const data = await res.json();
  //     setPosts(data.posts);
  //   };
  //   fetchPosts();
  // }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-6xl">
          Welcome To My Personal Portfolio
        </h1>
        <div
          style={{
            padding: 10,
            textAlign: "left",
            width: "100%",
            maxWidth: 500,
            fontSize: 20,
          }}
        >
          <Type />
        </div>
        <p className="text-white dark:text-slate-200">
          Here you can explore my projects, learn more about my skills and
          interests, and get in touch if you have any questions.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>

      {/* <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div> */}

      <Home2 />
    </div>
  );
}
