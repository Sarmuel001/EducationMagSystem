import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaPen, FaUpload, FaUserPlus, FaKey } from "react-icons/fa";
import LoginPage from "../../modules/login";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div >
      <div className="bg-white shadow-md py-9 px-6 flex justify-between items-center lg:justify-center lg:bg-white fixed w-full left-0">
        <h2 id='headtag' className="text-2xl font-bold lg:text-center  text-green-700 ">Examination Information Mangement System (EIMS)</h2>
        {/* Mobile Toggle Button */}
        <button
          className=" lg:hidden text-black absolute right-6"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
        </button>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 mt-30 h-full m-2 w-78 z-100 transform transition-transform duration-300 
          ${isOpen ? "translate-x-0 bg-white" : "-translate-x-full"} 
          lg:translate-x-0 lg:left-0  
          ${isOpen ? "right-0" : "right-full"}`} 
      >
        <nav>
          <ul className="flex flex-col gap-4 p-4">
            <li>
              <Link
                className="text-white flex items-center gap-2 p-2  bg-green-700 rounded text-center hover:bg-green-600"
                to="/"
              >
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link
                className=" text-white flex items-center gap-2 p-2 bg-green-700 rounded text-center hover:bg-green-600"
                to="/login"
              >
                <FaPen /> Take a Test
              </Link>
            </li>
            <li>
              <Link
                className="text-white flex items-center gap-2 p-2  bg-green-700 rounded text-center hover:bg-green-600"
                to="/exams"
              >
                <FaUpload /> Upload Passport
              </Link>
            </li>
            <li>
              <Link
                className="text-white flex items-center gap-2 p-2  bg-green-700 rounded text-center hover:bg-green-600"
                to="/register"
              >
                <FaUserPlus /> Registration
              </Link>
            </li>
            <li>
              <Link
                className="text-white flex items-center gap-2 p-2  bg-green-700 rounded text-center hover:bg-green-600"
                to="/activation"
              >
                <FaKey /> Get Activation Code
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
