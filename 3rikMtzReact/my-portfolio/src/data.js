Support our charity and our mission. Donate to freeCodeCamp.org.

JUNE 21, 2021
/
#REACT
How to Build a Portfolio Website with React
Reed Barger
Reed Barger
How to Build a Portfolio Website with React
Today you're going to create one of the most important apps you can build for yourself: your developer portfolio.

Every React developer or web developer in general needs to be able to show off what they can do to any potential client or employer.

That's exactly what we're going to be building right now, with the help of a number of industry standard tools, including React, Tailwind CSS, and Netlify.

Let's get started!

What Will the Portfolio Look Like?
portfolio-1-min
This is the final version of the portfolio you will be building.

It will feature information about yourself, what projects you have made, what skills you've used in making those projects, and will include a contact form for clients or employers to reach out to you.

What Tools Will We Be Using?
We will use React to create the app's user interface. It will allow us to compose each part of our landing page through reusable components and extend our app if we want to add additional features, such as a blog.
To style our application, we will use Tailwind CSS. To give our app a professional appearance, Tailwind will allow us to easily apply multiple styles through combining classnames on our React elements.
For pushing our app to the web, we will use the free service Netlify. It will serve our project on a custom domain to users very quickly with the help of a CDN (content delivery network).
How to Get Started
You can download the starting files for our project here.

When you grab the code, all you will have to do is drag your (unzipped) project folder into your code editor and run the command:

npm install
And you're good to go!

What Tools Do I Need to Build my Portfolio?
To go through the entire process of creating our app from start to deployment, you will need to have the following:

Node.js installed on your computer. You can download it at nodejs.org.
Git installed on your computer. You can download it at git-scm.com.
I would recommend using VS Code as your code editor. You can download it at code.visualstudio.com.
A free Netlify account at netlify.com.
A free GitHub account at github.com.
How to Build the Portfolio Structure
The benefit of using React is that we could expand our app to as many pages as we like, very simply, and add a lot of additional content.

However, since we're just working with one page, we can within our app component figure out the different components that we need very quickly. We will have a Navbar on top with all of the links to jump to different sections of our portfolio.

After that, we will include an about section, a section for our projects, testimonials, and finally our contact form.

This quick planning allows us to figure out what our components should be named and in what order. We can go ahead and add all of them to our App.js file (in src):

// src/App.js

import React from "react";

export default function App() {
  return (
    <main>
      <Navbar />
      <About />
      <Projects />
      <Skills />
      <Testimonials />
      <Contact />
    </main>
  );
}
How to Create our Components
Now that we have all these components listed out we need to go ahead and create them.

Within our source (src) folder, we're going to create a folder called components with all of the files that we need:

my-portfolio
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.js
    ├── data.js
    ├── index.css
    ├── index.js
    └── components
        ├── About.js
        ├── Contact.js
        ├── Navbar.js
        ├── Projects.js
        ├── Skills.js
        └── Testimonials.js
Then we will create the basic structure of each React component and export it from that file with export default:

// src/components/About.js

export default function About() {}

// repeat the same basic structure for all 6 components
And finally make sure to import it back in App.js:

// src/App.js

import React from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Testimonials from "./components/Testimonials";

export default function App() {
  return (
    <main>
      <Navbar />
      <About />
      <Projects />
      <Skills />
      <Testimonials />
      <Contact />
    </main>
  );
}
Note that there should be six components in total.

Intro to Tailwind CSS
Once that's done, we can start working with Tailwind CSS, in order to start to give our app a basic appearance.

The benefit of using Tailwind CSS is that we don't have to write any styles manually in a CSS stylesheet. All we have to do is combine multiple classes to create the appearance that we want.

For example, to give our portfolio a dark background with gray text applied to all of our child components, you can add the following classes to our main element:

// src/App.js

import React from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Testimonials from "./components/Testimonials";

export default function App() {
  return (
    <main className="text-gray-400 bg-gray-900 body-font">
      <Navbar />
      <About />
      <Projects />
      <Skills />
      <Testimonials />
      <Contact />
    </main>
  );
}
How to Build the About Component
Let's start on our first section, the about section. This will consist of a basic introduction to ourselves and what skills we specialize in.

It's also going to include some links to the contact form as well as our past projects. Since these links will be to different parts of the same page, we can use the hashes: "/#projects" and "/#contact".

To make these links work and to be able to jump to each section, we will set the id attribute of the projects section to "projects" and those of the contact section to "contact".

// src/components/About.js

import React from "react";

export default function About() {
  return (
    <section id="about">
      <div className="container mx-auto flex px-10 py-20 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Hi, I'm Reed.
            <br className="hidden lg:inline-block" />I love to build amazing
            apps.
          </h1>
          <p className="mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
            laborum quasi, incidunt dolore iste nostrum cupiditate voluptas?
            Laborum, voluptas natus?
          </p>
          <div className="flex justify-center">
            <a
              href="#contact"
              className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">
              Work With Me
            </a>
            <a
              href="#projects"
              className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
              See My Past Work
            </a>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="./coding.svg"
          />
        </div>
      </div>
    </section>
  );
}
For the image on the righthand side of the section, I am using an svg file from the public folder, coding.svg.

This image serves merely as a temporary placeholder. I would highly recommend using an actual image of yourself.

How to Build the Projects Component
Our projects section will consist of a section element with an id of "projects". This will feature a gallery of all the projects that we've built, which will include images.

It'll have the title of the project, along with the technologies we use to make it, and a link to it (if it is deployed).

// src/components/Projects.js

import { CodeIcon } from "@heroicons/react/solid";
import React from "react";
import { projects } from "../data";

export default function Projects() {
  return (
    <section id="projects" className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-10 mx-auto text-center lg:px-40">
        <div className="flex flex-col w-full mb-20">
          <CodeIcon className="mx-auto inline-block w-10 mb-4" />
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-white">
            Apps I've Built
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo
            facilis repellat ab cupiditate alias vero aliquid obcaecati quisquam
            fuga dolore.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {projects.map((project) => (
            <a
              href={project.link}
              key={project.image}
              className="sm:w-1/2 w-100 p-4">
              <div className="flex relative">
                <img
                  alt="gallery"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  src={project.image}
                />
                <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-800 bg-gray-900 opacity-0 hover:opacity-100">
                  <h2 className="tracking-widest text-sm title-font font-medium text-green-400 mb-1">
                    {project.subtitle}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-white mb-3">
                    {project.title}
                  </h1>
                  <p className="leading-relaxed">{project.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
Note that we are also going to use the library @heroicons/react in order to be able to write some SVG icons as React components.

We are importing an array of projects from a data.js file in the same folder. There we are exporting an array of objects which each include an individual project's data:

// src/data.js

export const projects = [
  {
    title: "React Reserve",
    subtitle: "MERN Stack",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dolore rerum laborum iure enim sint nemo omnis voluptate exercitationem eius?",
    image: "./project-1.gif",
    link: "https://reactbootcamp.com",
  },
  {
    title: "React Tracks",
    subtitle: "React and Python",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dolore rerum laborum iure enim sint nemo omnis voluptate exercitationem eius?",
    image: "./project-2.gif",
    link: "https://reedbarger.com",
  },
  {
    title: "DevChat",
    subtitle: "React and Firebase",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dolore rerum laborum iure enim sint nemo omnis voluptate exercitationem eius?",
    image: "./project-3.gif",
    link: "https://jsbootcamp.com",
  },
  {
    title: "Epic Todo App",
    subtitle: "React Hooks",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dolore rerum laborum iure enim sint nemo omnis voluptate exercitationem eius?",
    image: "./project-4.gif",
    link: "https://pythonbootcamp.com",
  },
];