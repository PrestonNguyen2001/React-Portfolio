import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Hero from "../components/Hero/Hero";
import About from "./About";
import Portfolio from "./Portfolio";
import Timeline from "./Timeline";
import Resume from "./Resume";
import Contact from "./Contact";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

const AnimatedSection = ({ children, id }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
    >
      {children}
    </motion.section>
  );
};

AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

export default function Home({ setHeroLoaded }) {
  const [heroLoaded, setHeroLoadedState] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroLoadedState(true);
      document.body.classList.add("loaded");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (heroLoaded) {
      setHeroLoaded(true);
    }
  }, [heroLoaded, setHeroLoaded]);

  return (
    <div id="home" className={`${!heroLoaded ? "hidden" : ""}`}>
      <AnimatedSection id="hero">
        <Hero setHeroLoaded={setHeroLoadedState} />
      </AnimatedSection>
      {heroLoaded && (
        <>
          <AnimatedSection id="about">
            <About />
          </AnimatedSection>
          <AnimatedSection id="portfolio">
            <Portfolio />
          </AnimatedSection>
          <AnimatedSection id="timeline">
            <Timeline />
          </AnimatedSection>
          <AnimatedSection id="resume">
            <Resume />
          </AnimatedSection>
          <AnimatedSection id="contact">
            <Contact />
          </AnimatedSection>
        </>
      )}
    </div>
  );
}

Home.propTypes = {
  setHeroLoaded: PropTypes.func.isRequired,
};
