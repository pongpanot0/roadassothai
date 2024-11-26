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
    engineers_card: "",
    department: "",
    phone: "",
    jobs: "",
  });
  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    setUsers((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };
  const router = useRouter()
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
          timer: 1500,
        }).then(async (res) => {
          if (res.isConfirmed == true) {
            router.push('/admin/user')
          }
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
      <div class="">
        <div class="grid grid-cols-2">
          <h2 class="mt-6 text-start text-4xl leading-9 font-extrabold text-gray-900">
            Create a new account
          </h2>
          <button className="primary" onClick={(e) => postData()}>
            ยืนยันข้อมูล
          </button>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-10">
          <div class="mt-1">
            <label
              for="user_name"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Username
            </label>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                onChange={handleInputChange}
                id="user_name"
                name="user_name"
                type="text"
                required=""
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div class="mt-1">
            <label
              for="password"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Password
            </label>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                onChange={handleInputChange}
                id="password"
                name="user_password"
                type="text"
                required=""
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div class="mt-1">
            <label
              for="password"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              ชื่อจริง
            </label>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                onChange={handleInputChange}
                id="password"
                name="firstname_th"
                type="text"
                required=""
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div class="mt-1">
            <label
              for="password"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              นามสกุล
            </label>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                onChange={handleInputChange}
                id="password"
                name="lastname_th"
                type="text"
                required=""
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>

          <div class="mt-1">
            <label
              for="password"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              First Name
            </label>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                id="password"
                onChange={handleInputChange}
                name="firstname_en"
                type="text"
                required=""
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div class="mt-1">
            <label
              for="password"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Lastname
            </label>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                id="password"
                onChange={handleInputChange}
                name="lastname_en"
                type="text"
                required=""
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>

          <div class="mt-1">
            <label
              for="password"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Email
            </label>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                onChange={handleInputChange}
                id="password"
                name="user_email"
                type="text"
                required=""
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div class="mt-1">
            <label
              for="password"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Engineer Card
            </label>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                onChange={handleInputChange}
                id="password"
                name="engineers_card"
                type="text"
                required=""
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>

          <div class="mt-1">
            <label
              for="password"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Department
            </label>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                onChange={handleInputChange}
                id="password"
                name="department"
                type="text"
                required=""
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div class="mt-1">
            <label
              for="password"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Phone
            </label>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                onChange={handleInputChange}
                id="password"
                name="phone"
                type="text"
                required=""
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div class="mt-1 col-span-2">
            <label
              for="password"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              ตำแหน่ง
            </label>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                onChange={handleInputChange}
                id="password"
                name="jobs"
                type="text"
                required=""
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;