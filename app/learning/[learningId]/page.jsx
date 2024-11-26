"use client";
import React, { useEffect, useState } from "react";
import { AiFillCalendar } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
import { FaMapMarked } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import Learning from "../../../components/LearningDetail/Learning";
import { FaUsers } from "react-icons/fa";
import Link from "next/link";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra); //
dayjs.locale("th");
const LearningDetail = ({ params }) => {
  React.useEffect(() => {
    getData();
  }, []);
  const [courseData, setcourseData] = React.useState([]);
  const getData = async () => {
    try {
      const response = await fetch(
        `/api/course/id?foo=${params.learningId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();

      setcourseData(data.data);
   
    } catch (error) {
      console.log(error.message);
    }
  };
  const [header, setHeader] = useState(false);
  const scrollHeader = () => {
    if (window.scrollY >= 600) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);
    return () => {
      window.addEventListener("scroll", scrollHeader);
    };
  }, []);
  const defaultImage =
    "https://www.rama.mahidol.ac.th/sdmc/sites/default/files/default_images/Default-NoPicture.jpg";
    const [lannow, setLannow] = React.useState("EN"); // Default to English

    // Use useEffect to set the language from localStorage after the client has loaded
    React.useEffect(() => {
      const language = localStorage.getItem("lan") || "EN"; // Default to 'EN' if not found
      setLannow(language);
    })
  
  return (
    <>
      <div
        className="p-5 grid grid-cols-1 
sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-12 sm:ml-1 sm:mr-1 lg:ml-5 lg:mr-5"
      >
        <div className="col-span-10">
          <div
            className="
            grid grid-cols-1 
            lg:grid-cols-5
            rounded-lg 
           
  
            md:max-w-full  
            md:flex-row md:w-full w-full"
          >
            <div></div>
            <div className="col-span-1">
              <img
                className="  h-52 w-full 
                  rounded-t-lg object-cover md:h-52 md:w-full md:rounded-none md:rounded-l-lg"
                src={'/api/'+courseData[0]?.course_promopic}
                alt=""
                onError={(e) => (e.target.src = defaultImage)}
              />

              <Link href={`/learning/register/${params.learningId}`}>
                <button
                  type="button"
                  className="inline-flex items-center rounded 
              bg-[#295f93] px-6 pb-2 
              pt-2.5 text-xl 
              w-full
              mt-2
              font-medium uppercase leading-normal 
              text-teal-50  transition duration-150 ease-in-out 
              hover:bg-neutral-800 hover:text-teal-50
              text-center
              "
                >
                  <FaUsers className="scale-125" />
                  <span className="ml-5">
                    {lannow == "TH" ? "ลงทะเบียน" : "Register"}{" "}
                  </span>
                </button>
              </Link>
            </div>

            <div className="col-span-3 ">
              <div className="grid grid-cols-1 p-6 ">
                <p className="mb-2  font-medium   text-[20px]">
                  {lannow == "TH" ? "รายละเอียด" : "Info"}{" "}
                </p>
                <p className="mb-2  font-medium   text-[20px]">
                  {lannow == "TH" ? "หลักสูตร" : "Course"}{" "}
                  <font className="text-blue-600">
                    {lannow == "TH"
                      ? courseData[0]?.course_name
                      : courseData[0]?.course_name_en}
                  </font>
                </p>
                <h5 className="mb-2 text-[20px] font-medium text-black ">
                  {lannow == "TH" ? "รุ่นที่" : "Model"}{" "}
                  <font className="text-blue-600 ml-1">
                    {courseData[0]?.course_gen}
                  </font>
                </h5>
                <h5 className="mb-2 text-[20px]  font-medium text-black ">
                  {lannow == "TH" ? "วันที่" : "Date"}
                  <font className="text-blue-600 ml-2">
                    {lannow == "TH"
                      ? dayjs(courseData[0]?.course_start).format(
                          "DD MMMM BBBB"
                        )
                      : dayjs(courseData[0]?.course_start).format("DD/MM/YYYY")}
                    {lannow == "TH" ? "-" : "-"}{" "}
                    {lannow == "TH"
                      ? dayjs(courseData[0]?.course_end).format("DD MMMM BBBB")
                      : dayjs(courseData[0]?.course_end).format(
                          "DD/MM/YYYY"
                        )}{" "}
                  </font>
                </h5>
                <h5 className="mb-2 text-[20px]  font-medium text-black ">
                  {lannow == "TH" ? "รูปแบบ" : "รูปแบบ"}
                  <font className=" text-blue-500">
                    {lannow == "TH"
                      ? `${courseData[0]?.corse_type == 0 ? " อบรม" : "สัมมนา"}`
                      : ` ${
                          courseData[0]?.corse_type == 0 ? "อบรม" : "สัมมนา"
                        }`}
                  </font>
                </h5>
                <h5 className="mb-2 text-[20px]  font-medium text-black ">
                  {lannow == "TH" ? "ค่าสมัคร" : "ค่าสมัคร"}{" "}
                  <font className="text-blue-500">
                    {courseData[0]?.course_expensesonline.toLocaleString({
                      style: "currency",
                      currency: "THB",
                    })}
                  </font>
                </h5>
                <h5 className="mb-2 text-[20px]  font-medium text-black ">
                  {lannow == "TH" ? "จำนวน" : "Course Accepted"}{" "}
                  <font className="text-blue-500">
                    {courseData[0]?.course_enroll}
                  </font>
                </h5>
                <div className="w-full h-full bg-cover align-middle mt-5">
                  <Learning id={params.learningId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LearningDetail;
