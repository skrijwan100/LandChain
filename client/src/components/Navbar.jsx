import React from "react";
import Button from "./UI/Button.jsx";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 md:px-8 md:py-6 border-b-4 border-[#121212] bg-white sticky top-0 z-50">
      <div className="flex items-center gap-3 cursor-pointer">
        {/* Geometric Logo */}
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-[#D02020] border-2 border-[#121212] z-10"></div>
          <div className="w-8 h-8 bg-[#1040C0] border-2 border-[#121212] z-20"></div>
          <div className="w-8 h-8 bg-[#F0C020] border-2 border-[#121212] z-30 flex items-center justify-center">
            <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-10 border-l-transparent border-r-transparent border-b-[#121212]"></div>
          </div>
        </div>
        <span className="text-3xl font-black tracking-tighter uppercase ml-2 font-['Outfit'] text-[#121212]">
          LandChain
        </span>
      </div>

      {/* Desktop Links & Buttons */}
      <div className="hidden md:flex gap-6 items-center">
        <a
          href="#about"
          className="font-bold uppercase tracking-widest text-[#121212] hover:text-[#1040C0] transition-colors font-['Outfit']"
        >
          How it Works
        </a>
        <Button variant="outline">Docs</Button>
        <Button variant="primary">Connect Wallet</Button>
      </div>

      {/* Mobile Menu Button (Hamburger placeholder) */}
      <div className="md:hidden">
        <button className="p-2 border-4 border-[#121212] bg-[#F0C020] shadow-[4px_4px_0px_0px_#121212]">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </nav>
  );
}
