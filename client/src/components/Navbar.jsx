import React from "react";
import { useNav } from "../App.jsx"; 
import Button from "./UI/Button.jsx";
import landchainLogo from "../assets/landchain.png";

export default function Navbar() {
  // Navigation function context se nikala
  const { navigateWithLoader } = useNav();

  return (
    <nav className="flex justify-between items-center p-4 md:px-8 md:py-6 border-b-4 border-[#121212] bg-white sticky top-0 z-50">
      {/* Logo Area - Custom Navigation */}
      <div
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => navigateWithLoader("/")}
      >
        {/* Gradient Border Wrapper */}
        <div className="p-0.75 rounded-xl bg-linear-to-tr from-[#D02020] via-[#F0C020] to-[#1040C0] transition-transform duration-300 group-hover:scale-105 shadow-[4px_4px_0px_0px_#121212]">
          <div className="bg-[#121212] rounded-lg overflow-hidden flex items-center justify-center p-1 md:p-1.5">
            <img
              src={landchainLogo}
              alt="LandChain Logo"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </div>
        </div>

        <span className="text-3xl font-black tracking-tighter uppercase ml-2 font-['Outfit'] text-[#121212]">
          LandChain
        </span>
      </div>

      {/* Desktop Links - Replaced Link with navigateWithLoader */}
      <div className="hidden md:flex gap-8 items-center font-['Outfit']">
        <button
          onClick={() => navigateWithLoader("/verify-land")}
          className="font-bold uppercase tracking-widest text-[#121212] hover:text-[#1040C0] transition-colors cursor-pointer border-none bg-transparent"
        >
          Verify Land
        </button>

        <button
          onClick={() => navigateWithLoader("/submit-blockchain")}
          className="font-bold uppercase tracking-widest text-[#121212] hover:text-[#D02020] transition-colors cursor-pointer border-none bg-transparent"
        >
          Mint Land
        </button>

        <Button variant="primary">Connect Wallet</Button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button className="p-2 border-4 border-[#121212] bg-[#F0C020] shadow-[4px_4px_0px_0px_#121212] hover:bg-[#F0C020]/90 transition-colors">
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
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
