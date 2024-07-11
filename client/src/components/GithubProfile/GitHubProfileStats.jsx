import React, { useEffect, useState } from "react";
import axios from "axios";
import StatItem from "./StatItem";
import "../../styles/GitHubProfileStats.css";

const GitHubProfileStats = () => {
  const [profileStats, setProfileStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await axios.get("/api/github-profile");
        const data = response.data;

        const profileData = {
          followers: data.followers || 0,
          following: data.following || 0,
          joinedDate: data.joinedDate || "N/A",
          updatedAt: data.updatedAt || "N/A",
          totalRepositories: data.totalRepositories || 0,
          privateRepositories: data.privateRepositories || 0,
          publicRepositories: data.publicRepositories || 0,
          totalContributions: data.totalContributions || 0,
          totalProjects: data.totalProjects || 0,
          totalStars: data.totalStars || 0,
          totalIssues: data.totalIssues || 0,
        };

        setProfileStats(profileData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchGitHubStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const stats = [
    { title: "Followers", value: profileStats.followers },
    { title: "Following", value: profileStats.following },
    { title: "Joined date", value: profileStats.joinedDate },
    { title: "Updated at", value: profileStats.updatedAt },
    { title: "Total repositories", value: profileStats.totalRepositories },
    { title: "Private repositories", value: profileStats.privateRepositories },
    { title: "Public repositories", value: profileStats.publicRepositories },
    { title: "Total contributions", value: profileStats.totalContributions },
    { title: "Total projects", value: profileStats.totalProjects },
    { title: "Total stars", value: profileStats.totalStars },
    { title: "Total issues", value: profileStats.totalIssues },
  ];

  return (
    <section className="c-section c-section--stats" id="stats">
      <div className="c-section__entry c-section__entry--no-background">
        <div className="o-shell">
          <h3 className="heading pb-20">Github Profile Stats</h3>
          <ul className="c-section__list">
            {stats.map((stat, index) => (
              <StatItem
                className="bg-slate-900/[0.] border backdrop-blur-xl border-neutral-200 dark:border-slate-800 "
                key={index}
                title={stat.title}
                value={stat.value}
                index={index + 1}
                style={{
                  background: "rgb(4,7,29)",
                  backgroundColor:
                    "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                }}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default GitHubProfileStats;
