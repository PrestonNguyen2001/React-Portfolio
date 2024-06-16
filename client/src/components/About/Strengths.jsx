// client/src/components/Strengths.jsx

import { motion } from "framer-motion";

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

const Strengths = () => (
  <motion.div
    className="text-lg text-light-text dark:text-dark-text flex flex-col gap-4 text-center"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
  >
    <motion.p variants={itemVariants}>
      <strong>Proactive Learner:</strong> Continuously seeks out new knowledge
      and skills, staying updated with the latest technologies and best
      practices in software development.
    </motion.p>
    <motion.p variants={itemVariants}>
      <strong>Strong Work Ethic:</strong> Demonstrated commitment and dedication
      through extensive experience in family business and current educational
      pursuits.
    </motion.p>
    <motion.p variants={itemVariants}>
      <strong>Problem-Solving Abilities:</strong> Adept at troubleshooting and
      resolving technical issues, as well as creatively addressing challenges in
      project development.
    </motion.p>
    <motion.p variants={itemVariants}>
      <strong>Collaborative Team Player:</strong> Works effectively in team
      settings, contributing positively to group projects and fostering a
      cooperative work environment.
    </motion.p>
    <motion.p variants={itemVariants}>
      <strong>Adaptability:</strong> Quickly adapts to new tools, technologies,
      and environments, ensuring seamless integration and contribution to
      projects.
    </motion.p>
    <motion.p variants={itemVariants}>
      <strong>Customer Service Oriented:</strong> Brings valuable experience in
      customer service, enhancing communication and interpersonal skills vital
      for understanding and addressing user needs.
    </motion.p>
    <motion.p variants={itemVariants}>
      <strong>Attention to Detail:</strong> Ensures accuracy and precision in
      coding, documentation, and overall project execution, leading to
      high-quality deliverables.
    </motion.p>
  </motion.div>
);

export default Strengths;
