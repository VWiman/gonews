// Header.js

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/store/darkModeSlice";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

const Header = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.value);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="flex justify-between items-center py-3">
      {/* Logo */}

      <div className="flex items-center">
        <Link href="/">
          <img
            src={darkMode ? "/images/gonews-w.svg" : "/images/gonews.svg"}
            alt="Logo"
            className="h-8 w-auto mr-4"
            width={140}
          />
        </Link>
      </div>
      {/* Desktop navigation */}
      <nav className="hidden md:flex space-x-4">
        <Link href="/">Home</Link>
        <Link href="/sports">Sport News</Link>
        <Link href="/entertainment">Entertainment</Link>
        <Link href="/bookmarks">Bokmärken</Link>
      </nav>

      {/* Dark mode toggle */}
      <div className="flex items-center">
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="focus:outline-none mr-4"
        >
          {darkMode ? (
            <IoMdSunny size="1.3em" className="text-white" />
          ) : (
            <IoMdMoon size="1.3em" className="text-black" />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMobileMenu} className="focus:outline-none">
          {/* Hamburger menu icon */}
          {isMobileMenuOpen ? (
            <FaTimes className="h-7 w-7" />
          ) : (
            <FaBars className="h-7 w-7" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full w-full bg-gray-800 text-white">
          <ul className="p-4">
            <li className="mb-2">
              <a href="/" className="hover:text-gray-300 block">
                Home
              </a>
            </li>
            <li className="mb-2">
              <a href="/sports" className="hover:text-gray-300 block">
                Sport News
              </a>
            </li>
            <li className="mb-2">
              <a href="/entertainment" className="hover:text-gray-300 block">
                Entertainment News
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
