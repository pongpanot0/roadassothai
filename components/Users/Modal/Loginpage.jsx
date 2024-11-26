"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useRef } from "react";
import { FaEye } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";

const LoginPage = ({ onCloses }) => {
  const userName = useRef("");
  const pass = useRef("");

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      username: userName.current,
      password: pass.current,
      redirect: false,
    });

    if (result?.status == 200) {
      Swal.fire({
        icon: "success",
        title: "Login สำเร็จ",
        showConfirmButton: true,
        timer: 1500,
      }).then((response) => {
        if (response.isConfirmed == true) {
          window.location.reload();
        }
        window.location.reload();
      });
    }
    if (result?.status == 401) {
      Swal.fire({
        icon: "error",
        title: "Username หรือ รหัสผ่านไม่ถูกต้อง",
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-3 items-center relative">
        {/* Close Icon */}
        <IoClose
          onClick={(e) => onCloses()}
          className="absolute top-3 right-3 text-2xl text-gray-500 cursor-pointer hover:text-gray-700"
        />

        <div className="md:w-full px-5 py-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            If you are already a member, easily log in
          </p>

          <div className="flex flex-col gap-4">
            <input
              onChange={(e) => (userName.current = e.target.value)}
              className="p-2 mt-8 rounded-xl border"
              type="text"
              name="username"
              autoComplete="false"
              placeholder="Email"
            />
            <div className="relative">
              <input
                onChange={(e) => (pass.current = e.target.value)}
                className="p-2 rounded-xl border w-full"
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="false"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </div>
            <button
              onClick={onSubmit}
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              Login
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <a href={"/siginin"}>
            <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
              Register
            </button>
          </a>
        </div>

        <div className="md:block  hidden w-full">
          <img className="rounded-2xl h-64" src="/LOGO-FINAL.png" alt="Logo" />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
