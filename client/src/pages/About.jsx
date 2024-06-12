export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-3">
        <h1 className="text-6xl font-semibold text-center my-12">About Me</h1>
        <div className="text-lg text-gray-500 flex flex-col gap-6 text-center">
          <p>
            I have spent most of my adult life working for my parent&apos;s
            business, where I learned invaluable lessons about hard work,
            dedication, and entrepreneurship. However, as I embarked on a path
            of self-discovery, I uncovered a hidden passion for technology and
            programming. Now, as a George Washington University Coding Bootcamp
            student, I approach each new challenge with an eagerness to learn
            and a proactive mindset geared towards overcoming obstacles.
          </p>

          <p>
            I encourage you to leave comments on my posts and engage with other
            readers. You can like other people&apos;s comments and reply to them
            as well. I hope you find something valuable and inspiring here.
            Let&apos;s embark on this coding adventure together!
          </p>
        </div>

        <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <h2 className="text-4xl font-semibold mb-6 text-center">
              My Passions
            </h2>
            <div className="text-lg text-gray-500 flex flex-col gap-4 text-center">
              <p>Technology and Programming</p>
              <p>Creative Problem-Solving</p>
              <p>Personal Development</p>
              <p>Team Collaboration</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-4xl font-semibold mb-6 text-center">
              My Skills
            </h2>
            <div className="flex flex-col md:flex-row gap-8 w-full">
              <div className="text-lg text-gray-500 flex flex-col gap-4 text-center w-full">
                <h3 className="text-2xl font-semibold">Languages</h3>
                <p>Python - Beginner</p>
                <p>Javascript - Intermediate</p>
                <p>HTML/CSS - Intermediate</p>
              </div>

              <div className="text-lg text-gray-500 flex flex-col gap-4 text-center w-full">
                <h3 className="text-2xl font-semibold mt-6 md:mt-0">
                  Soft Skills
                </h3>
                <p>Problem solving</p>
                <p>Communication</p>
                <p>Teamwork</p>
                <p>Attention to detail</p>
                <p>Adaptability</p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-12">
          <div className="flex flex-col items-center">
            <h2 className="text-4xl font-semibold mb-6 text-center">
              My Strengths
            </h2>
            <div className="text-lg text-gray-500 flex flex-col gap-4 text-center">
              <p><strong>Proactive Learner:</strong> Continuously seeks out new knowledge and skills, staying updated with the latest technologies and best practices in software development.</p>
              <p><strong>Strong Work Ethic:</strong> Demonstrated commitment and dedication through extensive experience in family business and current educational pursuits.</p>
              <p><strong>Problem-Solving Abilities:</strong> Adept at troubleshooting and resolving technical issues, as well as creatively addressing challenges in project development.</p>
              <p><strong>Collaborative Team Player:</strong> Works effectively in team settings, contributing positively to group projects and fostering a cooperative work environment.</p>
              <p><strong>Adaptability:</strong> Quickly adapts to new tools, technologies, and environments, ensuring seamless integration and contribution to projects.</p>
              <p><strong>Customer Service Oriented:</strong> Brings valuable experience in customer service, enhancing communication and interpersonal skills vital for understanding and addressing user needs.</p>
              <p><strong>Attention to Detail:</strong> Ensures accuracy and precision in coding, documentation, and overall project execution, leading to high-quality deliverables.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
