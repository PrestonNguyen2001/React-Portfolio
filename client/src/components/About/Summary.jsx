import React from "react";

import { motion } from "framer-motion";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";
import ProfileImage from "../../assets/images/ProfileImage.png";

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

const Summary = () => (
  <motion.div className="grid-list" variants={containerVariants}>
    <motion.figure
      className="about-banner img-holder"
      style={{ "--width": "", "--height": "" }}
      data-tilt
      variants={itemVariants}
    >
      <img
        src={ProfileImage}
        width="370"
        height="220"
        loading="lazy"
        alt="about banner"
        className="img-cover"
      />
    </motion.figure>
    <motion.div className="about-content" variants={containerVariants}>
      <motion.div className="about-details" variants={itemVariants}>
        <h2 className="h4 title section-title text-light-text dark:text-dark-text">
          Meet Preston Nguyen
        </h2>

        <p className="section-text text-gray-600 dark:text-gray-300">
          Hi, I'm Preston, a coding bootcamp student with a passion for
          technology and creativity. My journey in tech began with a curiosity
          for how things work and a desire to create solutions that make a
          difference.
        </p>
        <p className="section-text text-gray-600 dark:text-gray-300">
          Outside of coding, I love exploring new hobbies and activities that
          keep me inspired and motivated. Whether it's experimenting with new
          recipes, hiking trails, or diving into a good book, I believe in
          maintaining a balanced lifestyle.
        </p>

        <motion.ul className="about-list" variants={containerVariants}>
          <motion.li className="about-item" variants={itemVariants}>
            <p className="list-title text-light-text dark:text-dark-text">
              Name
            </p>
            <span className="span title h5 text-light-text dark:text-dark-text">
              Preston Nguyen
            </span>
          </motion.li>

          <motion.li className="about-item" variants={itemVariants}>
            <p className="list-title text-light-text dark:text-dark-text">
              Phone Number
            </p>
            <span className="span title h5 text-light-text dark:text-dark-text">
              (703) -973-8176
            </span>
          </motion.li>

          <motion.li className="about-item" variants={itemVariants}>
            <p className="list-title text-light-text dark:text-dark-text">
              Email Address
            </p>
            <span className="span title h5 text-light-text dark:text-dark-text">
              prestonnguyen2001@gmail.com
            </span>
          </motion.li>

          <motion.li className="about-item" variants={itemVariants}>
            <p className="list-title text-light-text dark:text-dark-text">
              Social Network
            </p>
            <div className="social-list flex space-x-3">
              <a
                href="#"
                className="social-link h6 text-light-text dark:text-dark-text"
                title="Facebook"
              >
                <BsFacebook />
              </a>
              <a
                href="#"
                className="social-link h6 text-light-text dark:text-dark-text"
                title="Instagram"
              >
                <BsInstagram />
              </a>
              <a
                href="#"
                className="social-link h6 text-light-text dark:text-dark-text"
                title="Twitter"
              >
                <BsTwitter />
              </a>
              <a
                href="#"
                className="social-link h6 text-light-text dark:text-dark-text"
                title="Github"
              >
                <BsGithub />
              </a>
            </div>
          </motion.li>
        </motion.ul>
      </motion.div>
    </motion.div>
  </motion.div>
);

export default Summary;
