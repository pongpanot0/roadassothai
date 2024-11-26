"use client";
import { NAV_LINKS, NAV_LINKS_EN } from "@/app/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./Button";
import LoginButton from "@/app/LoginButton";
import Sidebar, { SidebarItem } from "./Users/Sidebar";
import SideNavbarAdmin from "./Admin/SideNavbarAdmin";
import { usePathname } from "next/navigation"; // Import useRouter hook
import { FaAddressBook } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import ModalLogin from "./Users/Modal/ModalLogin";

const Navbar = ({ children }) => {
  const router = usePathname(); // Get the current route
  const [showModal, setshowModal] = React.useState(false);
  const { data: session } = useSession();
  const user = router.split("/")[1];

  const setLange = async (data) => {
    localStorage.setItem("lan", data);
    window.location.reload();
  };
  const [lannow, setLannow] = useState("EN"); // Default to English

  // Use useEffect to set the language from localStorage after the client has loaded
  React.useEffect(() => {
    const language = localStorage.getItem("lan") || "EN"; // Default to 'EN' if not found
    setLannow(language);
  }, []); // This ensures the effect runs once after the component mounts
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      {user === "user" ? (
        <Sidebar children={children} />
      ) : user === "admin" ? (
        <SideNavbarAdmin children={children} />
      ) : (
        <div className="overflow-hidden">
          <nav className="max-container2  bg-gradient-to-l from-[#77A8D8]  to-[#295F93] flexBetween padding-container relative z-30 w-full">
            <div className="xs:hidden md:block"></div>
            <Link href="/">
              <img
                src="/LOGO-FINAL.png"
                className="px-4 md:p-0 w-44"
                alt=""
              />
            </Link>

            <ul className="hidden h-full gap-0 md:gap-10 lg:flex">
              {lannow == "TH" ? (
                <>
                  {NAV_LINKS.map((link, index) => (
                    <Link
                      href={link.href}
                      key={index}
                      className="regular-16 text-white 
                  flexCenter cursor-pointer
                          text-3xl
                   pb-1.5 transition-all hover:scale-125 hover:text-[#295F93]"
                    >
                   <p className=" text-xl"> {link.label}</p>
                    </Link>
                  ))}
                </>
              ) : (
                <>
                  {NAV_LINKS_EN.map((link, index) => (
                    <Link
                      href={link.href}
                      key={index}
                      className="regular-16 text-white 
                  flexCenter cursor-pointer
                   text-3xl
                   pb-1.5 transition-all hover:scale-125 hover:text-[#295F93]"
                    >
                      <p className=" text-xl"> {link.label}</p>
                    </Link>
                  ))}
                </>
              )}
            </ul>

            <div className="lg:flexCenter hidden mr-5">
              <LoginButton />
              {lannow == "TH" ? (
                <button
                  onClick={(e) => setLange("EN")}
                  className="cursor-pointer flex ml-5 item-center bg-[#295F93] p-2 text-white rounded-lg hover:scale-110"
                >
                  EN
                </button>
              ) : (
                <button
                  onClick={(e) => setLange("TH")}
                  className="cursor-pointer flex ml-5 item-center bg-[#295F93] p-2 text-white rounded-lg hover:scale-110"
                >
                  TH
                </button>
              )}
            </div>

            <div className="div"></div>
            <div className="relative lg:hidden">
              <Image
                src="/menu.svg"
                alt="menu"
                width={32}
                height={32}
                className="inline-block cursor-pointer mr-10 md:mr-2"
                onClick={toggleDropdown}
              />

              {isDropdownOpen && (
                <div className="fixed inset-0   bg-gradient-to-l from-[#77A8D8]  to-[#295F93] bg-opacity-80 h-50 z-50">
                  <div className="absolute top-12 right-0 w-full max-w-screen-sm rounded-lg p-2">
                    <div className="flex  justify-between">
                      {" "}
                      <img
                        src="/LOGO-FINAL.png"
                        className="w-auto h-32"
                        alt=""
                      />
                      <Image
                        src="/menu.svg"
                        alt="menu"
                        width={32}
                        height={32}
                        className="inline-block cursor-pointer mr-10 md:mr-2"
                        onClick={toggleDropdown}
                      />
                    </div>

                    {NAV_LINKS.map((link, index) => (
                      <Link
                        onClick={toggleDropdown}
                        href={link.href}
                        key={index}
                        className="regular-16 text-white 
              flexCenter cursor-pointer
              bg-gradient-to-l from-[#77A8D8]  to-[#295F93]
        text-lg
              px-5
              mb-5
               border border-gray-100
              pb-1.5 transition-all hover:scale-110 hover:text-[#295F93]"
                      >
                        {link.label}
                      </Link>
                    ))}
                    {session?.user ? (
                      <>
                        <a
                          className="regular-16 text-white 
              flexCenter cursor-pointer
              bg-gradient-to-l from-[#77A8D8]  to-[#295F93]
              px-5
              mb-5
               border border-gray-100
              pb-1.5 transition-all hover:scale-110 hover:text-[#295F93]"
                          href={`/user/dashboard`}
                        >
                          เข้าสู่หน้า Dashboard User
                        </a>
                        <a
                          className="regular-16 text-white 
              flexCenter cursor-pointer
              bg-gradient-to-l from-[#77A8D8]  to-[#295F93]
              px-5
              mb-5
               border border-gray-100
              pb-1.5 transition-all hover:scale-110 hover:text-[#295F93]"
                          href={`/admin/news`}
                        >
                          เข้าสู่หน้า Dashboard Admin
                        </a>
                        <a
                          onClick={() => signOut()}
                          className="regular-16 text-white 
                          flexCenter cursor-pointer
                          bg-gradient-to-l from-[#77A8D8]  to-[#295F93]
                          px-5
                          mb-5
                           border border-gray-100
                          pb-1.5 transition-all hover:scale-110 hover:text-[#295F93]"
                        >
                          LogOut
                        </a>
                        <div className="text-center ">
                          {lannow == "TH" ? (
                            <button
                              onClick={(e) => setLange("EN")}
                              className="cursor-pointer text-center w-full  bg-[#d4e6f7] p-2 text-black rounded-lg hover:scale-110"
                            >
                              EN
                            </button>
                          ) : (
                            <button
                              onClick={(e) => setLange("TH")}
                              className="cursor-pointer w-full text-center    bg-[#d4e6f7] p-2 text-black rounded-lg hover:scale-110"
                            >
                              TH
                            </button>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-white 
            rounded-2xl bg-slate-600  w-full pt-2 pb-2 pl-7 pr-7  hover:bg-slate-950
            hover:border-gray-10
         
            "
                          onClick={(e) => setshowModal(!showModal)}
                        >
                          sign In
                        </button>
                        {showModal ? <ModalLogin onClose={"false"} /> : null}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </nav>
          {children}
        </div>
      )}
    </>
  );
};

export default Navbar;
