import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Avatar, Button, Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../../redux/user/userSlice";
import { motion } from "framer-motion";
import GlowingButton from "./GlowingButton";
import "../../styles/Glow.css";
import "../../styles/Header.css";

const container = {
  hide: {
    y: -100,
    opacity: 0,
    transition: {
      staggerDirection: -1,
    },
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      staggerDirection: 1,
    },
  },
};

const item = {
  hide: {
    y: -100,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
  },
};

export default function Header({ activeTab, setActiveTab }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 992);
      if (window.innerWidth >= 992) {
        setIsNavbarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isNavbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isNavbarOpen]);

  const handleSignout = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/signout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setActiveTab(targetId);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
    setIsNavbarOpen(false);
  };

  const toggleNavbar = () => {
    if (isNavbarOpen) {
      document.querySelector(".navbar").classList.add("close");
      setTimeout(() => {
        setIsNavbarOpen(false);
        document.querySelector(".navbar").classList.remove("close");
      }, 500);
    } else {
      setIsNavbarOpen(true);
    }
  };

  return (
    <div className="header-wrapper">
      <div
        className={`header bg-slate-900 dark:bg-black ${
          isNavbarOpen ? "active" : ""
        }`}
      >
        <motion.div
          variants={container}
          initial="hide"
          animate="show"
          className="header-container"
        >
          <Link
            to="/"
            className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold"
            onClick={() => setActiveTab("home")}
          >
            <span className="px-2 py-1 bg-gradient-to-r from-gray-700 via-gray-500 to-gray-300 rounded-lg text-white">
              Preston&apos;s 
            </span>
            Portfolio
          </Link>
          <div
            className={`navbar bg-slate-900 dark:bg-black ${
              isNavbarOpen ? "open" : ""
            }`}
          >
            <button className="navbar-close" onClick={toggleNavbar}>
              <FaTimes />
            </button>
            <motion.div variants={item}>
              <Link to="#hero" onClick={(e) => handleSmoothScroll(e, "hero")}>
                <GlowingButton selectedPath={activeTab === "hero"}>
                  Home
                </GlowingButton>
              </Link>
            </motion.div>
            <motion.div variants={item}>
              <Link to="#about" onClick={(e) => handleSmoothScroll(e, "about")}>
                <GlowingButton selectedPath={activeTab === "about"}>
                  About
                </GlowingButton>
              </Link>
            </motion.div>
            <motion.div variants={item}>
              <Link
                to="#resume"
                onClick={(e) => handleSmoothScroll(e, "resume")}
              >
                <GlowingButton selectedPath={activeTab === "resume"}>
                  Resume
                </GlowingButton>
              </Link>
            </motion.div>
            <motion.div variants={item}>
              <Link
                to="#portfolio"
                onClick={(e) => handleSmoothScroll(e, "portfolio")}
              >
                <GlowingButton selectedPath={activeTab === "portfolio"}>
                  Portfolio
                </GlowingButton>
              </Link>
            </motion.div>
            <motion.div variants={item}>
              <Link
                to="#timeline"
                onClick={(e) => handleSmoothScroll(e, "timeline")}
              >
                <GlowingButton selectedPath={activeTab === "timeline"}>
                  Timeline
                </GlowingButton>
              </Link>
            </motion.div>
            <motion.div variants={item}>
              <Link to="#blogs" onClick={(e) => handleSmoothScroll(e, "blogs")}>
                <GlowingButton selectedPath={activeTab === "blogs"}>
                  Blogs
                </GlowingButton>
              </Link>
            </motion.div>
            <motion.div variants={item}>
              <Link
                to="#contact"
                onClick={(e) => handleSmoothScroll(e, "contact")}
              >
                <GlowingButton selectedPath={activeTab === "contact"}>
                  Contact
                </GlowingButton>
              </Link>
            </motion.div>
          </div>
          <div className="flex items-center gap-2">
            {currentUser ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar alt="user" img={currentUser.profilePicture} rounded />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">@{currentUser.username}</span>
                  <span className="block text-sm font-medium truncate">
                    {currentUser.email}
                  </span>
                </Dropdown.Header>
                <Link to={"/dashboard?tab=profile"}>
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
              </Dropdown>
            ) : (
              <Link to="/sign-in">
                <Button gradientDuoTone="purpleToBlue" outline>
                  Sign In
                </Button>
              </Link>
            )}
            {!isLargeScreen && !isNavbarOpen && (
              <Button className="navbar-toggle" onClick={toggleNavbar}>
                <FaBars />
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

Header.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};
