import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 p-6 text-white uppercase">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-center items-center gap-4 md:gap-0">
        <div className="flex-1 flex justify-center mb-2 md:mb-0">
          <a
            className="hover:underline"
            href="https://github.com/suraj2907"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
        <div className="flex-1 flex justify-center mb-2 md:mb-0">
          <a
            className="hover:underline"
            href="https://www.linkedin.com/in/suraj-jawrani/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </a>
        </div>
        <div className="flex-1 flex justify-center">
          <a
            className="hover:underline"
            href="mailto:Surajjawrani2022@gmail.com"
          >
            Surajjawrani2022@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
