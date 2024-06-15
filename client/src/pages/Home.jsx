import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Hero from "../components/Hero";
import About from "./About";
import Portfolio from "./Portfolio";
import Timeline from "./Timeline";
import Resume from "./Resume";
import Contact from "./Contact";

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
      <section className="section hero" id="hero">
        <Hero setHeroLoaded={setHeroLoadedState} />
      </section>
      {heroLoaded && (
        <>
          <section className="section about" id="about">
            <About />
          </section>
          <section className="section portfolio" id="portfolio">
            <Portfolio />
          </section>
          <section className="section timeline" id="timeline">
            <Timeline />
          </section>
          <section className="section resume" id="resume">
            <Resume />
          </section>
          <section className="section contact" id="contact">
            <Contact />
          </section>
        </>
      )}
    </div>
  );
}

Home.propTypes = {
  setHeroLoaded: PropTypes.func.isRequired,
};
