// client/src/components/AboutContent.jsx

import { motion } from "framer-motion";
import aboutImg from "../../assets/images/about.png";

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

const AboutContent = () => (
  <motion.div className="grid-list" variants={containerVariants}>
    <motion.figure
      className="about-banner img-holder"
      style={{ "--width": "", "--height": "" }}
      data-tilt
      variants={itemVariants}
    >
      <img
        src={aboutImg}
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
          A very small stage in a vast cosmic.
        </h2>

        <p className="section-text text-gray-600 dark:text-gray-300">
          A very small stage in a vast cosmic arena great turbulent clouds
          encyclo-paedia galactica star stuff harvesting star light the carbon
          in our apple pies realm of the galaxies
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
            <div className="social-list">
              <a
                href="#"
                className="social-link h6 text-light-text dark:text-dark-text"
                title="Facebook"
              >
                Fb.
              </a>
              <a
                href="#"
                className="social-link h6 text-light-text dark:text-dark-text"
                title="Behance"
              >
                Be.
              </a>
              <a
                href="#"
                className="social-link h6 text-light-text dark:text-dark-text"
                title="Linkedin"
              >
                Ln.
              </a>
              <a
                href="#"
                className="social-link h6 text-light-text dark:text-dark-text"
                title="Dribbble"
              >
                Dr.
              </a>
            </div>
          </motion.li>
        </motion.ul>
      </motion.div>
    </motion.div>
  </motion.div>
);

export default AboutContent;
