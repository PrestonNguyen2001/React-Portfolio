import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ProjectCard from "./ProjectCard"; // Adjust the path according to your folder structure

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

export default function Portfolio() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [projects, setProjects] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/projects`
        );
        const data = await res.json();
        if (res.ok) {
          setProjects(data.projects || []); // Ensure projects is an array
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
    <motion.div
      ref={ref}
      className="container min-h-screen flex flex-col items-center justify-center  p-10"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.h1
        className="mb-20 text-5xl font-bold text-light-text dark:text-dark-text"
        variants={itemVariants}
      >
        PORTFOLIO
      </motion.h1>
      <motion.h2
        className="text-4xl font-bold text-light-text dark:text-dark-text mb-8"
        variants={itemVariants}
      >
        My Recent <strong className="text-purple-500">Works</strong>
      </motion.h2>
      <motion.p
        className="text-gray-600 dark:text-gray-300 mb-12"
        variants={itemVariants}
      >
        Here are a few projects I&apos;ve worked on recently.
      </motion.p>
      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading projects...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectCard
                key={index}
                imgPath={project.imgPath}
                title={project.title}
                description={project.description}
                ghLink={project.ghLink}
                demoLink={project.demoLink}
                variants={itemVariants}
              />
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              No projects available
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
