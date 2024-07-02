import { useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "../styles/Timeline.css";
import educationIcon from "../assets/svg/education.svg";
import personalIcon from "../assets/svg/personal.svg";
import workIcon from "../assets/svg/work.svg";
import config from "../config"; // Import the config file

const Timeline = () => {
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/timeline`); // Use the base URL from config
        const data = await response.json();
        setTimelineData(data);
      } catch (error) {
        console.error("Error fetching timeline data:", error);
      }
    };

    fetchTimelineData();
  }, []);

  const getIcon = (iconName) => {
    switch (iconName) {
      case "education":
        return <img src={educationIcon} alt="Education Icon" />;
      case "personal":
        return <img src={personalIcon} alt="Personal Icon" />;
      case "work":
        return <img src={workIcon} alt="Work Icon" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 simple-clean-container">
      <h1 className="text-3xl font-bold text-center my-8 simple-clean-title">
        Timeline
      </h1>
      <VerticalTimeline>
        {timelineData.map((item, index) => (
          <VerticalTimelineElement
            key={index}
            date={item.date}
            icon={getIcon(item.icon)}
            iconStyle={{ background: "#607d8b", color: "#fff" }}
            contentStyle={{
              background: "#f1f1f1",
              color: "#37474f",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
            contentArrowStyle={{ borderRight: "7px solid  #f1f1f1" }}
          >
            <h3 className="vertical-timeline-element-title simple-clean-element-title">
              {item.title}
            </h3>
            <h4 className="vertical-timeline-element-subtitle simple-clean-element-subtitle">
              {item.location}
            </h4>
            <p className="simple-clean-element-content">{item.content}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Timeline;
