import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { RxHamburgerMenu } from 'react-icons/rx';


const Header = () => {
  const [isMobile, setIsMobile] = useState(false)
  return (
    <header className={`bg-[#3B3D43] px-4 py-3 transition-all overflow-y-hidden duration-300 ease-out md:max-h-[150px] ${isMobile ? 'max-h-[170px]' : 'max-h-[66px]'}`}>
      <div className="container mx-auto flex md:items-center flex-col md:flex-row md:justify-between">
        
        <div className="flex items-center justify-between w-full">
          <Link href="/">
            <Image
              src="/images/header-logo.png"
              alt=""
              className="logo"
              width={155}
              height={100}
            />
          </Link>
          <div className="block md:hidden border border-gray p-[6px] px-3 rounded-md text-[#A7A7AA] border-gray-500" onClick={()=>setIsMobile(!isMobile)}>
          <RxHamburgerMenu size={30}/>
          </div>
        </div>
        <div className="md:flex items-center mt-5 md:mt-0">
          <Link href="#" className="md:text-white text-gray-200 block font-semibold">
            Updates
          </Link>
          <input
            type="text"
            placeholder="search here..."
            className="p-2 px-4 text-gray-600 placeholder:text-gray-600 rounded-full mt-4 md:mt-0 md:ml-7"
          />
        </div>
        
      </div>
    </header>
  );
};

export default Header;
