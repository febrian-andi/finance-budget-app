import { useState } from "react";
import Swal from "sweetalert2";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import timerImage from "../assets/timer.png";
import budgetImage from "../assets/budget-image.png"

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenAlert = () => {
    Swal.fire({
      title: "Coming Soon",
      imageUrl: timerImage,
      imageHeight: 150,
      imageAlt: "image",
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="md:flex justify-between items-center mb-8 p-4 bg-white shadow-md">
      <div className="flex justify-between items-center space-x-4">
      <img src={budgetImage} className="w-12"/>
        <h1 className="text-2xl font-semibold">Budget</h1>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? (
              <XMarkIcon className="w-8 h-8 text-gray-700" />
            ) : (
              <Bars3Icon className="w-8 h-8 text-gray-700" />
            )}
          </button>
        </div>
      </div>
      <nav
        className={`md:flex items-center mt-2 ${
          isMenuOpen ? "block" : "hidden"
        } md:block`}
      >
        <a
          onClick={handleOpenAlert}
          className="text-gray-700 cursor-pointer block md:inline mx-3"
        >
          Overview
        </a>
        <a className="text-blue-700 font-semibold cursor-pointer block md:inline mx-3">
          Finance
        </a>
        <a
          onClick={handleOpenAlert}
          className="text-gray-700 cursor-pointer block md:inline mx-3"
        >
          Calendar
        </a>
        <a
          onClick={handleOpenAlert}
          className="text-gray-700 cursor-pointer block md:inline mx-3"
        >
          Events
        </a>
      </nav>
      <div className="hidden md:flex items-center space-x-4">
        <img
          src="https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <input
            type="search"
            placeholder="Search"
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-200"
          />
          <img
            src="https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
      )}
    </header>
  );
}

export default Header;
