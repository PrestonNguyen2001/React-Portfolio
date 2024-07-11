import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ProjectCard from "../components/Portfolio/ProjectCard";
import { CardContainer } from "../components/Portfolio/Pin";
import HeatmapCalendar from "../components/Calendar/HeatmapCalendar";
import GitHubProfileStats from "../components/GithubProfile/GitHubProfileStats";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/projects`
        );
        const data = await res.json();
        if (res.ok) {
          console.log("Fetched projects:", data.projects);
          setProjects(data.projects || []);
        } else {
          setError("Failed to fetch projects");
        }
      } catch (error) {
        setError("Error fetching projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="py-20">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {loading ? (
          <p className="text-gray-600 dark:text-gray-300">
            Loading projects...
          </p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          projects.map((project) => (
            <div
              className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
              key={`container-${project._id}`}
            >
              <CardContainer title={project.title} href={project.demoLink}>
                <ProjectCard
                  key={`project-${project._id}`}
                  imgPath={project.imgPath}
                  title={project.title}
                  description={project.description}
                  ghLink={project.ghLink}
                  demoLink={project.demoLink}
                  iconLists={project.iconLists || []}
                />
              </CardContainer>
            </div>
          ))
        )}
      </div>
      <div className="mt-20">
        <h2 className="heading">
          Explore my <span className="text-purple">development journey</span>
        </h2>
        <p className="text-center text-gray-700 dark:text-gray-300 mt-4">
          Here is an overview of my contributions and activity over the past
          year.
        </p>
        <GitHubProfileStats />
        <HeatmapCalendar />
      </div>
    </div>
  );
};

export default Portfolio;
