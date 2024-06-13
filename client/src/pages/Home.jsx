import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import Type from "../components/Type";
import Home2 from "./Home2";
import VanillaTilt from "vanilla-tilt";
import profileImage from "../../../public/assets/images/ProfileImage.png";
import heroShape1 from "../../../public/assets/images/hero-shape-1.png";
import heroShape2 from "../../../public/assets/images/hero-shape-2.png";
import About from "./About";

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
    <div id="home" className={`${loading ? "hidden" : ""}`}>
      <div className="hero text-center animate-fadeIn" id="home">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="h1 title animate-slideInLeft">
              Welcome To My Personal Portfolio
            </h1>
            <Type />
            <div className="wrapper">
              <Link
                to="/search"
                className="mt-20 btn bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition duration-200 animate-bounce"
              >
                View All Posts
              </Link>
            </div>
          </div>
          <div className="banner-outline has-after" ref={tiltRef} data-tilt>
            <div
              className="hero-banner img-holder has-after"
              style={{ "--width": "400", "--height": "580" }}
              ref={tiltRef}
              data-tilt
            >
              <img
                src={profileImage}
                width="500"
                height="680"
                alt="Preston Nguyen"
                className="img-cover"
              />
            </div>
            <span className="span title">Preston Nguyen</span>
          </div>
        </div>
        <img
          src={heroShape1}
          width="559"
          height="232"
          alt="shape"
          className="shape shape-1"
        />
        <img
          src={heroShape2}
          width="1358"
          height="497"
          alt="shape"
          className="shape shape-2"
        />
      </div>
      {/* <div className="flex flex-col gap-6 p-10 px-3 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold lg:text-5xl mt-8">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 transform hover:scale-105 transition duration-300">
            <h3 className="text-xl font-semibold">My Projects</h3>
            <p className="text-gray-800 dark:text-slate-200">
              Here you can explore my projects, learn more about my skills and
              interests, and get in touch if you have any questions.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 transform hover:scale-105 transition duration-300">
            <h3 className="text-xl font-semibold">My Skills</h3>
            <p className="text-gray-800 dark:text-slate-200">
              I am proficient in various programming languages and technologies,
              including JavaScript, React, and more.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 transform hover:scale-105 transition duration-300">
            <h3 className="text-xl font-semibold">Contact Me</h3>
            <p className="text-gray-800 dark:text-slate-200">
              Feel free to reach out if you have any questions or would like to
              collaborate on a project.
            </p>
          </div>
        </div>
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
      </div> */}
      <div id="about">
        <About />
      </div>
    </div>
  );
}
