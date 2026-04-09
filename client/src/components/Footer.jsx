import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-white p-8 md:p-16 font-['Outfit'] border-t-4 border-[#121212]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Footer Brand */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#F0C020] border-2 border-white rounded-none rotate-12"></div>
          <span className="text-4xl font-black uppercase tracking-widest text-[#F0F0F0]">
            LandChain
          </span>
        </div>

        {/* Footer Links */}
        <div className="flex gap-6 font-bold uppercase tracking-widest">
          <a href="#" className="hover:text-[#F0C020] transition-colors">
            Github
          </a>
          <a href="#" className="hover:text-[#1040C0] transition-colors">
            Contracts
          </a>
          <a href="#" className="hover:text-[#D02020] transition-colors">
            Team
          </a>
        </div>
      </div>
    </footer>
  );
}
