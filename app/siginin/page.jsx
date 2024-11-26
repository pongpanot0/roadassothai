"use client";
import React from "react";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const page = () => {
  const [users, setUsers] = React.useState({
    user_name: "",
    user_password: "",
    user_email: "",
    role: 2,
    firstname_th: "",
    lastname_th: "",
    firstname_en: "",
    lastname_en: "",
    line: "",
    phone: "",
    initial_name: "",
    initial_name_en: "",
  });
  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    setUsers((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };
  const router = useRouter();
  const postData = async () => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(users),
      });
      const re = await response.json();

      if (re.status == 200) {
        Swal.fire({
          icon: "success",
          title: "สร้าง ผู้ใช้งาน สำเร็จ",
          showConfirmButton: true,
          timer: 2500,
        }).then(async (res) => {
          if (res.isConfirmed == true) {
            router.push("/");
          }
          router.push("/");
        });
      }
      if (re.status == 201) {
        Swal.fire({
          icon: "error",
          title: "มีชื่อผู้ใช้งานนี้อยู่แล้ว",
          showConfirmButton: true,
          timer: 1500,
        }).then(async (res) => {});
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="p-10 container mx-auto grid grid-cols-1">
      <div className="">
        <div className="grid grid-cols-2">
          <h2 className="mt-6 text-start text-4xl leading-9 font-extrabold text-gray-900">
            Create a new account
          </h2>
          <button className="primary" onClick={(e) => postData()}>
            ยืนยันข้อมูล
          </button>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-10">
          <div className="mt-1">
            <label
              htmlFor="user_name"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Username
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                onChange={handleInputChange}
                id="user_name"
                name="user_name"
                type="text"
                required=""
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div className="mt-1">
            <label
              htmlFor="user_password"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                onChange={handleInputChange}
                id="user_password"
                name="user_password"
                type="password"
                required=""
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div className="mt-1">
            <label
              htmlFor="initial_name"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              คำนำหน้าชื่อ
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                onChange={handleInputChange}
                id="initial_name"
                name="initial_name"
                type="text"
                required=""
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div className="mt-1">
            <label
              htmlFor="initial_name_en"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              คำนำหน้าชื่อภาษาอังกฤษ
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                onChange={handleInputChange}
                id="initial_name_en"
                name="initial_name_en"
                type="text"
                required=""
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div className="mt-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              ชื่อจริง
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                onChange={handleInputChange}
                id="password"
                name="firstname_th"
                type="text"
                required=""
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div className="mt-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              นามสกุล
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                onChange={handleInputChange}
                id="password"
                name="lastname_th"
                type="text"
                required=""
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>

          <div className="mt-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              First Name
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                id="password"
                onChange={handleInputChange}
                name="firstname_en"
                type="text"
                required=""
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div className="mt-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Lastname
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                id="password"
                onChange={handleInputChange}
                name="lastname_en"
                type="text"
                required=""
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>

          <div className="mt-1 col-span-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Email
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                onChange={handleInputChange}
                id="password"
                name="user_email"
                type="text"
                required=""
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>

          <div className="mt-1 col-span-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Phone
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                onChange={handleInputChange}
                id="password"
                name="phone"
                type="text"
                required=""
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div className="mt-1 col-span-2">
            <label
              htmlFor="line"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Line ID
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                onChange={handleInputChange}
                id="password"
                name="line"
                type="text"
                required=""
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
