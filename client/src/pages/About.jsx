import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import aboutImg from "../assets/images/about.png";
import "../assets/css/About.css";
import {
  BootstrapIcon,
  CSSIcon,
  FirebaseIcon,
  GitIcon,
  GitHubIcon,
  GitLabIcon,
  HandlebarsIcon,
  HTMLIcon,
  JSIcon,
  JestIcon,
  MongoDBIcon,
  MongooseIcon,
  MySQLIcon,
  NextJSIcon,
  PostGreSQLIcon,
  PostmanIcon,
  PyCharmIcon,
  PythonIcon,
  ReactIcon,
  ReactBootstrapIcon,
  ReduxIcon,
  SequelizeIcon,
  TailwindIcon,
  TypeScriptIcon,
  UnityIcon,
  UnrealEngineIcon,
  ViteIcon,
  VSCodeIcon,
  ExpressIcon,
  GraphqlIcon,
} from "../assets/icons/icons.js";

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

export default function About() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    controls.start("hidden");
    setTimeout(() => {
      controls.start("visible");
    }, 100);
  }, [activeTab]);

  return (
    <motion.div
      ref={ref}
      className="container"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.h1
        className="h2 mb-20 title text-center text-light-text dark:text-dark-text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        About Me
      </motion.h1>
      <div className="tab-container">
        <ul className="tab-btn-list">
          <li className="tab-btn-item">
            <motion.button
              className={`tab-btn title h6 ${
                activeTab === "about" ? "active" : ""
              }`}
              onClick={() => setActiveTab("about")}
              variants={itemVariants}
            >
              About Me
            </motion.button>
          </li>
          <li className="tab-btn-item">
            <motion.button
              className={`tab-btn title h6 ${
                activeTab === "skills" ? "active" : ""
              }`}
              onClick={() => setActiveTab("skills")}
              variants={itemVariants}
            >
              Skills
            </motion.button>
          </li>
          <li className="tab-btn-item">
            <motion.button
              className={`tab-btn title h6 ${
                activeTab === "interests" ? "active" : ""
              }`}
              onClick={() => setActiveTab("interests")}
              variants={itemVariants}
            >
              Interests
            </motion.button>
          </li>
          <li className="tab-btn-item">
            <motion.button
              className={`tab-btn title h6 ${
                activeTab === "strengths" ? "active" : ""
              }`}
              onClick={() => setActiveTab("strengths")}
              variants={itemVariants}
            >
              Strengths
            </motion.button>
          </li>
        </ul>

        <div className="tab-content active">
          {activeTab === "about" && (
            <motion.div className="grid-list" variants={containerVariants}>
              <motion.figure
                className="about-banner img-holder"
                style={{ "--width": "", "--height": "" }}
                data-tilt
                variants={itemVariants}
              >
                <img
                  src={aboutImg}
                  width="370"
                  height="220"
                  loading="lazy"
                  alt="about banner"
                  className="img-cover"
                />
              </motion.figure>
              <motion.div
                className="about-content"
                variants={containerVariants}
              >
                <motion.div className="about-details" variants={itemVariants}>
                  <h2 className="h4 title section-title text-light-text dark:text-dark-text">
                    A very small stage in a vast cosmic.
                  </h2>

                  <p className="section-text text-gray-600 dark:text-gray-300">
                    A very small stage in a vast cosmic arena great turbulent
                    clouds encyclo-paedia galactica star stuff harvesting star
                    light the carbon in our apple pies realm of the galaxies
                  </p>

                  <motion.ul
                    className="about-list"
                    variants={containerVariants}
                  >
                    <motion.li className="about-item" variants={itemVariants}>
                      <p className="list-title text-light-text dark:text-dark-text">
                        Name
                      </p>
                      <span className="span title h5 text-light-text dark:text-dark-text">
                        Preston Nguyen
                      </span>
                    </motion.li>

                    <motion.li className="about-item" variants={itemVariants}>
                      <p className="list-title text-light-text dark:text-dark-text">
                        Phone Number
                      </p>
                      <span className="span title h5 text-light-text dark:text-dark-text">
                        (703) -973-8176
                      </span>
                    </motion.li>

                    <motion.li className="about-item" variants={itemVariants}>
                      <p className="list-title text-light-text dark:text-dark-text">
                        Email Address
                      </p>
                      <span className="span title h5 text-light-text dark:text-dark-text">
                        prestonnguyen2001@gmail.com
                      </span>
                    </motion.li>

                    <motion.li className="about-item" variants={itemVariants}>
                      <p className="list-title text-light-text dark:text-dark-text">
                        Social Network
                      </p>
                      <div className="social-list">
                        <a
                          href="#"
                          className="social-link h6 text-light-text dark:text-dark-text"
                          title="Facebook"
                        >
                          Fb.
                        </a>
                        <a
                          href="#"
                          className="social-link h6 text-light-text dark:text-dark-text"
                          title="Behance"
                        >
                          Be.
                        </a>
                        <a
                          href="#"
                          className="social-link h6 text-light-text dark:text-dark-text"
                          title="Linkedin"
                        >
                          Ln.
                        </a>
                        <a
                          href="#"
                          className="social-link h6 text-light-text dark:text-dark-text"
                          title="Dribbble"
                        >
                          Dr.
                        </a>
                      </div>
                    </motion.li>
                  </motion.ul>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div
              className="skills-container"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div className="skills-section" variants={itemVariants}>
                <h3 className="section-title text-light-text dark:text-dark-text">
                  Languages
                </h3>
                <motion.div
                  className="skills-list"
                  variants={containerVariants}
                >
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={PythonIcon} alt="Python" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      Python
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={CSSIcon} alt="CSS" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      CSS
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={HTMLIcon} alt="HTML" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      HTML
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={JSIcon} alt="JavaScript" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      JavaScript
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img
                      src={TypeScriptIcon}
                      alt="TypeScript"
                      className="icon"
                    />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      TypeScript
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div className="skills-section" variants={itemVariants}>
                <h3 className="section-title text-light-text dark:text-dark-text">
                  Databases & Cloud
                </h3>
                <motion.div
                  className="skills-list"
                  variants={containerVariants}
                >
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={FirebaseIcon} alt="Firebase" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      Firebase
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={MongoDBIcon} alt="MongoDB" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      MongoDB
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={MongooseIcon} alt="Mongoose" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      Mongoose
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={MySQLIcon} alt="MySQL" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      MySQL
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img
                      src={PostGreSQLIcon}
                      alt="PostGreSQL"
                      className="icon"
                    />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      PostGreSQL
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div className="skills-section" variants={itemVariants}>
                <h3 className="section-title text-light-text dark:text-dark-text">
                  Libraries
                </h3>
                <motion.div
                  className="skills-list"
                  variants={containerVariants}
                >
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={ReactIcon} alt="React Js" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      React Js
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={ReduxIcon} alt="Redux" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      Redux
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={GraphqlIcon} alt="Graphql" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      Graphql
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={SequelizeIcon} alt="Sequelize" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      Sequelize
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={MongooseIcon} alt="Mongoose" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      Mongoose
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img
                      src={HandlebarsIcon}
                      alt="Handlebars"
                      className="icon"
                    />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      Handlebars
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div className="skills-section" variants={itemVariants}>
                <h3 className="section-title text-light-text dark:text-dark-text">
                  Frameworks
                </h3>
                <motion.div
                  className="skills-list"
                  variants={containerVariants}
                >
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={BootstrapIcon} alt="Bootstrap" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      Bootstrap
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img
                      src={TailwindIcon}
                      alt="Tailwind CSS"
                      className="icon"
                    />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      Tailwind CSS
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img
                      src={ReactBootstrapIcon}
                      alt="React Bootstrap"
                      className="icon"
                    />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      React Bootstrap
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={NextJSIcon} alt="NextJS" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      NextJS
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={ExpressIcon} alt="Express" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      ExpressJS
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div className="skills-section" variants={itemVariants}>
                <h3 className="section-title text-light-text dark:text-dark-text">
                  Version Control & Deployment
                </h3>
                <motion.div
                  className="skills-list"
                  variants={containerVariants}
                >
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={GitIcon} alt="Git" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      Git
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={GitHubIcon} alt="GitHub" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      GitHub
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={GitLabIcon} alt="GitLab" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      GitLab
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={PostmanIcon} alt="Postman" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      Postman
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div className="skills-section" variants={itemVariants}>
                <h3 className="section-title text-light-text dark:text-dark-text">
                  Others
                </h3>
                <motion.div
                  className="skills-list"
                  variants={containerVariants}
                >
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={JestIcon} alt="Jest" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      Jest
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={PyCharmIcon} alt="PyCharm" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      PyCharm
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={ViteIcon} alt="Vite" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      Vite
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={VSCodeIcon} alt="VS Code" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      VS Code
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img src={UnityIcon} alt="Unity" className="icon" />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      Unity
                    </span>
                  </motion.div>
                  <motion.div className="skill-item" variants={itemVariants}>
                    <img
                      src={UnrealEngineIcon}
                      alt="Unreal Engine"
                      className="icon"
                    />{" "}
                    <span className="skill-text text-light-text dark:text-dark-text">
                      Unreal
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "interests" && (
            <motion.div
              className="text-lg text-light-text dark:text-dark-text flex flex-col gap-4 text-center"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.p variants={itemVariants}>
                Technology and Programming
              </motion.p>
              <motion.p variants={itemVariants}>
                Creative Problem-Solving
              </motion.p>
              <motion.p variants={itemVariants}>Personal Development</motion.p>
              <motion.p variants={itemVariants}>Team Collaboration</motion.p>
            </motion.div>
          )}

          {activeTab === "strengths" && (
            <motion.div
              className="text-lg text-light-text dark:text-dark-text flex flex-col gap-4 text-center"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.p variants={itemVariants}>
                <strong>Proactive Learner:</strong> Continuously seeks out new
                knowledge and skills, staying updated with the latest
                technologies and best practices in software development.
              </motion.p>
              <motion.p variants={itemVariants}>
                <strong>Strong Work Ethic:</strong> Demonstrated commitment and
                dedication through extensive experience in family business and
                current educational pursuits.
              </motion.p>
              <motion.p variants={itemVariants}>
                <strong>Problem-Solving Abilities:</strong> Adept at
                troubleshooting and resolving technical issues, as well as
                creatively addressing challenges in project development.
              </motion.p>
              <motion.p variants={itemVariants}>
                <strong>Collaborative Team Player:</strong> Works effectively in
                team settings, contributing positively to group projects and
                fostering a cooperative work environment.
              </motion.p>
              <motion.p variants={itemVariants}>
                <strong>Adaptability:</strong> Quickly adapts to new tools,
                technologies, and environments, ensuring seamless integration
                and contribution to projects.
              </motion.p>
              <motion.p variants={itemVariants}>
                <strong>Customer Service Oriented:</strong> Brings valuable
                experience in customer service, enhancing communication and
                interpersonal skills vital for understanding and addressing user
                needs.
              </motion.p>
              <motion.p variants={itemVariants}>
                <strong>Attention to Detail:</strong> Ensures accuracy and
                precision in coding, documentation, and overall project
                execution, leading to high-quality deliverables.
              </motion.p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
