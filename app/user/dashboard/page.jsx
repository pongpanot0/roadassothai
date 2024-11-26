"use client";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    
    getData();
  }, []);
  const getData = async () => {
    try {
      const session = await getSession();
      const res = await fetch(
        `/api/users/mycourse`,
        {
          method: "POST",
          body:session.user.email
        }
      );
      const response = await res.json();
     
      setData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="p-1">
      {Array.isArray(data) && data.length < 0 ? (
        <div className="text-center">
          <h2 className="text-[28px]">คุณยังไม่มีข้อมูลการอบรม</h2>
        </div>
      ) : (
        <div className="grid  sm:grid-cols-1  md:grid-cols-3 gap-3">
          {data.map((res, index) => {
            return (
              <div key={index} className="col-span-1">
                <div className="grid grid-cols-1   border border-gray-300 rounded-xl p-2">
                  <div className=" flex justify-center items-center">
                    <Image
                      src={'/api/'+res.course_promopic}
                      width={1000}
                      height={500}
                      className="rounded-xl h-28 w-auto"
                      alt=""
                    />
                  </div>
                  <div>
                    <h2 className="text-[18px] text-gray-800 px-3 py-1">
                      หลักสูตร : {res.course_name}
                    </h2>{" "}
                    <h2 className="text-[14px] text-gray-500 px-3 py-1">
                      Course : {res.course_name_en}
                    </h2>{" "}
                    <h2 className="text-[14px] text-gray-500 px-3 py-1">
                      สถานะ :{" "}
                      {res.accepted == 1
                        ? "รอตรวจสอบการชำระเงิน"
                        : res.Status == 2
                        ? "ตรวจสอบเรียบร้อยแล้ว"
                        : ""}
                    </h2>
                    <Link href={`/user/course/${res.course_enroll_id}`}>
                      <button className="bg-[#77A8D8] text-white rounded-md w-full hover:bg-[#295F93]">
                        ดูรายละเอียด
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;



