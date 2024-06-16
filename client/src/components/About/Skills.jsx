// client/src/components/Skills.jsx

import { motion } from "framer-motion";
import {
  PythonIcon,
  CSSIcon,
  HTMLIcon,
  JSIcon,
  TypeScriptIcon,
  FirebaseIcon,
  MongoDBIcon,
  MongooseIcon,
  MySQLIcon,
  PostGreSQLIcon,
  ReactIcon,
  ReduxIcon,
  GraphqlIcon,
  SequelizeIcon,
  HandlebarsIcon,
  BootstrapIcon,
  TailwindIcon,
  ReactBootstrapIcon,
  NextJSIcon,
  ExpressIcon,
  GitIcon,
  GitHubIcon,
  GitLabIcon,
  PostmanIcon,
  JestIcon,
  PyCharmIcon,
  ViteIcon,
  VSCodeIcon,
  UnityIcon,
  UnrealEngineIcon,
} from "../../assets/icons/icons.js";

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

const Skills = () => (
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
      <motion.div className="skills-list" variants={containerVariants}>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={PythonIcon} alt="Python" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            Python
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={CSSIcon} alt="CSS" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            CSS
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={HTMLIcon} alt="HTML" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            HTML
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={JSIcon} alt="JavaScript" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            JavaScript
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={TypeScriptIcon} alt="TypeScript" className="icon" />
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
      <motion.div className="skills-list" variants={containerVariants}>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={FirebaseIcon} alt="Firebase" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            Firebase
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={MongoDBIcon} alt="MongoDB" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            MongoDB
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={MongooseIcon} alt="Mongoose" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            Mongoose
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={MySQLIcon} alt="MySQL" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            MySQL
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={PostGreSQLIcon} alt="PostGreSQL" className="icon" />
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
      <motion.div className="skills-list" variants={containerVariants}>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={ReactIcon} alt="React Js" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            React Js
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={ReduxIcon} alt="Redux" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            Redux
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={GraphqlIcon} alt="Graphql" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            Graphql
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={SequelizeIcon} alt="Sequelize" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            Sequelize
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={MongooseIcon} alt="Mongoose" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            Mongoose
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={HandlebarsIcon} alt="Handlebars" className="icon" />
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
      <motion.div className="skills-list" variants={containerVariants}>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={BootstrapIcon} alt="Bootstrap" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            Bootstrap
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={TailwindIcon} alt="Tailwind CSS" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            Tailwind CSS
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img
            src={ReactBootstrapIcon}
            alt="React Bootstrap"
            className="icon"
          />
          <span className="skill-text text-light-text dark:text-dark-text">
            React Bootstrap
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={NextJSIcon} alt="NextJS" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            NextJS
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={ExpressIcon} alt="Express" className="icon" />
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
      <motion.div className="skills-list" variants={containerVariants}>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={GitIcon} alt="Git" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            Git
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={GitHubIcon} alt="GitHub" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            GitHub
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={GitLabIcon} alt="GitLab" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            GitLab
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={PostmanIcon} alt="Postman" className="icon" />
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
      <motion.div className="skills-list" variants={containerVariants}>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={JestIcon} alt="Jest" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            Jest
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={PyCharmIcon} alt="PyCharm" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            PyCharm
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={ViteIcon} alt="Vite" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            Vite
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={VSCodeIcon} alt="VS Code" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            VS Code
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={UnityIcon} alt="Unity" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            Unity
          </span>
        </motion.div>
        <motion.div className="skill-item" variants={itemVariants}>
          <img src={UnrealEngineIcon} alt="Unreal Engine" className="icon" />
          <span className="skill-text text-light-text dark:text-dark-text">
            Unreal
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  </motion.div>
);

export default Skills;
