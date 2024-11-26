"use client";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra); //
dayjs.locale("th");

const News = () => {
  const [lannow, setLannow] = React.useState("EN"); // Default to English

  // Use useEffect to set the language from localStorage after the client has loaded
  React.useEffect(() => {
    const language = localStorage.getItem("lan") || "EN"; // Default to 'EN' if not found
    setLannow(language);
  });

  const [loopData, setloppData] = React.useState([]);
  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(`/api/course`, {
        method: "GET",
      });
      const data = await response.json();
      const filterData = data.data.filter((res) => res.active == 1);
      setloppData(filterData);
    } catch (error) {
      // Handle any errors that occur during the process
      console.log(error.message);
    }
  };
  const defaultImage =
    "https://www.rama.mahidol.ac.th/sdmc/sites/default/files/default_images/Default-NoPicture.jpg";
  return (
    <div
      className="
      md:p-20 sm:p-5
      grid grid-cols-1 
    sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 
    gap-5
    sm:ml-1
    sm:mr-1
    lg:ml-10
    lg:mr-10
    "
    >
      <div className=" text-xl md:text-3xl md:p-0 p-3 ">
        การฝึกอบรม / สัมมนา
      </div>
      <div className=" regular-16l ml-3 md:p-0 p-3 ">
        สมาคมทางหลวงแห่งประเทศไทย ขอประชาสัมพันธ์ หลักสูตรการฝึกอบรม ประจำปี
        2567 โดยผู้ที่ผ่านการอบรมจะได้หน่วย
      </div>
      <div className=" regular-16 md:p-0 p-3 ">
        คะแนนการพัฒนาวิชาชีพวิศวกรรมอย่างต่อเนื่อง (CPD) สูงสุด 36 PDUs
        ตามเงื่อนไขและข้อกำหนดของสภาวิศวกรรม
      </div>
      <div>
        <ul className="mt-2 mx-5 list-disc text-lg regular-16 text-start">
          <li className="mx-5">Road Safety Audit</li>
          <li className="mx-5 ">นายช่างผู้ควบคุมโครงการก่อสร้างทาง</li>
          <li className="mx-5 "> การออกแบบทางหลวง (Highway Design) </li>
          <li className="mx-5 ">
            {" "}
            เทคนิคงานก่อสร้างและบํารุงรักษาสะพานทางหลวง{" "}
          </li>
          <li className="mx-5 ">
            เทคนิคการออกแบบและก่อสร้างทางบนพื้นที่เชิงลาด
          </li>
          <li className="mx-5 ">
            {" "}
            การออกแบบโครงสร้างทาง งานบูรณะปรับปรุงผิวทาง
            และงานควบคุมคุณภาพวัสดุงานทาง
          </li>
          <li className="mx-5 ">
            งานป้องกันพิบัติภัยสําหรับทางหลวง (Climate Resilient Highways){" "}
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {loopData.map((res, index) => {
          return (
            <div
              key={index}
              className="max-w-md w-full py-3 rounded-lg
               cursor-pointer xs:mt-5 sm:mt-5 sm:px-5 md:px-10 
               transform transition duration-500  bg-white shadow-md border border-gray-200"
            >
              <div
                className="grid grid-cols-1 gap-5
            sm:grid-cols-1
            xs:grid-cols-1
            md:grid-cols-1
            "
              >
                <img
                  src={'/api/'+res.course_promopic}
                  alt=""
                  className="mb-6 sm:mb-0 md:p-0 flex justify-center items-center h-52 object-cover shadow-md rounded-lg bg-slate-50 w-full sm:w-full xl:mb-6 xl:w-96"
                  onError={(e) => (e.target.src = defaultImage)}
                />

                <div className="col-span-2">
                  <h1 className="text-start text-[18px] md:text-[22px] xs:text-[18px] text-gray-700 inline-block ">
                    <font className=" text-[20px] md:text-[20px] text-gray-800">
                      {lannow == "TH" ? "หลักสูตร" : "Course"}
                    </font>{" "}
                    <font className="text-blue-500 regular-16">
                      {lannow == "TH" ? res.course_name : res.course_name_en}
                    </font>
                  </h1>

                  <h2 className="text-start text-[18px] md:text-[18px] xs:text-[18px] ">
                    {lannow == "TH" ? "รุ่น" : "Model"}
                    <font className="text-blue-500 regular-16">
                      {" "}
                      {res.course_gen}
                    </font>
                  </h2>
                  <h1 className="text-start text-[18px]  text-gray-800 md:text-[18px]">
                    {lannow == "TH" ? "วันที่" : "Date"}
                    <font className=" text-blue-500 regular-16">
                      {lannow == "TH"
                        ? ` ${dayjs(res.course_start).format("DD MMMM BBBB")}`
                        : ` ${dayjs(res.course_start).format(
                            "DD/MM/YYYY"
                          )}`}{" "}
                      {lannow == "TH"
                        ? `- ${dayjs(res.course_end).format("DD MMMM BBBB")}`
                        : `- ${dayjs(res.course_end).format(
                            "DD/MM/YYYY"
                          )}`}{" "}
                    </font>
                  </h1>
                  <h2 className="text-start text-[18px] md:text-[18px] xs:text-[18px]">
                    {lannow == "TH" ? "รูปแบบ" : "รูปแบบ"}
                    <font className=" text-blue-500 regular-16">
                      {lannow == "TH"
                        ? `${res.corse_type == 0 ? " อบรม" : "สัมมนา"}`
                        : ` ${res.corse_type == 0 ? "อบรม" : "สัมมนา"}`}
                    </font>
                  </h2>
                  <h2 className="text-gray-800 text-start text-[18px] md:text-[18px] xs:text-[18px]">
                    {" "}
                    {lannow == "TH" ? "ค่าสมัคร" : "ค่าสมัคร"}{" "}
                    <font className="text-blue-500 regular-16">
                      {res.course_expensesonline.toLocaleString({
                        style: "currency",
                        currency: "THB",
                      })}
                    </font>
                  </h2>
                  <h2 className="text-start text-[18px] md:text-[18px]">
                    {lannow == "TH" ? "จำนวน" : "Course Accepted"}{" "}
                    <font className="text-blue-500 regular-16">
                      {res.course_enroll}
                    </font>
                  </h2>

                  <div>
                    <Link href={`/learning/${res.course_id}`}>
                      <button
                        className="mt-2 block 
                  lg:w-full
                  xs:w-full
                  rounded-md 
                  bg-indigo-600 
                  px-3 py-2 
                  text-center 
                  text-sm 
                  font-semibold 
                        w-full
                  text-white 
                  shadow-sm 
                  hover:bg-indigo-500 
                  focus-visible:outline 
                  focus-visible:outline-2 
                  focus-visible:outline-offset-2 
                  focus-visible:outline-indigo-600"
                      >
                        {lannow == "TH" ? "รายละเอียด" : "More Details"}{" "}
                      </button>
                    </Link>
                  </div>
                  <div>
                    <Link href={`/learning/register/${res.course_id}`}>
                      <button
                        className="mt-2
                          w-full
                          block 
                  lg:w-full
                  xs:w-full
                  rounded-md 
                  bg-indigo-600 
                  px-3 py-2 
                  text-center 
                  text-sm 
                  font-semibold 
                  text-white 
                  shadow-sm 
                  hover:bg-indigo-500 
                  focus-visible:outline 
                  focus-visible:outline-2 
                  focus-visible:outline-offset-2 
                  focus-visible:outline-indigo-600"
                      >
                        {lannow == "TH" ? "ลงทะเบียน" : "Register"}{" "}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default News;
