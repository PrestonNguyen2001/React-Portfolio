import ProjectCard from "../components/ProjectCard"; // Adjust the path according to your folder structure

export default function Portfolio() {
  const projects = [
    {
      imgPath: "path_to_image1",
      title: "Project 1",
      description: "Description of project 1",
      ghLink: "https://github.com/yourusername/project1",
      demoLink: "https://demo-link1.com", // Optional
    },
    {
      imgPath: "path_to_image2",
      title: "Project 2",
      description: "Description of project 2",
      ghLink: "https://github.com/yourusername/project2",
      demoLink: null, // Optional
    },
    // Add more projects as needed
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light-background dark:bg-black p-10">
      <h1 className="mb-20 text-5xl font-bold text-light-text dark:text-dark-text">
        PORTFOLIO
      </h1>
      <h2 className="text-4xl font-bold text-light-text dark:text-dark-text mb-8">
        My Recent <strong className="text-purple-500">Works</strong>
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-12">
        Here are a few projects I&apos;ve worked on recently.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            imgPath={project.imgPath}
            title={project.title}
            description={project.description}
            ghLink={project.ghLink}
            demoLink={project.demoLink}
          />
        ))}
      </div>
    </div>
  );
}
