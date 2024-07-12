import React from "react";
import GitHubCalendar from "react-github-calendar";
import Tippy from "@tippyjs/react";
import { FaGithub } from "react-icons/fa";
import "../../styles/HeatmapCalendar.css"; 

const HeatmapCalendar = () => {
  const ensureFullYearData = (contributions) => {
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1);
    const endDate = new Date(currentYear, 11, 31);

    // Create a map of existing contributions for quick lookup
    const contributionsMap = new Map();
    contributions.forEach((day) => {
      contributionsMap.set(day.date, day);
    });

    // Generate contributions for each day of the year
    const allDays = [];
    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const dateString = date.toISOString().split("T")[0];
      const contribution = contributionsMap.get(dateString) || {
        date: dateString,
        count: 0,
      };
      contribution.level = getLevel(contribution.count);
      allDays.push(contribution);
    }

    return allDays;
  };

  const getLevel = (count) => {
    if (count > 20) return 4;
    if (count > 10) return 3;
    if (count > 5) return 2;
    if (count > 0) return 1;
    return 0;
  };

  const renderTooltip = (date, count) => (
    <div className="tooltip-card">
      <div className="date">{date.toDateString()}</div>
      <div className="icon">
        <FaGithub />
      </div>
      <div className="count">{count} contributions</div>
    </div>
  );

  return (
    <div className="activity-chart flex flex-wrap items-center justify-center ">
      <h3 className="heading">Contribution Insights</h3>
      <div className="activity-body mt-20">
        <div className="activity-calendar">
          <GitHubCalendar
            username="PrestonNguyen2001"
            transformData={ensureFullYearData}
            blockSize={14}
            blockMargin={5}
            fontSize={16}
            weekStart={1}
            theme={{
              light: ["#f0f0f0", "#c4edde", "#7ac7c4", "#f73859", "#384259"],
              dark: ["#383838", "#fcb2bf", "#cf56a1", "#8b2f97", "#511e78"],
            }}
            renderBlock={(block, activity) => (
              <Tippy
                key={activity.date}
                content={renderTooltip(new Date(activity.date), activity.count)}
                placement="top"
                animation="shift-away"
                arrow={true}
              >
                <g className={`calendar-block level-${activity.level}`}>
                  {block}
                </g>
              </Tippy>
            )}
          />
        </div>
      </div>
      <div className="activity-legend">
        <span className="legend-label">Less</span>
        <span className="legend-item color-github-0"></span>
        <span className="legend-item color-github-1"></span>
        <span className="legend-item color-github-2"></span>
        <span className="legend-item color-github-3"></span>
        <span className="legend-item color-github-4"></span>
        <span className="legend-label">More</span>
      </div>
    </div>
  );
};

export default HeatmapCalendar;
