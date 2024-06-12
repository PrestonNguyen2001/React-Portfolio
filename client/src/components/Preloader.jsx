import PropTypes from "prop-types";
import "../assets/css/Preloader.css";

const Preloader = ({ isLoaded }) => {
  console.log("Preloader rendered with isLoaded:", isLoaded);
  return (
    <div className={`preloader ${isLoaded ? "loaded" : ""}`}>
      <div className="left-box"></div>
      <div className="right-box"></div>
      <span className="line"></span>
    </div>
  );
};

Preloader.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
};

export default Preloader;
