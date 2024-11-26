import Link from "next/link";
import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { IoCaretBackCircleSharp } from "react-icons/io5";

function SideNavbar({ children }) {
  const [open, setOpen] = useState(true);
  const Menus = [
    {
      title: "Dashboard",
      src: (
        <FaHome className={`${open ? " scale-100" : "scale-125 text-2xl"} `} />
      ),
      path: "/user/dashboard",
    },
    {
      title: "Profile",
      src: (
        <FaHome className={`${open ? " scale-100" : "scale-125 text-2xl"} `} />
      ),
      path: "/user/profile",
    },
    {
      title: "กลับหน้าหลัก",
      src: (
        <IoCaretBackCircleSharp
          className={`${open ? " scale-100" : "scale-125 text-2xl"} `}
        />
      ),
      path: "/",
    },
    
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "  w-60" : " w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300 bg-gradient-to-b from-[#77A8D8]  to-[#295F93]`}
      >
        <img
          src="/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            SSOTHAI
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link key={index} href={Menu.path}>
              <li
                className={`flex   rounded-md p-2 cursor-pointer hover:scale-110 text-white text-md items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
              >
                {Menu.src}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className=" h-[100vh] flex-1 p-7 relative overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

export default SideNavbar;
