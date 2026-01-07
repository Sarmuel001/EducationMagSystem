import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaPen, FaLongArrowAltRight, FaUserPlus, FaKey, FaBookOpen, FaProjectDiagram, FaSign, FaAirbnb, FaFonticonsFi, FaSchool, FaSortAmountUp, FaUserMinus, FaExclamationCircle, FaLaugh } from "react-icons/fa";
import { FaComputerMouse } from "react-icons/fa6";
// import LoginPage from "../../modules/login";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="bg-blue-0  shadow-md py-2 px-2 flex flex-col justify-between lg:items-center lg:justify-center lg:bg-white fixed w-full left-0 z-1000">
       <header className="w-full h-[80px] bg-center  bg-no-repeat bg-cover md:h-[90px] " style={{backgroundImage:"url('head.png')"}}> </header>
        
        {/* Mobile Toggle Button */}
        <button
          className=" lg:hidden text-black bg-amber-50 top-9 absolute right-6"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </button>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 mt-24 h-full m-2 w-78 z-100 transform transition-transform duration-300 
          ${isOpen ? "translate-x-0 bg-white" : "-translate-x-full"} 
          lg:translate-x-0 lg:left-0  
          ${isOpen ? "right-35" : "right-full"}`} 
      >
        <nav>
          <ul className="flex flex-col gap-4 p-4">
            <li>
              <Link
                className="text-white flex items-center gap-2 p-2  bg-[#181725] rounded text-center hover:bg-blue-900"
                to="/"
              >
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link
                className=" text-white flex items-center gap-2 p-2 bg-[#181725] rounded text-center hover:bg-blue-900"
                to="/login"
              >
                <FaPen /> Take a Test
              </Link>
            </li>
            <li>
              <Link
                className="text-white flex items-center gap-2 p-2  bg-[#181725] rounded text-center hover:bg-blue-900"
                to="/exams"
              >
                <FaComputerMouse /> Test Progress
              </Link>
            </li>
            <li>
              <Link
                className="text-white flex items-center gap-2 p-2  bg-[#181725] rounded text-center hover:bg-blue-900"
                to="/register"
              >
                <FaBookOpen /> Students zzResources
              </Link>
            </li>
            <li>
              <Link
                className="text-white flex items-center gap-2 p-2  bg-[#181725] rounded text-center hover:bg-blue-900"
                to="/activation"
              >
                <FaProjectDiagram /> Other Projects
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
