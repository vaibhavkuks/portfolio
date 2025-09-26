import React from 'react';

const Portfolio = () => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto p-8">

        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">John Doe</h1>
          <p className="text-xl text-gray-600 mt-2">Aspiring Software Developer</p>
        </header>

        {/* About Me Section */}
        <section id="about" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-6">About Me</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Hello! I'm John, a passionate and creative software developer with a love for building beautiful and functional applications. I have a background in computer science and enjoy working on challenging projects that allow me to learn and grow. When I'm not coding, I enjoy hiking, reading, and exploring new technologies.
          </p>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-6">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Project One</h3>
              <p className="text-gray-700">
                A brief description of the first project. It was built using React and Node.js, focusing on creating a seamless user experience.
              </p>
            </div>
            {/* Project 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Project Two</h3>
              <p className="text-gray-700">
                This project involved developing a mobile application for both iOS and Android. The main goal was to solve a real-world problem.
              </p>
            </div>
            {/* Project 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Project Three</h3>
              <p className="text-gray-700">
                An e-commerce website with a complete backend for managing products, orders, and users. Built with a modern tech stack.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-6">Skills</h2>
          <div className="flex flex-wrap">
            <span className="bg-gray-300 text-gray-800 text-lg font-medium mr-2 mb-2 px-4 py-2 rounded-full">JavaScript</span>
            <span className="bg-gray-300 text-gray-800 text-lg font-medium mr-2 mb-2 px-4 py-2 rounded-full">React</span>
            <span className="bg-gray-300 text-gray-800 text-lg font-medium mr-2 mb-2 px-4 py-2 rounded-full">Node.js</span>
            <span className="bg-gray-300 text-gray-800 text-lg font-medium mr-2 mb-2 px-4 py-2 rounded-full">Python</span>
            <span className="bg-gray-300 text-gray-800 text-lg font-medium mr-2 mb-2 px-4 py-2 rounded-full">SQL</span>
            <span className="bg-gray-300 text-gray-800 text-lg font-medium mr-2 mb-2 px-4 py-2 rounded-full">HTML & CSS</span>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-6">Contact</h2>
          <p className="text-lg text-gray-700">
            Feel free to reach out to me at <a href="mailto:john.doe@example.com" className="text-blue-600 hover:underline">john.doe@example.com</a>.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Portfolio;