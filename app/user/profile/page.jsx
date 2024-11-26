"use client";
import React from "react";
import { getSession } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
const Profile = () => {
  React.useEffect(() => {
    getData();
  }, []);
  const [profiledata, setprofileData] = React.useState({
    user_id: "",
    user_email: "",
    role: "",
    firstname_th: "",
    lastname_th: "",
    firstname_en: "",
    lastname_en: "",
    engineers_card: "",
    user_type: "",
    department: "",
    phone: "",
    jobs: "",
  });
  const router = useRouter();
  const getData = async () => {
    try {
      const session = await getSession();
      const response = await fetch(
        "/api/users?foo=" + session.user.email
      );
      const values = await response.json();

      setprofileData(values.data[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateData = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        body: JSON.stringify(profiledata),
      });
      const re = await response.json();
      if (re.status == 200) {
        Swal.fire({
          icon: "success",
          title: "อัพเดทข้อมูลเรียบร้อย",
          showConfirmButton: true,
          confirmButtonText: "OK",
          timer: 1500,
        }).then((res) => {
          if (res.isConfirmed == true) {
            router.push("/user/dashboard");
          }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    setprofileData((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };
  return (
    <div className="grid gap-5 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1">
      <div className="col-span-2">
        <h2 className="text-[24px] text-center">แก้ไขข้อมูลส่วนตัว</h2>
      </div>
      <div className="col-span-2 grid  md:grid-cols-2 xs:grid-cols-1 gap-5 mt-5">
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
              value={profiledata.firstname_th}
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
              value={profiledata.lastname_th}
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
              value={profiledata.firstname_en}
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
              value={profiledata.lastname_en}
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
              value={profiledata.user_email}
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
              value={profiledata.engineers_card}
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
              value={profiledata.department}
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
              value={profiledata.phone}
              type="text"
              required=""
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
          </div>
        </div>
        <div class="mt-1 ">
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
              value={profiledata.jobs}
              name="jobs"
              type="text"
              required=""
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
          </div>
        </div>
        <div class="mt-5 ">
          <button className="primary w-full" onClick={updateData}>
            อัพเดทข้อมูล
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
