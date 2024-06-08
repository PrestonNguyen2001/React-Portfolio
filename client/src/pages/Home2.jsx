import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
// import myImg from "../../Assets/avatar.svg"; // Make sure the path to your image is correct

export default function Home2() {
  return (
    <div className="mt-10 bg-gray-100 dark:bg-gray-900 py-10" id="about">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              LET ME <span className="text-blue-500"> INTRODUCE </span> MYSELF
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl">
              I am currently a coding bootcamp student, deeply immersed in the
              world of programming. I have developed a profound passion for
              coding and am constantly striving to improve my skills and
              knowledge.
              <br />
              <br />I have gained proficiency in languages like
              <i>
                <b className="text-blue-500"> HTML, CSS, and JavaScript. </b>
              </i>
              <br />
              {/* <br />
              My areas of interest include building innovative
              <i>
                <b className="text-blue-500"> Web Technologies and Products </b>
              </i>
              and exploring the potentials of
              <b className="text-blue-500"> Blockchain technology.</b> */}
              <br />
              <br />
              As I begin my journey, I approach each new challenge with an
              eagerness to learn and a proactive mindset geared towards
              overcoming obstacles.
            </p>
          </div>
          <div className="md:w-1/3 mt-6 md:mt-0 flex justify-center">
            {/* <div className="relative">
                            <img src={myImg} className="rounded-lg shadow-lg" alt="avatar" />
                        </div> */}
          </div>
        </div>
        <div className="text-center mt-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            FIND ME ON
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl mb-4">
            Feel free to <span className="text-blue-500">connect</span> with me
          </p>
          <ul className="flex justify-center space-x-6">
            <li>
              <a
                href="https://github.com/PrestonNguyen2001"
                target="_blank"
                rel="noreferrer"
                className="text-gray-900 dark:text-white text-2xl hover:text-blue-500 transition-colors duration-200"
              >
                <AiFillGithub />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/preston-nguyen-8a08a52a8"
                target="_blank"
                rel="noreferrer"
                className="text-gray-900 dark:text-white text-2xl hover:text-blue-500 transition-colors duration-200"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/prestonguyen"
                target="_blank"
                rel="noreferrer"
                className="text-gray-900 dark:text-white text-2xl hover:text-blue-500 transition-colors duration-200"
              >
                <AiFillInstagram />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
