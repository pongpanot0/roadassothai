"use client";
import React, { useState } from "react";

import Link from "next/link";
import { getSession } from "next-auth/react";
import ModalLogin from "@/components/Users/Modal/ModalLogin";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import "dayjs/locale/th"; // Import Thai locale
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);
dayjs.locale("th"); // Set Thai as the default locale
function RegisterLerning({ params }) {
  const [userData, setUserData] = React.useState({
    firstname_th: "",
    lastname_th: "",
    firstname_en: "",
    lastname_en: "",
    engineers_card: "",
    jobs: "",
    department: "",
    phone: "",
    user_email: "",
  });
  const handleInputChange = (key, value) => {
    setUserData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const fields = [
    { label: "ชื่อ", key: "firstname_th", editable: false },
    { label: "นามสกุล", key: "lastname_th", editable: false },
    { label: "ชื่อภาษาอังกฤษ", key: "firstname_en", editable: false },
    { label: "นามสกุลภาษาอังกฤษ", key: "lastname_en", editable: false },
    { label: "หมายเลขสมาชิกสภาวิศวกร", key: "engineers_card", editable: true },
    { label: "ตำแหน่ง", key: "jobs", editable: true },
    { label: "หน่วยงาน", key: "department", editable: true },
    { label: "โทรศัพท์", key: "phone", editable: false },
    { label: "Email", key: "user_email", editable: false },
  ];
  const [showModal, setshowModal] = React.useState(false);
  const [courseData, setcourseData] = React.useState([]);
  const router = useRouter();
  const postData = async () => {
    try {
      const session = await getSession();
      if (userData?.user_type === 3) {
        const data = {
          user_id: session.user.email,
          course_id: params.registerID,
          enroll_type: 3,
          engineers_card: userData.engineers_card,
          jobs: userData.jobs,
          department: userData.department,
        };
        const response = await fetch(`/api/course/payroll`, {
          method: "POST",
          body: JSON.stringify(data),
        });
        const id = await response.json();
        if (id.status == 200) {
          Swal.fire({
            icon: "success",
            title: "ระบบกำลังนำคุณไปยังหน้าชำระเงิน",
            showConfirmButton: true,
            confirmButtonText: "OK",
            timer: 1500,
          }).then((res) => {
            if (res.isConfirmed == true) {
              router.push(`/learning/payment/${id.data.insertId}`);
            }
            router.push(`/learning/payment/${id.data.insertId}`);
          });
        }
      } else {
        const data = {
          user_id: session.user.email,
          course_id: params.registerID,
          enroll_type: enrollType,
          engineers_card: userData.engineers_card,
          jobs: userData.jobs,
          department: userData.department,
        };
        const response = await fetch(`/api/course/payroll`, {
          method: "POST",
          body: JSON.stringify(data),
        });
        const id = await response.json();
        if (id.status == 200) {
          Swal.fire({
            icon: "success",
            title: "สร้างข้อมูลสำเร็จ",
            showConfirmButton: true,
            confirmButtonText: "OK",
            timer: 1500,
          }).then((res) => {
            if (res.isConfirmed == true) {
              router.push(`/learning/payment/${id.data.insertId}`);
            }
            router.push(`/learning/payment/${id.data.insertId}`);
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getCourse = async () => {
    try {
      const response = await fetch(
        `/api/course/id?foo=${params.registerID}`
      );
      const res = await response.json();
    

      setcourseData(res.data[0]);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getData = async () => {
    try {
      const session = await getSession();
      if (session == null) {
        setshowModal(true);
      } else {
        const response = await fetch(
          `/api/users?foo=${session.user.email}`,
          {
            method: "GET",
          }
        );

        const data = await response.json();
      
        setUserData(data.data[0]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const [enrollType, setenrollType] = React.useState("1");
  const onChange = (event) => {
    if (userData?.user_type === 3) {
      setenrollType("3");
    } else {
      setenrollType(event.target.value);
    }
  };

  React.useState(() => {
    getCourse();
    getData();
  }, []);
  const [lannow, setLannow] = React.useState("EN"); // Default to English

  // Use useEffect to set the language from localStorage after the client has loaded
  React.useEffect(() => {
    const language = localStorage.getItem("lan") || "EN"; // Default to 'EN' if not found
    setLannow(language);
  });

  return (
    <div className="container mx-auto p-10 grid grid-cols-2 xs:grid-cols-1 md:grid-cols-2">
      <div className="col-span-2">
        {showModal ? <ModalLogin /> : null}
        <div className="grid grid-cols-6 xs:grid-cols-1 md:grid-cols-6">
          <div className="col-span-1">
            {" "}
            <img
              src={'/api/'+ courseData.course_promopic}
              alt=""
              className="w-40 h-auto"
            />
          </div>
          <div className="col-span-4">
            {" "}
            <h2 className="text-[32px] font-bold">
              {lannow == "TH"
                ? "การยืนยันการสมัครหลักสูตรฝึกอบรม"
                : "Course Confirmation."}
            </h2>
            <h5 className="text-[20px] font-semibold">
              {lannow == "TH"
                ? "กรุณาตรวจสอบความถูกต้องของข้อมูลหลังกรอกข้อมูลเสร็จสิ้น"
                : "Please verify the accuracy of the data after completing the data entry."}
              <br></br>
              {lannow == "TH"
                ? "โดยผู้ลงทะเบียนสามารถทำการชำระเงินได้ตามข้อมูลรายละเอียดของช่องทางที่ระบุไว้"
                : "The registered individual can proceed with the payment according to the details provided in the specified channel."}
            </h5>
          </div>
        </div>
      </div>
      <div className="mt-3 col-span-2  bg-gradient-to-r from-[#77A8D8] to-[#295F93] w-full h-1 rounded-lg"></div>
      <div className="col-span-1 mt-5">
        <h2 className="text-[24px] font-semibold">
          {lannow == "TH" ? "ข้อมูลส่วนตัว" : "Personal Information."}
        </h2>{" "}
      </div>
      <div className="col-span-1 mt-5 pl-5">
        <h2 className="text-[24px] font-semibold">
          {lannow == "TH"
            ? "รายการสมัครหลักสูตรการฝึกอบรมของคุณ"
            : "Your Order Details."}
        </h2>{" "}
      </div>
      <div className="col-span-1">
        <div className="grid grid-cols-2 xs:grid-cols-1 md:grid-cols-2 gap-5 mt-3">
          {fields.map(({ label, key, editable }, index) => (
            <div
              key={index}
              className={key === "engineers_card" ? "col-span-2" : ""}
            >
              <input
                value={userData[key]}
                placeholder={label}
                disabled={!editable}
                onChange={(e) =>
                  editable && handleInputChange(key, e.target.value)
                }
                className={`block w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 ${
                  key === "engineers_card" ||
                  key === "jobs" ||
                  key === "department"
                    ? "xs:text-sm sm:leading-6"
                    : "sm:text-sm sm:leading-6"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-1">
        <div className="grid mx-5 p-2  xs:grid-cols-1 md:grid-cols-4">
          <div className="bg-gray-200 col-span-5 grid grid-cols-4 xs:grid-cols-1 md:grid-cols-4">
            <div className="col-span-1">
              {" "}
              <img
                src={'/api/'+ courseData.course_promopic}
                className=" w-24 h-auto m-5 mr-10"
                alt=""
              />
            </div>
            <div className="flex items-center col-span-3">
              {" "}
              <h5 className="text-[16px] font-semibold ml-5">
                <text className="text-[22px] font-semibold text-blue-900">
                  หลักสูตร{" "}
                </text>
                : {courseData.course_name}
                <br />
                <text className="text-[18px] font-semibold text-blue-900">
                  Course{" "}
                </text>
                : {courseData.course_name_en}
                <br />
                <text className="text-[18px] font-semibold text-blue-900">
                  รุ่น{" "}
                </text>
                : {courseData.course_gen}
                <br />
                <text className="text-[18px] font-semibold text-blue-900">
                  วันที่{" "}
                </text>
                : {dayjs(courseData.course_start).format("D MMMM YYYY")} -{" "}
                {dayjs(courseData.course_end).format("D MMMM YYYY")}
              </h5>
            </div>
          </div>
          <div className="col-span-5">
            <h2 className="text-[24px] text-gray-900">
              <label className="text-xs text-gray-400">
                {lannow == "TH" ? "ข้อมูลการเข้ารับการอบรม" : "Attending training"}
              </label>
              <select
                onChange={(e) => onChange(e)}
                id="selectWay"
                className="block w-full text-sm font-medium transition duration-75 border 
              border-gray-800 rounded-lg shadow-sm h-12 focus:border-blue-600 focus:ring-1
               focus:ring-inset focus:ring-blue-600 bg-none"
              >
                {userData?.user_type == 3 ? (
                  <option value="3">
                    {lannow == "TH" ? "ค่าใช้จ่าย" : "Expenses"} :{" "}
                    {courseData.role_3_expenses}
                  </option>
                ) : (
                  <>
                    <option value="1">
                      {lannow == "TH" ? "อบรมออนไลน์" : "Online"}:{" "}
                      {courseData.course_expensesonline}
                    </option>
                    <option value="2">
                      {lannow == "TH" ? "อบรมออนไซต์" : "Onsite"} :{" "}
                      {courseData.course_expensesonsite}
                    </option>
                  </>
                )}
              </select>{" "}
            </h2>
          </div>
          <div className="col-span-5 mt-2 ">
            <div className="grid grid-cols-4 xs:grid-cols-1 md:grid-cols-4">
              <div className="col-span-4 mt-2 whitespace-pre-wrap">
                {lannow == "TH"
                  ? `หากมีข้อสอบถามเพิ่มเติม โปรดติดต่อสมาคมทางหลวงแห่งประเทศไทย
                โทรศัพท์ 0-2984-0836 หรือ 089-777-1283 และ 086-344-0555`
                  : `If there are additional questions, 
please contact the Thai Highway Association at:
Phone: 0-2984-0836 or 089-777-1283 and 086-344-0555`}
                <br />
                {lannow == "TH"
                  ? "Email : roadsassothai2016@gmail.com "
                  : "Email : roadsassothai2016@gmail.com "}{" "}
              </div>
              <div className="col-span-4 mt-2">
                <button
                  onClick={(e) => postData()}
                  className="bg-[#77A8D8] w-full m-3 rounded-lg h-auto text-white 
                hover:bg-[#295F93]
                py-2"
                >
                  {lannow == "TH"
                    ? "เข้าสู่หน้าชำระเงิน "
                    : "Proceed to Payment Page"}{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterLerning;
