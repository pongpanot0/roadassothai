"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Mapshow = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/shop`);
        const response = await res.json();
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      } finally {
      }
    };
    getData();

    // Set language
    const language = localStorage.getItem("lan") || "EN";
    setLannow(language);
  }, []);


  const [lannow, setLannow] = useState("EN"); // Default to English
  return (
    <div className="px-5 mt-5 max-container padding-container ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="col-span-1  flex justify-center items-center  md:items-end  text-end rounded-lg">
          <img src={data[0]?.shop_pic} className="h-96 w-auto" alt="" />
        </div>
        <div className="col-span-1">
          <p className="text-start mt-2 font-bold  text-[28px]">
            สั่งซื้อแผนที่ทางหลวง
          </p>
          <p className="text-start mt-2  font-medium text-[22px]">
            {" "}
            {data[0]?.shop_name}
          </p>
          <p className="text-justify   mt-2  text-[18px]">
            {data[0]?.shop_detail}
          </p>
          <Link href={"/maps"}>
            <button className="primary w-full  rounded-full mt-5">
              รายละเอียดในการสั่งซื้อ
            </button>
          </Link>
        </div>
        <div className=" col-span-1 text-center">
          {/*       <p className="text-center mt-2 text-[28px]"> เอกสารวิชาการ</p> */}
        </div>
      </div>
    </div>
  );
};

export default Mapshow;
