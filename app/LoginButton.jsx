"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { GrLanguage } from "react-icons/gr";

import { FaUser } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import ModalLogin from "@/components/Users/Modal/ModalLogin";
import { IoPeople } from "react-icons/io5";
const LoginButton = () => {
  const [showModal, setshowModal] = React.useState(false);
  const { data: session } = useSession();

  const closeUpdate = () => {
    setshowModal(false);
  };
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="ml-auto flex gap-2">
      {session?.user ? (
        <>
          <div className="relative inline-block text-left">
            <div className="group">
              {" "}
              <button
                type="button"
                className="px-4 py-3 text-white bg-[#295F93] focus:ring-4 focus:outline-none focus:ring-blue-700 font-medium rounded-lg text-sm inline-flex items-center"
                onClick={toggleDropdown}
              >
                <IoPeople className=" scale-125  text-xl" />
                <svg
                  class="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <ul
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {session?.user.image == 2 ? (
                      <div>
                        <a
                          href={`/user/dashboard`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          เข้าสู่หน้า Dashboard User
                        </a>
                        <a
                          onClick={() => signOut()}
                          className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          LogOut
                        </a>
                      </div>
                    ) : (
                      <div>
                        <a
                          href={`/admin/news`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          เข้าสู่หน้า Dashboard Admin
                        </a>
                        <a
                          onClick={() => signOut()}
                          className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          LogOut
                        </a>
                      </div>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <button
            className="text-white 
            rounded-2xl bg-slate-600  pt-2 pb-2 pl-7 pr-7  hover:bg-slate-950
            hover:border-gray-10
         
            "
            onClick={(e) => setshowModal(!showModal)}
          >
            sign In
          </button>
          {showModal ? <ModalLogin onClose={(e) => closeUpdate()} /> : null}
        </>
      )}
    </div>
  );
};
export default LoginButton;
