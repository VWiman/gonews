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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="py-3">
      <div className="flex justify-between items-center content-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <img
              src={darkMode ? "/images/gonews-w.svg" : "/images/gonews.svg"}
              alt="Logo"
              className="h-9 w-auto mr-4"
              width={140}
            />
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/">Home</Link>
          <Link href="/sports">Sports</Link>
          <Link href="/entertainment">Entertainment</Link>
          <Link href="/bookmarks">Bookmarks</Link>
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
            {isMobileMenuOpen ? (
              <FaTimes className="h-7 w-7" />
            ) : (
              <FaBars className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-90 flex flex-col"
          onClick={closeMobileMenu}
        >
          <div className="flex-grow" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end">
              <button
                onClick={toggleMobileMenu}
                className="p-4 focus:outline-none "
              >
                <FaTimes className="h-7 w-7 fill-white" />
              </button>
            </div>
            <ul className="p-4 text-center">
              <li className="mb-2">
                <Link href="/" className="hover:text-gray-300 text-white block">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/sports"
                  className="hover:text-gray-300 text-white block"
                >
                  Sports
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/entertainment"
                  className="hover:text-gray-300 text-white block"
                >
                  Entertainment
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  className="hover:text-gray-300 text-white block"
                  href="/bookmarks"
                >
                  Bookmarks
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
