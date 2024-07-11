import React from "react";
import PropTypes from "prop-types";
import "../../styles/StatItem.css";
import {
  FaUserFriends,
  FaUser,
  FaCalendarAlt,
  FaSync,
  FaBook,
  FaLock,
  FaGlobe,
  FaBuilding,
  FaCodeBranch,
  FaCode,
  FaFileAlt,
  FaStar,
  FaExclamationCircle,
} from "react-icons/fa";

const icons = {
  Followers: FaUserFriends,
  Following: FaUser,
  "Joined date": FaCalendarAlt,
  "Updated at": FaSync,
  "Total repositories": FaBook,
  "Private repositories": FaLock,
  "Public repositories": FaGlobe,
  "Total contributions": FaCode,
  "Total projects": FaBuilding,
  "Total stars": FaStar,
  "Total issues": FaExclamationCircle,
};

const StatItem = ({ title, value, index }) => {
  const Icon = icons[title];

  return (
    <li className="stat-item">
      {Icon && <Icon className="stat-item__icon" />}
      <span>{title}:</span>
      <strong>{value}</strong>
    </li>
  );
};

StatItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  index: PropTypes.number.isRequired,
};

export default StatItem;
