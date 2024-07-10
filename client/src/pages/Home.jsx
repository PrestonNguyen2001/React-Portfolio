import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Hero from "../components/Hero/Hero";import About from "./About";
import Portfolio from "./Portfolio";
import Timeline from "./Timeline";
import Resume from "./Resume";
import Blog from "./Blog";
import Contact from "./Contact";
export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <section id="hero">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="resume">
          <Resume />
        </section>
        <section id="portfolio">
          <Portfolio />
        </section>
        <section id="timeline">
          <Timeline />
        </section>

        <section id="blogs">
          <Blog />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </div>
    </main>
  );
}