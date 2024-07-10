import PropTypes from "prop-types";
import { FaLocationArrow } from "react-icons/fa6";

const ProjectCard = ({
  imgPath,
  title,
  description,
  ghLink,
  demoLink,
  iconLists,
}) => {
  return (
    <div className="relative z-50">
      <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
        <div
          className="relative w-full h-full overflow-hidden lg:rounded-3xl"
          style={{ backgroundColor: "#13162D" }}
        >
          <img src="/bg.png" alt="bgimg" />
        </div>
        <img src={imgPath} alt="cover" className="z-10 absolute bottom-0" />
      </div>
      <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
        {title}
      </h1>
      <p
        className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
        style={{ color: "#BEC1DD", margin: "1vh 0" }}
      >
        {description}
      </p>
      <div className="flex items-center justify-between mt-7 mb-3">
        <div className="flex items-center">
          {iconLists.map((icon, index) => (
            <div
              key={`icon-${index}`} // Unique key for each icon
              className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
              style={{ transform: `translateX(-${5 * index + 2}px)` }}
            >
              <img src={icon} alt={`icon-${index}`} className="p-2" />
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center">
          <p className="flex lg:text-xl md:text-xs text-sm text-purple">
            Check Live Site
          </p>
          <FaLocationArrow className="ms-3" color="#CBACF9" />
        </div>
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
  iconLists: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProjectCard;
