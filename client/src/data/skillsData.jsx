// client/src/data/skillsData.jsx

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
} from "../assets/icons/icons";

const skills = [
  {
    id: 1,
    title: "Languages",
    thumbnail: "",
    desc: [
      { name: "Python", icon: PythonIcon },
      { name: "CSS", icon: CSSIcon },
      { name: "HTML", icon: HTMLIcon },
      { name: "JavaScript", icon: JSIcon },
      { name: "TypeScript", icon: TypeScriptIcon },
    ],
  },
  {
    id: 2,
    title: "Databases & Cloud",
    thumbnail: "",
    desc: [
      { name: "Firebase", icon: FirebaseIcon },
      { name: "MongoDB", icon: MongoDBIcon },
      { name: "Mongoose", icon: MongooseIcon },
      { name: "MySQL", icon: MySQLIcon },
      { name: "PostGreSQL", icon: PostGreSQLIcon },
    ],
  },
  {
    id: 3,
    title: "Libraries",
    thumbnail: "",
    desc: [
      { name: "React Js", icon: ReactIcon },
      { name: "Redux", icon: ReduxIcon },
      { name: "Graphql", icon: GraphqlIcon },
      { name: "Sequelize", icon: SequelizeIcon },
      { name: "Mongoose", icon: MongooseIcon },
      { name: "Handlebars", icon: HandlebarsIcon },
    ],
  },
  {
    id: 4,
    title: "Frameworks",
    thumbnail: "",
    desc: [
      { name: "Bootstrap", icon: BootstrapIcon },
      { name: "Tailwind CSS", icon: TailwindIcon },
      { name: "React Bootstrap", icon: ReactBootstrapIcon },
      { name: "NextJS", icon: NextJSIcon },
      { name: "ExpressJS", icon: ExpressIcon },
    ],
  },
  {
    id: 5,
    title: "Version Control & Deployment",
    thumbnail: "",
    desc: [
      { name: "Git", icon: GitIcon },
      { name: "GitHub", icon: GitHubIcon },
      { name: "GitLab", icon: GitLabIcon },
      { name: "Postman", icon: PostmanIcon },
    ],
  },
  {
    id: 6,
    title: "Others",
    thumbnail: "",
    desc: [
      { name: "Jest", icon: JestIcon },
      { name: "PyCharm", icon: PyCharmIcon },
      { name: "Vite", icon: ViteIcon },
      { name: "VS Code", icon: VSCodeIcon },
      { name: "Unity", icon: UnityIcon },
      { name: "Unreal", icon: UnrealEngineIcon },
    ],
  },
];

export default skills;
