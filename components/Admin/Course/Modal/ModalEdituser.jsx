"use client";
import React from "react";

import { FaImage } from "react-icons/fa";
import ModalEngineerNum from "./ModalEngineerNum";
import { FaNewspaper } from "react-icons/fa6";
import DonutChart from "./Chart";
import ModalSlip from "./ModalSlip";
const ModalEdituser = ({ Users, onclose }) => {
  React.useEffect(() => {
    getData();
  }, []);
  const [data, setData] = React.useState([]);
  const UpdateAcceptSlip = () => {
    getData();
    setseeSlip(!seeSlip);
  };
  const getData = async () => {
    try {
      const response = await fetch(
        `/api/course/payroll?foo=${Users.course_enroll_id}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setData(data.data[0]);

    } catch (error) {
      console.log(error.message);
    }
  };
  const [seeSlip, setseeSlip] = React.useState(false);
  const [upDateengineerNum, setupDateengineerNum] = React.useState(false);
  const chartData = {
    labels: ["สอบได้", "คะแนนเต็ม"],
    values: [data.quiz_score, 60],
    colors: ["#FF6384", "#36A2EB"],
    datasets: "คะแนนสอบ",
  };
  function downloadPDF(pdf) {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = "abc.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
  const print = async () => {
    try {
      const response = await fetch("/api/pdf", {
        method: "POST",
        body: JSON.stringify(data),
      });
      downloadPDF(await response.json());
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div
        className="justify-center 
  items-center flex overflow-x-hidden 
  overflow-y-auto fixed inset-0 z-30 outline-none 
  focus:outline-none"
      >
        <div className="relative w-full my-6 mx-auto max-w-4xl">
          {/*content*/}
          <div
            className="border-0  rounded-lg shadow-lg relative 
      flex flex-col w-full bg-white outline-none 
      focus:outline-none"
          >
            {/*header*/}
            <div className="flex justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">รายละเอียดผู้เข้าอบรม</h3>
              {data.accepted == 1 ? (
                <span className="py-1 px-2.5 border-none rounded bg-green-100 text-xl text-green-800 font-medium">
                  ยืนยันการโอนเรียบร้อย
                </span>
              ) : (
                <span className="py-1 px-2.5 border-none rounded bg-yellow-100 text-xl text-yellow-800 font-medium">
                  รอยืนยันการโอน
                </span>
              )}
            </div>
            {/*body*/}
            <div className="relative p-6">
              <div className=" max-w-4xl">
                <div className="grid grid-cols-5 gap-2">
                  <div className="col-span-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-1">
                        <input
                          type="text"
                          placeholder="ชื่อ"
                          className="inputClass disabled:border-1"
                          disabled
                          value={data.firstname_th}
                        />
                      </div>
                      <div className="col-span-1">
                        <input
                          type="text"
                          disabled
                          placeholder="นามสกุล"
                          className="inputClass disabled:border-1"
                          value={data.lastname_th}
                        />
                      </div>
                      <div className="col-span-1">
                        <input
                          type="text"
                          disabled
                          placeholder="Name"
                          className="inputClass disabled:border-1"
                          value={data.firstname_en}
                        />
                      </div>
                      <div className="col-span-1">
                        <input
                          type="text"
                          disabled
                          placeholder="Lastname"
                          className="inputClass disabled:border-1"
                          value={data.lastname_en}
                        />
                      </div>
                      <div className="col-span-1">
                        <input
                          type="text"
                          disabled
                          placeholder="หมายเลขสมาชิกสภาวิศวกร"
                          className="inputClass disabled:border-1"
                          value={data.engineers_card}
                        />
                      </div>
                      <div className="col-span-1">
                        <input
                          type="text"
                          disabled
                          placeholder="ตำแหน่ง"
                          className="inputClass disabled:border-1"
                          value={data.jobs}
                        />
                      </div>{" "}
                      <div className="col-span-2">
                        <input
                          type="text"
                          disabled
                          placeholder="รูปแบบการอบรม"
                          className="inputClass disabled:border-1"
                          value={data.enroll_name}
                        />
                      </div>
                      {data.engineer_num ? (
                        <div className="col-span-2">
                          <input
                            type="text"
                            disabled
                            placeholder="เลขที่หนังสือจากสภาวิศวกรรม"
                            className="inputClass disabled:border-1"
                            value={data.engineer_num}
                          />
                        </div>
                      ) : null}
                      {data.engineer_num ? (
                        <div className="col-span-2">
                          <button
                            className="primary w-full"
                            onClick={(e) => print()}
                          >
                            ปริ้นใบประกาศนียบัตร
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="col-span-2">
                        <button
                          onClick={(e) => setseeSlip(!seeSlip)}
                          className="primary gap-3 w-full flex items-center justify-center"
                        >
                          <FaImage className=" scale-150" /> ดูสลิปการโอน
                        </button>
                      </div>
                      <div className="col-span-2">
                        <button
                          onClick={(e) =>
                            setupDateengineerNum(!upDateengineerNum)
                          }
                          className="primary gap-3 w-full flex items-center justify-center"
                        >
                          <FaNewspaper className=" scale-150" />{" "}
                          เพิ่มข้อมูลเลขที่จากสภาวิศวกรรม
                        </button>
                      </div>
                      <div className="col-span-2">
                        <DonutChart data={chartData} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={(e) => onclose()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-20 bg-black"></div>
      {seeSlip ? (
        <ModalSlip slippic={data} onClose={(e) => UpdateAcceptSlip()} />
      ) : null}
      {upDateengineerNum ? (
        <ModalEngineerNum
          slippic={data}
          onClose={(e) => setupDateengineerNum(!upDateengineerNum)}
        />
      ) : null}
    </div>
  );
};

export default ModalEdituser;
