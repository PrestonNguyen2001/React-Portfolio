// client/src/components/Interests.jsx

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

const Interests = () => (
  <motion.div
    className="text-lg text-light-text dark:text-dark-text flex flex-col gap-4 text-center"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
  >
    <motion.p variants={itemVariants}>Technology and Programming</motion.p>
    <motion.p variants={itemVariants}>Creative Problem-Solving</motion.p>
    <motion.p variants={itemVariants}>Personal Development</motion.p>
    <motion.p variants={itemVariants}>Team Collaboration</motion.p>
  </motion.div>
);

export default Interests;
