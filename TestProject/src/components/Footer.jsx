import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub, FaFacebook ,FaArrowUp} from 'react-icons/fa';


function Footer() {
  return (
    <>
      <div className="bg-myCustomColor flex md:flex-row flex-col gap-4 items-center justify-between text-center px-4 py-4 sm:px-6 sm:py-6">
        <div className="text-white md:text-xl text-xs font-semibold">
          <p className="pr-3">Copyright &copy; 2024 by team NutriFusion Analyzer | All Right Reserved.</p>
        </div>
        <div className=" flex items-center justify-center space-x-9">
          <a href="#instagram">
            <FaInstagram className="text-white md:text-4xl text-xl hover:scale-125" />
          </a>
          <a href="#linkedin">
            <FaLinkedin className="text-white md:text-4xl text-xl hover:scale-125" />
          </a>
          <a href="#github">
            <FaGithub className="text-white md:text-4xl text-xl hover:scale-125" />
          </a>
          <a href="#facebook">
            <FaFacebook className="md:text-4xl text-white text-xl hover:scale-125" />
          </a>
        </div>
        <div className="bg-myCustomColor border-white  border-2 rounded-md w-20 flex items-center justify-center">
          <a href="#top" className="flex items-center  text-white px-4 py-2 rounded-md">
            <FaArrowUp className="text-2xl" /> 
          </a>
        </div>
      </div>
    </>
  );
}

export default Footer;
