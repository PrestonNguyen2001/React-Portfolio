import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ProjectCard from "../components/Portfolio/ProjectCard"; // Adjust the path according to your folder structure
import Project1 from "../assets/images/project-1.png";
import Project2 from "../assets/images/project-2.png";

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

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const projects = [
    {
      imgPath: Project1,
      title: "Code Hunt",
      description: "Description of project 1",
      ghLink: "https://github.com/yourusername/project1",
      demoLink: "https://demo-link1.com", // Optional
    },
    {
      imgPath: Project2,
      title: "Resume Builder",
      description: "Description of project 2",
      ghLink: "https://github.com/yourusername/project2",
      demoLink: null,
    },
    {
      imgPath: "#",
      title: "Project 3",
      description: "Description of project 3",
      ghLink: "https://github.com/yourusername/project3",
      demoLink: null,
    },
    {
      imgPath: "#",
      title: "Project 4",
      description: "Description of project 4",
      ghLink: "https://github.com/yourusername/project4",
      demoLink: null,
    },
    {
      imgPath: "#",
      title: "Project 5",
      description: "Description of project 5",
      ghLink: "https://github.com/yourusername/project5",
      demoLink: null,
    },
    {
      imgPath: "3",
      title: "Project 6",
      description: "Description of project 6",
      ghLink: "https://github.com/yourusername/project6",
      demoLink: null,
    },
  ];

  return (
    <motion.div
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center bg-light-background dark:bg-black p-10"
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
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            imgPath={project.imgPath}
            title={project.title}
            description={project.description}
            ghLink={project.ghLink}
            demoLink={project.demoLink}
            variants={itemVariants}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
