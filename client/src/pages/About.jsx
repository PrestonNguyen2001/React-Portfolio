import { useState } from "react";
import aboutImg from "../assets/images/about.png";
import "../assets/css/About.css"; // Import the new about.css file
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

export default function About() {
  const [activeTab, setActiveTab] = useState("about");

  return (
      <div className="container">
        <div className="tab-container">
          <ul className="tab-btn-list">
            <li className="tab-btn-item">
              <button
                className={`tab-btn title h6 ${
                  activeTab === "about" ? "active" : ""
                }`}
                onClick={() => setActiveTab("about")}
              >
                About Me
              </button>
            </li>
            <li className="tab-btn-item">
              <button
                className={`tab-btn title h6 ${
                  activeTab === "skills" ? "active" : ""
                }`}
                onClick={() => setActiveTab("skills")}
              >
                Skills
              </button>
            </li>
            <li className="tab-btn-item">
              <button
                className={`tab-btn title h6 ${
                  activeTab === "interests" ? "active" : ""
                }`}
                onClick={() => setActiveTab("interests")}
              >
                Interests
              </button>
            </li>
            <li className="tab-btn-item">
              <button
                className={`tab-btn title h6 ${
                  activeTab === "strengths" ? "active" : ""
                }`}
                onClick={() => setActiveTab("strengths")}
              >
                Strengths
              </button>
            </li>
          </ul>

          <div className="tab-content active">
            {activeTab === "about" && (
              <div className="grid-list">
                <figure
                  className="about-banner img-holder"
                  style={{ "--width": "", "--height": "" }}
                  data-tilt
                >
                  <img
                    src={aboutImg}
                    width="370"
                    height="220"
                    loading="lazy"
                    alt="about banner"
                    className="img-cover"
                  />
                </figure>
                <div className="about-content">
                  <div className="about-details">
                    <h2 className="h4 title section-title text-light-text dark:text-dark-text">
                      A very small stage in a vast cosmic.
                    </h2>

                    <p className="section-text text-gray-600 dark:text-gray-300">
                      A very small stage in a vast cosmic arena great turbuslent
                      clouds encyclo-paedia galactica star stuff harvesting star
                      light the carbon in our apple pies realm of the galaxies
                    </p>

                    <ul className="about-list">
                      <li className="about-item">
                        <p className="list-title text-light-text dark:text-dark-text">Name</p>
                        <span className="span title h5 text-light-text dark:text-dark-text">Preston Nguyen</span>
                      </li>

                      <li className="about-item">
                        <p className="list-title text-light-text dark:text-dark-text">Phone Number</p>
                        <span className="span title h5 text-light-text dark:text-dark-text">(703) -973-8176</span>
                      </li>

                      <li className="about-item">
                        <p className="list-title text-light-text dark:text-dark-text">Email Address</p>
                        <span className="span title h5 text-light-text dark:text-dark-text">
                          prestonnguyen2001@gmail.com
                        </span>
                      </li>

                      <li className="about-item">
                        <p className="list-title text-light-text dark:text-dark-text">Social Network</p>
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
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="skills-container">
                <div className="skills-section">
                  <h3 className="section-title text-light-text dark:text-dark-text">Languages</h3>
                  <div className="skills-list">
                    <div className="skill-item">
                      <img src={PythonIcon} alt="Python" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">Python</span>
                    </div>
                    <div className="skill-item">
                      <img src={CSSIcon} alt="CSS" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">CSS</span>
                    </div>
                    <div className="skill-item">
                      <img src={HTMLIcon} alt="HTML" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">HTML</span>
                    </div>
                    <div className="skill-item">
                      <img src={JSIcon} alt="JavaScript" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">JavaScript</span>
                    </div>
                    <div className="skill-item">
                      <img
                        src={TypeScriptIcon}
                        alt="TypeScript"
                        className="icon"
                      />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">TypeScript</span>
                    </div>
                  </div>
                </div>
                <div className="skills-section">
                  <h3 className="section-title text-light-text dark:text-dark-text">Databases & Cloud</h3>
                  <div className="skills-list">
                    <div className="skill-item">
                      <img src={FirebaseIcon} alt="Firebase" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">Firebase</span>
                    </div>
                    <div className="skill-item">
                      <img src={MongoDBIcon} alt="MongoDB" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">MongoDB</span>
                    </div>
                    <div className="skill-item">
                      <img src={MongooseIcon} alt="Mongoose" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">Mongoose</span>
                    </div>
                    <div className="skill-item">
                      <img src={MySQLIcon} alt="MySQL" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">MySQL</span>
                    </div>
                    <div className="skill-item">
                      <img
                        src={PostGreSQLIcon}
                        alt="PostGreSQL"
                        className="icon"
                      />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">PostGreSQL</span>
                    </div>
                  </div>
                </div>
                <div className="skills-section">
                  <h3 className="section-title text-light-text dark:text-dark-text">Libraries</h3>
                  <div className="skills-list">
                    <div className="skill-item">
                      <img src={ReactIcon} alt="React Js" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">React Js</span>
                    </div>
                    <div className="skill-item">
                      <img src={ReduxIcon} alt="Redux" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">Redux</span>
                    </div>
                    <div className="skill-item">
                      <img src={GraphqlIcon} alt="Graphql" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">Graphql</span>
                    </div>
                    <div className="skill-item">
                      <img
                        src={SequelizeIcon}
                        alt="Sequelize"
                        className="icon"
                      />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">Sequelize</span>
                    </div>
                    <div className="skill-item">
                      <img src={MongooseIcon} alt="Mongoose" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">Mongoose</span>
                    </div>
                    <div className="skill-item">
                      <img
                        src={HandlebarsIcon}
                        alt="Handlebars"
                        className="icon"
                      />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">Handlebars</span>
                    </div>
                  </div>
                </div>
                <div className="skills-section">
                  <h3 className="section-title text-light-text dark:text-dark-text">Frameworks</h3>
                  <div className="skills-list">
                    <div className="skill-item">
                      <img
                        src={BootstrapIcon}
                        alt="Bootstrap"
                        className="icon"
                      />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">Bootstrap</span>
                    </div>
                    <div className="skill-item">
                      <img
                        src={TailwindIcon}
                        alt="Tailwind CSS"
                        className="icon"
                      />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">Tailwind CSS</span>
                    </div>
                    <div className="skill-item">
                      <img
                        src={ReactBootstrapIcon}
                        alt="React Bootstrap"
                        className="icon"
                      />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">React Bootstrap</span>
                    </div>
                    <div className="skill-item">
                      <img src={NextJSIcon} alt="NextJS" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">NextJS</span>
                    </div>
                    <div className="skill-item">
                      <img src={ExpressIcon} alt="Express" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">ExpressJS</span>
                    </div>
                  </div>
                </div>
                <div className="skills-section">
                  <h3 className="section-title text-light-text dark:text-dark-text">
                    Version Control & Deployment
                  </h3>
                  <div className="skills-list">
                    <div className="skill-item">
                      <img src={GitIcon} alt="Git" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">Git</span>
                    </div>
                    <div className="skill-item">
                      <img src={GitHubIcon} alt="GitHub" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">GitHub</span>
                    </div>
                    <div className="skill-item">
                      <img src={GitLabIcon} alt="GitLab" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">GitLab</span>
                    </div>

                    <div className="skill-item">
                      <img src={PostmanIcon} alt="Postman" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">Postman</span>
                    </div>
                  </div>
                </div>
                <div className="skills-section">
                  <h3 className="section-title text-light-text dark:text-dark-text">Others</h3>
                  <div className="skills-list">
                    <div className="skill-item">
                      <img src={JestIcon} alt="Jest" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">Jest</span>
                    </div>
                    <div className="skill-item">
                      <img src={PyCharmIcon} alt="PyCharm" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">PyCharm</span>
                    </div>
                    <div className="skill-item">
                      <img src={ViteIcon} alt="Vite" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">Vite</span>
                    </div>
                    <div className="skill-item">
                      <img src={VSCodeIcon} alt="VS Code" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">VS Code</span>
                    </div>
                    <div className="skill-item">
                      <img src={UnityIcon} alt="Unity" className="icon" />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">Unity</span>
                    </div>
                    <div className="skill-item">
                      <img
                        src={UnrealEngineIcon}
                        alt="Unreal Engine"
                        className="icon"
                      />{" "}
                      <span className="skill-text text-light-text dark:text-dark-text">Unreal</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "interests" && (
              <div className="text-lg text-light-text dark:text-dark-text flex flex-col gap-4 text-center">
                {/* Content for Interests tab */}
                <p>Technology and Programming</p>
                <p>Creative Problem-Solving</p>
                <p>Personal Development</p>
                <p>Team Collaboration</p>
              </div>
            )}

            {activeTab === "strengths" && (
              <div className="text-lg text-light-text dark:text-dark-text flex flex-col gap-4 text-center">
                {/* Content for Strengths tab */}
                <p>
                  <strong>Proactive Learner:</strong> Continuously seeks out new
                  knowledge and skills, staying updated with the latest
                  technologies and best practices in software development.
                </p>
                <p>
                  <strong>Strong Work Ethic:</strong> Demonstrated commitment
                  and dedication through extensive experience in family business
                  and current educational pursuits.
                </p>
                <p>
                  <strong>Problem-Solving Abilities:</strong> Adept at
                  troubleshooting and resolving technical issues, as well as
                  creatively addressing challenges in project development.
                </p>
                <p>
                  <strong>Collaborative Team Player:</strong> Works effectively
                  in team settings, contributing positively to group projects
                  and fostering a cooperative work environment.
                </p>
                <p>
                  <strong>Adaptability:</strong> Quickly adapts to new tools,
                  technologies, and environments, ensuring seamless integration
                  and contribution to projects.
                </p>
                <p>
                  <strong>Customer Service Oriented:</strong> Brings valuable
                  experience in customer service, enhancing communication and
                  interpersonal skills vital for understanding and addressing
                  user needs.
                </p>
                <p>
                  <strong>Attention to Detail:</strong> Ensures accuracy and
                  precision in coding, documentation, and overall project
                  execution, leading to high-quality deliverables.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}
