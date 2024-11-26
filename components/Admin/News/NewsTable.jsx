"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEye } from "react-icons/fa";
import { BsChatLeftQuote } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
const NewsTable = () => {
  const [newArray, setnewArray] = React.useState([]);
  const getData = async () => {
    try {
      const res = await fetch("/api/news/admintable", {
        method: "GET",
      });
      const data = await res.json();

      setnewArray(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const HardDeleted = async (id) => {
    try {
      // Open SweetAlert2 confirmation dialog
      const result = await Swal.fire({
        title: "ยืนยันการลบ?",
        text: "จะเป็นการลบข้อมูลฐาวร",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });
  
      // Check if the user confirmed the action
      if (result.isConfirmed) {
        const res = await fetch("/api/news/admintable", {
          method: "DELETE",
          body:id
        });
  
     
  
        // Show success message
        await Swal.fire({
          title: "Deleted!",
          text: "The record has been successfully deleted.",
          icon: "success",
        }).then(()=>{
          getData()
        })
      }
    } catch (error) {
      console.error("Error:", error.message);
  
      // Show error message
      await Swal.fire({
        title: "Error",
        text: "Something went wrong while deleting the record.",
        icon: "error",
      });
    }
  };
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="grid grid-cols-2 overflow-auto w-full container ">
      <div className="col-span-2 flex">
        <div className=" flex-1"></div>
        <Link href={`/admin/news/insert`}>
          <button className="bg-[#77A8D8] text-white rounded-lg p-3 hover:bg-[#295F93]">
            เพิ่มข้อมูลข่าวสาร
          </button>
        </Link>
      </div>
      <div className="col-span-2 grid grid-cols-3 gap-5 mt-3">
        {newArray.map((res, index) => {
          return (
            <div className="flex flex-col p-4 max-w-md" key={index}>
              <div className="h-full border-2 border-gray-300 border-opacity-60 rounded-lg overflow-hidden flex flex-col justify-between">
                <div className="p-6 flex-grow">
                  <h1 className="title-font text-[16px] font-medium text-gray-900 mb-3 text-ellipsis overflow-hidden">
                    {res.news_title}
                  </h1>
                  <p className="leading-relaxed mb-3">{res.desc}</p>
                  <p className="leading-relaxed mb-3">
                    วันที่สร้าง : {res.news_createdate}
                  </p>
                  <div className="flex items-center flex-wrap">
                    <a
                      href={`/admin/news/newdatail/${res.news_id}`}
                      className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 hover:cursor-pointer hover:text-indigo-700"
                    >
                      แก้ไขข้อมูล
                    </a>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <FaEye className="mr-2" />
                      {res.news_watching}
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <BsChatLeftQuote />
                      {res.comment}
                    </span>
                  </div>
                  <p
                    className={`leading-relaxed mb-3 font-bold ${
                      res.active === 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {res.active === 0 ? "Active" : "Removed"}
                  </p>
                </div>
                <div className="flex justify-end mr-3 text-red-500 p-3">
                  <FaTrashAlt size={25} className="cursor-pointer" onClick={e=>HardDeleted(res.news_id)}/>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewsTable;
