import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import Type from "../components/Type";
import Home2 from "./Home2";
import VanillaTilt from "vanilla-tilt";
import profileImage from "../assets/images/profilePicture.png";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const tiltRef = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tiltRef.current, {
      max: 25,
      speed: 400,
    });

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.classList.add("loaded");
    }, 2000);

    return () => {
      clearTimeout(timer);
      if (tiltRef.current) {
        tiltRef.current.vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <div className={`${loading ? "hidden" : ""}`}>
      <div className="hero relative text-center bg-cover bg-center h-screen">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-row items-center justify-center h-full text-white">
          <div className="flex flex-col items-start justify-center h-full text-left p-10">
            <h1 className="text-4xl font-extrabold lg:text-6xl mb-6">
              Welcome To My Personal Portfolio
            </h1>
            <Type />
            <Link
              to="/search"
              className="btn bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition duration-200"
            >
              View All Posts
            </Link>
          </div>
          <div className="flex items-center justify-center h-full p-10">
            <div className="banner-outline has-after" ref={tiltRef} data-tilt>
              <div
                className="hero-banner img-holder has-after"
                style={{ "--width": "500", "--height": "680" }}
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="img-cover"
                  width="500"
                  height="680"
                />
              </div>
              <span className="span title">Preston Nguyen</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-10 px-3 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold lg:text-5xl mt-8">About Me</h2>
        <div
          style={{
            padding: 10,
            textAlign: "left",
            width: "100%",
            maxWidth: 500,
            fontSize: 20,
          }}
        ></div>
        <p className="text-gray-800 dark:text-slate-200">
          Here you can explore my projects, learn more about my skills and
          interests, and get in touch if you have any questions.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
        <div className="p-3 bg-amber-100 dark:bg-slate-700 rounded-lg shadow-md">
          <CallToAction />
        </div>
        <Home2 />
      </div>
    </div>
  );
}
