"use client";
import React from "react";
import ModalEdituser from "./Modal/ModalEdituser";
const CourseTable = ({ id }) => {
  const [edit, setEdit] = React.useState(false);
  const [userdata, setuserData] = React.useState([]);
  React.useEffect(() => {
    getData();
  }, []);
  const [enrolldata, setenrollData] = React.useState([]);
  const getData = async () => {
    try {
      const response = await fetch(`/api/enroll?foo=${id}`, {
        method: "GET",
      });
      const data = await response.json();
  
      setenrollData(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const openPic = (data) => {
    setuserData(data);
    setEdit(!edit);
  };
  return (
    <div className="flex flex-col">
      <div className="p-5 text-[28px] font-semibold">รายชื่อผู้ลงทะเบียน</div>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    ชื่อ
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    นามสกุล
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    รูปแบบการเข้ารับการฝึกอบรม
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    รายละเอียด
                  </th>
                </tr>
              </thead>
              <tbody>
                {enrolldata.map((res, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {res.firstname_th}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {res.lastname_th}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {res.enroll_name}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <button
                        className="primary p-3"
                        onClick={(e) => openPic(res)}
                      >
                        ตั้งค่า
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {edit ? (
            <ModalEdituser Users={userdata} onclose={(e) => setEdit(!edit)} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CourseTable;
