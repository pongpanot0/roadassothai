"use client";
import Link from "next/link";
import React from "react";
import Swal from "sweetalert2";
const LarningCourse = () => {
  const [coursedata, setcourseData] = React.useState([]);
  const getData = async () => {
    try {
      const response = await fetch("/api/course", {
        method: "GET",
      });
      const res = await response.json();
      setcourseData(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  React.useState(() => {
    getData();
  }, []);
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
        const res = await fetch("/api/course/harddelete", {
          method: "DELETE",
          body: id,
        });

        // Show success message
        await Swal.fire({
          title: "Deleted!",
          text: "The record has been successfully deleted.",
          icon: "success",
        }).then(() => {
          getData();
        });
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
  const ActiveCourese = async (id, active) => {
    try {
      const data = {
        id: id,
        active: active,
      };
      const response = await fetch("/api/course", {
        method: "DELETE",
        body: JSON.stringify(data),
      });
      const res = await response.json();

      await Swal.fire({
        title: "ดำเนินการเสร็จสิ้น!",

        icon: "success",
      }).then(() => {
        getData();
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1"></div>
      <div className="col-span-1 flex">
        <div className="flex-1"></div>
        <Link href={`/admin/course/insert`}>
          <button className="primary rounded-lg p-3">เพิ่มหลักสูตร</button>
        </Link>
      </div>
      <div className="col-span-2 w-full min-h-96 overflow-x-auto mt-3">
        <table className="w-full table-auto  text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-[300px] py-4 px-6 text-center text-gray-600 font-bold uppercase">
                ชื่อหลักสูตร
              </th>
              <th className="w-[300px] py-4 px-6 text-center text-gray-600 font-bold uppercase">
                ผู้เข้าร่วมทั้งหมด
              </th>
              <th className="w-[300px] py-4 px-6 text-center text-gray-600 font-bold uppercase">
                รุ่น
              </th>
              <th className="w-[200px] py-4 px-6 text-center text-gray-600 font-bold uppercase">
                วิทยากร
              </th>
              <th className="w-[300px] py-4 px-6 text-center text-gray-600 font-bold uppercase">
                ค่าลงทะเบียนออนไลน์
              </th>
              <th className="w-[300px] py-4 px-6 text-center text-gray-600 font-bold uppercase">
                ค่าลงทะเบียนออนไซต์
              </th>
              <th className="w-[300px] py-4 px-6 text-center text-gray-600 font-bold uppercase">
                ค่าลงทะเบียนพิเศษสำหรับสมาชิก
              </th>
              <th className="w-[300px] py-4 px-6 text-center text-gray-600 font-bold uppercase">
                ประเภท
              </th>
              <th className="w-[300px] py-4 px-6 text-center text-gray-600 font-bold uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white  ">
            {coursedata.map((res) => {
              return (
                <>
                  <tr>
                    <td className="py-4 px-6 border-b border-gray-200">
                      {res.course_name}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200 truncate">
                      {res.course_enroll}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200">
                      {res.course_gen}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200 truncate overflow-hidden whitespace-nowrap max-w-md">
                      {res.course_lecturer}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200">
                      {res.course_expensesonline}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200">
                      {res.course_expensesonsite}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200">
                      {res.role_3_expenses}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200">
                      {res.corse_type == 0 ? "อบรม" : "สัมมนา"}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200 flex gap-3">
                      <Link href={`/admin/course/edit/${res.course_id}`}>
                        <button className="primary">ตั้งค่า</button>
                      </Link>
                      {res.active == 0 ? (
                        <button
                          className="primary p-3"
                          onClick={(e) => ActiveCourese(res.course_id, 1)}
                        >
                          เปิดหลักสูตร
                        </button>
                      ) : (
                        <button
                          onClick={(e) => ActiveCourese(res.course_id, 0)}
                          className="danger p-3"
                        >
                          ปิดหลักสูตร
                        </button>
                      )}
                      <button
                        className="danger"
                        onClick={(e) => HardDeleted(res.course_id)}
                      >
                        ลบถาวร
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LarningCourse;
