import { useState } from "react";
import aboutImg from "../../../public/assets/images/about.png";
import BootstrapIcon from "../../../public/assets/icons/bootstrap-original.svg";
import CSSIcon from "../../../public/assets/icons/css3-original.svg";
import FirebaseIcon from "../../../public/assets/icons/firebase-original.svg";
import GitIcon from "../../../public/assets/icons/git-original.svg";
import GitHubIcon from "../../../public/assets/icons/github-original.svg";
import HandlebarsIcon from "../../../public/assets/icons/handlebars-original.svg";
import HTMLIcon from "../../../public/assets/icons/html5-original.svg";
import JSIcon from "../../../public/assets/icons/javascript-original.svg";
import JestIcon from "../../../public/assets/icons/jest-plain.svg";
import MongoDBIcon from "../../../public/assets/icons/mongodb-original.svg";
import MongooseIcon from "../../../public/assets/icons/mongoose-original.svg";
import MySQLIcon from "../../../public/assets/icons/mysql-original.svg";
import NextJSIcon from "../../../public/assets/icons/nextjs-original.svg";
import PostGreSQLIcon from "../../../public/assets/icons/postgresql-original.svg";
import PostmanIcon from "../../../public/assets/icons/postman-original.svg";
import PyCharmIcon from "../../../public/assets/icons/pycharm-original.svg";
import PythonIcon from "../../../public/assets/icons/python-original.svg";
import ReactIcon from "../../../public/assets/icons/react-original.svg";
import ReactBootstrapIcon from "../../../public/assets/icons/reactbootstrap-original.svg";
import ReduxIcon from "../../../public/assets/icons/redux-original.svg";
import SequelizeIcon from "../../../public/assets/icons/sequelize-original.svg";
import TailwindIcon from "../../../public/assets/icons/tailwindcss-original.svg";
import TypeScriptIcon from "../../../public/assets/icons/typescript-original.svg";
import UnityIcon from "../../../public/assets/icons/unity-original.svg";
import UnrealEngineIcon from "../../../public/assets/icons/unrealengine-original.svg";
import ViteIcon from "../../../public/assets/icons/vite-original.svg";
import VSCodeIcon from "../../../public/assets/icons/vscode-original.svg";
import GitLabIcon from "../../../public/assets/icons/gitlab-original.svg";
import ExpressIcon from "../../../public/assets/icons/express-original.svg";
import GraphqlIcon from "../../../public/assets/icons/graphql-plain.svg";

export default function About() {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <section className="section about min-h-screen flex justify-center">
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
                  activeTab === "passions" ? "active" : ""
                }`}
                onClick={() => setActiveTab("passions")}
              >
                Passions
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
                    <h2 className="h4 title section-title">
                      A very small stage in a vast cosmic.
                    </h2>

                    <p className="section-text">
                      A very small stage in a vast cosmic arena great turbuslent
                      clouds encyclo-paedia galactica star stuff harvesting star
                      light the carbon in our apple pies realm of the galaxies
                    </p>

                    <ul className="about-list">
                      <li className="about-item">
                        <p className="list-title">Name</p>
                        <span className="span title h5">Preston Nguyen</span>
                      </li>

                      <li className="about-item">
                        <p className="list-title">Phone Number</p>
                        <span className="span title h5">(703) -973-8176</span>
                      </li>

                      <li className="about-item">
                        <p className="list-title">Email Address</p>
                        <span className="span title h5">
                          prestonnguyen2001@gmail.com
                        </span>
                      </li>

                      <li className="about-item">
                        <p className="list-title">Social Network</p>
                        <div className="social-list">
                          <a
                            href="#"
                            className="social-link h6"
                            title="Facebook"
                          >
                            Fb.
                          </a>
                          <a
                            href="#"
                            className="social-link h6"
                            title="Behance"
                          >
                            Be.
                          </a>
                          <a
                            href="#"
                            className="social-link h6"
                            title="Linkedin"
                          >
                            Ln.
                          </a>
                          <a
                            href="#"
                            className="social-link h6"
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
                  <h3 className="section-title">Languages</h3>
                  <div className="skills-list">
                    <div className="skill-item">
                      <img src={PythonIcon} alt="Python" className="icon" />{" "}
                      <span className="skill-text">Python</span>
                    </div>
                    <div className="skill-item">
                      <img src={CSSIcon} alt="CSS" className="icon" />{" "}
                      <span className="skill-text">CSS</span>
                    </div>
                    <div className="skill-item">
                      <img src={HTMLIcon} alt="HTML" className="icon" />{" "}
                      <span className="skill-text">HTML</span>
                    </div>
                    <div className="skill-item">
                      <img src={JSIcon} alt="JavaScript" className="icon" />{" "}
                      <span className="skill-text">JavaScript</span>
                    </div>
                    <div className="skill-item">
                      <img
                        src={TypeScriptIcon}
                        alt="TypeScript"
                        className="icon"
                      />{" "}
                      <span className="skill-text">TypeScript</span>
                    </div>
                  </div>
                </div>
                <div className="skills-section">
                  <h3 className="section-title">Databases & Cloud</h3>
                  <div className="skills-list">
                    <div className="skill-item">
                      <img src={FirebaseIcon} alt="Firebase" className="icon" />{" "}
                      <span className="skill-text">Firebase</span>
                    </div>
                    <div className="skill-item">
                      <img src={MongoDBIcon} alt="MongoDB" className="icon" />{" "}
                      <span className="skill-text">MongoDB</span>
                    </div>
                    <div className="skill-item">
                      <img src={MongooseIcon} alt="Mongoose" className="icon" />{" "}
                      <span className="skill-text">Mongoose</span>
                    </div>
                    <div className="skill-item">
                      <img src={MySQLIcon} alt="MySQL" className="icon" />{" "}
                      <span className="skill-text">MySQL</span>
                    </div>
                    <div className="skill-item">
                      <img
                        src={PostGreSQLIcon}
                        alt="PostGreSQL"
                        className="icon"
                      />{" "}
                      <span className="skill-text">PostGreSQL</span>
                    </div>
                  </div>
                </div>
                <div className="skills-section">
                  <h3 className="section-title">Libraries</h3>
                  <div className="skills-list">
                    <div className="skill-item">
                      <img src={ReactIcon} alt="React Js" className="icon" />{" "}
                      <span className="skill-text">React Js</span>
                    </div>
                    <div className="skill-item">
                      <img src={ReduxIcon} alt="Redux" className="icon" />{" "}
                      <span className="skill-text">Redux</span>
                    </div>
                    <div className="skill-item">
                      <img src={GraphqlIcon} alt="Graphql" className="icon" />{" "}
                      <span className="skill-text">Graphql</span>
                    </div>
                    <div className="skill-item">
                      <img
                        src={SequelizeIcon}
                        alt="Sequelize"
                        className="icon"
                      />{" "}
                      <span className="skill-text">Sequelize</span>
                    </div>
                    <div className="skill-item">
                      <img src={MongooseIcon} alt="Mongoose" className="icon" />{" "}
                      <span className="skill-text">Mongoose</span>
                    </div>
                    <div className="skill-item">
                      <img
                        src={HandlebarsIcon}
                        alt="Handlebars"
                        className="icon"
                      />{" "}
                      <span className="skill-text">Handlebars</span>
                    </div>
                  </div>
                </div>
                <div className="skills-section">
                  <h3 className="section-title">Frameworks</h3>
                  <div className="skills-list">
                    <div className="skill-item">
                      <img
                        src={BootstrapIcon}
                        alt="Bootstrap"
                        className="icon"
                      />{" "}
                      <span className="skill-text">Bootstrap</span>
                    </div>
                    <div className="skill-item">
                      <img
                        src={TailwindIcon}
                        alt="Tailwind CSS"
                        className="icon"
                      />{" "}
                      <span className="skill-text">Tailwind CSS</span>
                    </div>
                    <div className="skill-item">
                      <img
                        src={ReactBootstrapIcon}
                        alt="React Bootstrap"
                        className="icon"
                      />{" "}
                      <span className="skill-text">React Bootstrap</span>
                    </div>
                    <div className="skill-item">
                      <img src={NextJSIcon} alt="NextJS" className="icon" />{" "}
                      <span className="skill-text">NextJS</span>
                    </div>
                    <div className="skill-item">
                      <img src={ExpressIcon} alt="Express" className="icon" />{" "}
                      <span className="skill-text">ExpressJS</span>
                    </div>
                  </div>
                </div>
                <div className="skills-section">
                  <h3 className="section-title">
                    Version Control & Deployment
                  </h3>
                  <div className="skills-list">
                    <div className="skill-item">
                      <img src={GitIcon} alt="Git" className="icon" />{" "}
                      <span className="skill-text">Git</span>
                    </div>
                    <div className="skill-item">
                      <img src={GitHubIcon} alt="GitHub" className="icon" />{" "}
                      <span className="skill-text">GitHub</span>
                    </div>
                    <div className="skill-item">
                      <img src={GitLabIcon} alt="GitLab" className="icon" />{" "}
                      <span className="skill-text">GitLab</span>
                    </div>

                    <div className="skill-item">
                      <img src={PostmanIcon} alt="Postman" className="icon" />{" "}
                      <span className="skill-text">Postman</span>
                    </div>
                  </div>
                </div>
                <div className="skills-section">
                  <h3 className="section-title">Others</h3>
                  <div className="skills-list">
                    <div className="skill-item">
                      <img src={JestIcon} alt="Jest" className="icon" />{" "}
                      <span className="skill-text">Jest</span>
                    </div>
                    <div className="skill-item">
                      <img src={PyCharmIcon} alt="PyCharm" className="icon" />{" "}
                      <span className="skill-text">PyCharm</span>
                    </div>
                    <div className="skill-item">
                      <img src={ViteIcon} alt="Vite" className="icon" />{" "}
                      <span className="skill-text">Vite</span>
                    </div>
                    <div className="skill-item">
                      <img src={VSCodeIcon} alt="VS Code" className="icon" />{" "}
                      <span className="skill-text">VS Code</span>
                    </div>
                    <div className="skill-item">
                      <img src={UnityIcon} alt="Unity" className="icon" />{" "}
                      <span className="skill-text">Unity</span>
                    </div>
                    <div className="skill-item">
                      <img
                        src={UnrealEngineIcon}
                        alt="Unreal Engine"
                        className="icon"
                      />{" "}
                      <span className="skill-text">Unreal</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "passions" && (
              <div className="text-lg text-gray-500 flex flex-col gap-4 text-center">
                {/* Content for Passions tab */}
                <p>Technology and Programming</p>
                <p>Creative Problem-Solving</p>
                <p>Personal Development</p>
                <p>Team Collaboration</p>
              </div>
            )}

            {activeTab === "strengths" && (
              <div className="text-lg text-gray-500 flex flex-col gap-4 text-center">
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
    </section>
  );
}
