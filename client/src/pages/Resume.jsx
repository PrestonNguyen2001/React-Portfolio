import {
  FaBriefcase,
  FaBook,
  FaStar,
  FaProjectDiagram,
  FaHeart,
  FaLanguage,
  FaListUl,
  FaPrint,
  FaDownload,
} from "react-icons/fa";

export default function Resume() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
            PRESTON NGUYEN
          </h1>
          <h2 className="text-xl text-gray-700 dark:text-gray-300">
            Entry Level Programmer
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            703-973-8176 | prestonnguyen2001@gmail.com |{" "}
            <a
              href="https://github.com/PrestonNguyen2001"
              className="text-teal-500 hover:underline"
            >
              GitHub
            </a>{" "}
            | Sterling, VA
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <button
              className="p-2 bg-teal-500 text-white rounded hover:bg-teal-700"
              onClick={() => window.print()}
            >
              <FaPrint className="mr-2" />
              Print
            </button>
            <a
              href="/client/src/assets/PrestonNguyenResume.pdf" // Replace with the actual path to your PDF
              download
              className="p-2 bg-teal-500 text-white rounded hover:bg-teal-700 flex items-center"
            >
              <FaDownload className="mr-2" />
              Download
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaBriefcase className="mr-2" /> SUMMARY
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Entry-level programmer with a passion for learning and adapting to
              new technologies. Proficient in HTML, CSS, and JavaScript, with a
              strong foundation in web development from coursework and personal
              projects.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaBook className="mr-2" /> EDUCATION
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Coding Bootcamp</strong>
              <br />
              George Washington University
              <br />
              2024 - Present
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              <strong>Business Administration</strong>
              <br />
              Northern Virginia Community College
              <br />
              2019 - 2021
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaBriefcase className="mr-2" /> EXPERIENCE
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Front Desk Receptionist</strong>
              <br />
              Presley Laurent
              <br />
              2014 - Present | Gainesville, VA
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Managed reception area, handled customer inquiries, and provided
              administrative support. This role developed my communication,
              problem-solving, and organizational skills.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaLanguage className="mr-2" /> LANGUAGES
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Python - Beginner
              <br />
              JavaScript - Intermediate
              <br />
              HTML/CSS - Intermediate
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaHeart className="mr-2" /> PASSIONS
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
              <li>Technology and Programming</li>
              <li>Creative Problem-Solving</li>
              <li>Personal Development</li>
              <li>Team Collaboration</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaStar className="mr-2" /> ACHIEVEMENTS
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Successfully contributed to the growth and operational efficiency
              of my family’s business. This experience instilled a strong work
              ethic and taught me valuable lessons in entrepreneurship and
              customer service.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaListUl className="mr-2" /> STRENGTHS
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>
                <span className="text-teal-500">Proactive Learner:</span>{" "}
                Continuously seeks out new knowledge and skills, staying updated
                with the latest technologies and best practices in software
                development.
              </li>
              <li>
                <span className="text-teal-500">Strong Work Ethic:</span>{" "}
                Demonstrated commitment and dedication through extensive
                experience in family business and current educational pursuits.
              </li>
              <li>
                <span className="text-teal-500">
                  Problem-Solving Abilities:
                </span>{" "}
                Adept at troubleshooting and resolving technical issues, as well
                as creatively addressing challenges in project development.
              </li>
              <li>
                <span className="text-teal-500">
                  Collaborative Team Player:
                </span>{" "}
                Works effectively in team settings, contributing positively to
                group projects and fostering a cooperative work environment.
              </li>
              <li>
                <span className="text-teal-500">Adaptability:</span> Quickly
                adapts to new tools, technologies, and environments, ensuring
                seamless integration and contribution to projects.
              </li>
              <li>
                <span className="text-teal-500">
                  Customer Service Oriented:
                </span>{" "}
                Brings valuable experience in customer service, enhancing
                communication and interpersonal skills vital for understanding
                and addressing user needs.
              </li>
              <li>
                <span className="text-teal-500">Attention to Detail:</span>{" "}
                Ensures accuracy and precision in coding, documentation, and
                overall project execution, leading to high-quality deliverables.
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaProjectDiagram className="mr-2" /> PROJECTS
            </h2>
            <ul className="list-disc list-inside space-y-4">
              <li>
                <a
                  href="https://prestonnguyen2001.github.io/Two-Page-Personal-Blog/"
                  className="text-teal-500 hover:underline"
                >
                  Two-Page Personal Blog
                </a>
                <p className="text-gray-700 dark:text-gray-300">
                  Developed a personal blog website using HTML, CSS, and
                  JavaScript. This project helped me understand the basics of
                  web development and user interface design.
                </p>
              </li>
              <li>
                <a
                  href="https://prestonnguyen2001.github.io/Dynamic-Resume-Builder/"
                  className="text-teal-500 hover:underline"
                >
                  Dynamic Resume Builder
                </a>
                <p className="text-gray-700 dark:text-gray-300">
                  Created an interactive web application for building and
                  customizing resumes. This project enhanced my skills in
                  JavaScript and frontend frameworks.
                </p>
              </li>
              <li>
                <a
                  href="https://prestonnguyen2001.github.io/Dynamic-Weather-Dashboard/"
                  className="text-teal-500 hover:underline"
                >
                  Weather Dashboard
                </a>
                <p className="text-gray-700 dark:text-gray-300">
                  Built a weather dashboard that displays current weather
                  conditions and forecasts. Utilized APIs to fetch data and
                  dynamically update the interface.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
