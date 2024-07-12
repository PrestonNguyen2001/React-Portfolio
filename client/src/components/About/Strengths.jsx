import React from "react";

import { motion } from "framer-motion";
import strengthsData from "../../data/strengthsData";
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

const Strengths = () => (
  <motion.div
    className="strengths-container"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
  >
    <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
      {strengthsData.map((strength) => (
        <Button
          key={strength.id}
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
            className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2"
            variants={itemVariants}
          >
            <img
              src={strength.thumbnail}
              alt={strength.title}
              className="lg:w-32 md:w-20 w-16"
            />
            <div className="flex flex-col">
              <h1 className="text-start text-xl md:text-2xl font-bold">
                {strength.title}
              </h1>
              <p className="text-start text-white-100 mt-3 font-semibold">
                {strength.description}
              </p>
            </div>
          </motion.div>
        </Button>
      ))}
    </div>
  </motion.div>
);

export default Strengths;
