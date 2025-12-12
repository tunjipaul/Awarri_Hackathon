import React from "react";
import { Scale } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
          <div className="flex items-center gap-3">
            <Scale size={28} className="text-green-600 flex-shrink-0" />
            <p className="text-xs leading-relaxed text-gray-700">
              CivicAccess is a multilingual LLM that references the 1999 Constitution, the Nigerian Police Act, and the Lagos Tenancy Laws. Bridging the gap between the law and the citizen.
            </p>
          </div>
          <div className="px-3 py-2">
            <p className="text-[9px] leading-tight text-red-600 italic">
              Disclaimer: Every translation is subject to interpretation. This AI provides legal 
              information, not professional legal advice. Terms and conditions apply.
            </p>
          </div>
        </div>
        <p className="text-[10px] text-gray-500 text-center mt-4">
          &copy; {currentYear} CivicAccess. Built by <span className="text-green-600 font-medium">Team Sabilaw</span> for Awarri Hackathon.
        </p>
      </div>
    </footer>
  );
};

export default Footer;