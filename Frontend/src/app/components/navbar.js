"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-2">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Codiste</span>
      </div>
      <div className="block lg:hidden">
        <button
          id="nav-toggle"
          className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white"
          onClick={toggleNav}
        >
          <svg
            className="fill-current h-6 w-6"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path
              d="M0 3h20v2H0V3zm0 5h20v2H0V8zm0 5h20v2H0v-2z"
            />
          </svg>
        </button>
      </div>
      <div
        className={`${
          isNavOpen ? 'flex' : 'hidden'
        } w-full flex-grow lg:flex lg:items-center lg:w-auto mt-2 lg:mt-0 lg:justify-end`}
        id="nav-content"
      >
        <div className="text-sm lg:flex-grow">
          <Link href="/">
            <div className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-200 mr-4">
              Users
            </div>
          </Link>
          <Link href="/registration">
            <div className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-200 mr-4">
              Register
            </div>
          </Link>
        </div>
        <Link href="/login">
          <button className="text-white border border-white rounded px-3 py-1 hover:bg-white hover:text-blue-500">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
