import { Socials } from "@/constants";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
       
          
        <Link href="/" className="cursor-pointer  flex flex-row hover:animate-slowspin ">
        <Image src="/assets/images/logo.svg" alt="logo" width={30} height={30} className="object-contain"/>
           <span >
           <p className="font-bold ml-[10px] hidden md:block text-gray-300">New_Gens</p>
          </span>
        
        </Link>

         

        <div className="w-[500px] h-full flex flex-row items-center justify-between md:mr-20">
          <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
          

            <Link href="/lstm" className="cursor-pointer">Roberta Model</Link>
            <Link href="/naive" className="cursor-pointer">Llama Model</Link>
            <Link href ="/" className="cursor-pointer">Presentation</Link>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Navbar;
