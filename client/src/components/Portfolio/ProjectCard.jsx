// client/src/components/Portfolio/ProjectCard.jsx
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const ProjectCard = ({
  imgPath,
  title,
  description,
  ghLink,
  demoLink,
  variants,
}) => {
  return (
    <motion.div
      className="bg-light-background dark:bg-gray-800 rounded-lg shadow-glow p-5 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-glow-hover"
      variants={variants}
    >
      <motion.img
        src={imgPath}
        alt={title}
        className="rounded-md mb-4"
        variants={variants}
      />
      <motion.h3
        className="text-xl font-semibold text-light-text dark:text-dark-text"
        variants={variants}
      >
        {title}
      </motion.h3>
      <motion.p
        className="text-gray-600 dark:text-gray-300 my-3"
        variants={variants}
      >
        {description}
      </motion.p>
      <motion.div
        className="flex justify-center gap-4 mt-4"
        variants={variants}
      >
        <motion.a
          href={ghLink}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
          variants={variants}
        >
          GitHub
        </motion.a>
        {demoLink && (
          <motion.a
            href={demoLink}
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition"
            variants={variants}
          >
            Demo
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  imgPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ghLink: PropTypes.string.isRequired,
  demoLink: PropTypes.string,
  variants: PropTypes.object.isRequired,
};

export default ProjectCard;
