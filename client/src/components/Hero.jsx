import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import VanillaTilt from "vanilla-tilt";
import Type from "./Type";
import profileImage from "../assets/images/ProfileImage.png";
import heroShape1 from "../assets/images/hero-shape-1.png";
import heroShape2 from "../assets/images/hero-shape-2.png";

export default function Hero({ setHeroLoaded }) {
  const tiltRef = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tiltRef.current, {
      max: 25,
      speed: 400,
    });

    return () => {
      if (tiltRef.current) {
        tiltRef.current.vanillaTilt.destroy();
      }
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setHeroLoaded(true);
    }, 500); // Simulating hero section load
  }, [setHeroLoaded]);

  return (
    <section className="section hero text-center animate-fadeIn" id="home">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="h1 title animate-slideInLeft">Preston Nguyen</h1>
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
    </section>
  );
}

Hero.propTypes = {
  setHeroLoaded: PropTypes.func.isRequired,
};
