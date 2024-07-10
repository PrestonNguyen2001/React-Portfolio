import Spotlight from "../Effects/Spotlight"; // Ensure the import path is correct
import Type from "../Common/Type";
import { TextGenerateEffect } from "./TextGenerateEffect";
import MagicButton from "./MagicButton";
import { FaLocationArrow } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="pb-20 pt-36" id="home">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div className="relative flex flex-col items-center justify-center my-20 z-10">
        <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
          Dynamic Web Magic with Next.js
        </p>

        <TextGenerateEffect
          words="Hi there! I'm Preston. Welcome to my portfolio."
          className="text-center text-[40px] md:text-5xl lg:text-6xl"
        />

        <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl"></p>

        <a href="#about">
          <MagicButton
            title="Show my work"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
    </div>
  );
};

export default Hero;
