import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../styles/About.css";
import Summary from "../components/About/Summary";
import Skills from "../components/About/Skills";
import Interests from "../components/About/Interests";
import Strengths from "../components/About/Strengths";
import HeatmapCalendar from "../components/Calendar/HeatmapCalendar";
 

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

export default function About() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    controls.start("hidden");
    setTimeout(() => {
      controls.start("visible");
    }, 100);
  }, [activeTab]);

  return (
    <motion.div
      ref={ref}
      className="relative z-20 py-20 w-full bg-white dark:bg-black-100"
      initial="hidden"
      animate={controls}
    >
      <h1 className="heading">
        About <span className="text-purple">Me</span>
      </h1>
      <motion.h1
        className="h2 mb-20 title text-center text-light-text dark:text-dark-text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      ></motion.h1>
      <div className="tab-container">
        <ul className="tab-btn-list">
          <li className="tab-btn-item">
            <motion.button
              className={`tab-btn title h6 ${
                activeTab === "about" ? "active" : ""
              }`}
              onClick={() => setActiveTab("about")}
              variants={itemVariants}
            >
              Summary
            </motion.button>
          </li>
          <li className="tab-btn-item">
            <motion.button
              className={`tab-btn title h6 ${
                activeTab === "skills" ? "active" : ""
              }`}
              onClick={() => setActiveTab("skills")}
              variants={itemVariants}
            >
              Skills
            </motion.button>
          </li>

          <li className="tab-btn-item">
            <motion.button
              className={`tab-btn title h6 ${
                activeTab === "strengths" ? "active" : ""
              }`}
              onClick={() => setActiveTab("strengths")}
              variants={itemVariants}
            >
              Strengths
            </motion.button>
          </li>
          <li className="tab-btn-item">
            <motion.button
              className={`tab-btn title h6 ${
                activeTab === "interests" ? "active" : ""
              }`}
              onClick={() => setActiveTab("interests")}
              variants={itemVariants}
            >
              Interests
            </motion.button>
          </li>
        </ul>

        <div className="tab-content active">
          {activeTab === "about" && <Summary />}
          {activeTab === "skills" && <Skills />}
          {activeTab === "interests" && <Interests />}
          {activeTab === "strengths" && <Strengths />}
        </div>
      </div>
    </motion.div>
  );
}
