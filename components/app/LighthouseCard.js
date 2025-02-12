"use client";
import { useState, useRef } from "react";
import Gauge from '@/components/app/Guage';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

export default function LighthouseCard({ title, children, bgColor = "bg-white", value, textColor, expandedSize = 800 }) {

  const [dropdown, setDropdown] = useState(false);
  const lighthouseCardRef = useRef(null);

  return (
    <div 
      ref={lighthouseCardRef}
      className={`relative w-full h-[200px] ${bgColor} border border-gray-200 rounded-lg shadow-md flex flex-col justify-start px-8 py-4 overflow-hidden`}
    >
      <div className="flex w-full h-full justify-between px-32 items-center pt-[1.75rem]">
        <h2 className={`text-5xl font-semibold text-[${textColor}]`}>{title}</h2>
        <div className="h-full aspect-square flex justify-center items-center">
          <Gauge value={value} max={100} size={100} textColor={textColor}/>
        </div>
      </div>
      <div className="mb-8 mt-9 px-12">
        {children}
      </div>
      <div 
        className="absolute bottom-0 right-0 px-8 py-6 text-xl cursor-pointer text-gray-500 hover:text-white transition-color duration-300"
        onClick={() => {
          lighthouseCardRef.current.classList.toggle("h-[200px]"); 
          lighthouseCardRef.current.classList.toggle(`h-[${expandedSize}+px]`);
          setDropdown(!dropdown);
        }}
      >
        {dropdown ? (
          <FaChevronUp />
        ) : (
          <FaChevronDown />
        )}      
      </div>
    </div>
  );
}