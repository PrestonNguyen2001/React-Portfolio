import PropTypes from "prop-types";

const ProjectCard = ({ imgPath, title, description, ghLink, demoLink }) => {
  return (
    <div className="bg-light-background dark:bg-gray-800 rounded-lg shadow-glow p-5 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-glow-hover">
      <img src={imgPath} alt={title} className="rounded-md mb-4" />
      <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 my-3">{description}</p>
      <div className="flex justify-center gap-4 mt-4">
        <a
          href={ghLink}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
        >
          GitHub
        </a>
        {demoLink && (
          <a
            href={demoLink}
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition"
          >
            Demo
          </a>
        )}
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  imgPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ghLink: PropTypes.string.isRequired,
  demoLink: PropTypes.string,
};

export default ProjectCard;
