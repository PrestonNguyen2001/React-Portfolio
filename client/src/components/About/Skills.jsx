import { motion } from "framer-motion";
import skills from "../../data/skillsData";
import { Button } from "../Effects/MovingBorders.jsx";

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
    <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
      {skills.map((card) => (
        <Button
          key={card.id}
          duration={Math.floor(Math.random() * 10000) + 10000}
          borderRadius="1.75rem"
          style={{
            background: "rgb(4,7,29)",
            backgroundColor:
              "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
            borderRadius: `calc(1.75rem * 0.96)`,
          }}
          className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          <motion.div
            className="flex flex-col p-3 py-6 md:p-5 lg:p-10 gap-2"
            variants={itemVariants}
          >
            <h3 className="section-title text-light-text dark:text-dark-text">
              {card.title}
            </h3>
            <motion.div
              className="skills-list grid grid-cols-2 gap-4"
              variants={containerVariants}
            >
              {card.desc.map((skill, index) => (
                <motion.div
                  className="skill-item flex items-center gap-2"
                  variants={itemVariants}
                  key={index}
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="icon w-6 h-6"
                  />
                  <span className="skill-text text-light-text dark:text-dark-text">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Button>
      ))}
    </div>
  </motion.div>
);

export default Skills;
