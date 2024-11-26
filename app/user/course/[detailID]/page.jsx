"use client";
import React from "react";
import Image from "next/image";
import DonutChart from "@/components/Admin/Course/Modal/Chart";
const DetailCourse = async ({ params }) => {
  React.useEffect(() => {
    getData();
  }, []);
  const [data, setData] = React.useState([]);
  const chartData = {
    labels: ["สอบได้", "คะแนนเต็ม"],
    values: [data.quiz_score, 60],
    colors: ["#FF6384", "#36A2EB"],
    datasets: "คะแนนสอบ",
  };
  const getData = async () => {
    try {
      const response = await fetch(
        "/api/enroll?foo=" + params.detailID,
        { method: "POST" }
      );

      const data = await response.json();
      console.log(data);
      setData(data.data[0]);
    } catch (error) {
      console.log(error.message);
    }
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
    <div className="p-2">
      <div className="grid grid-cols-4 gap-5 ">
        <div className="col-span-4 grid  grid-cols-4 gap-5 bg-gray-100 p-3">
          <div className="md:col-span-1 sm:col-span-4 xs:col-span-4">
            <Image
              src={'/api/'+data.course_promopic}
              width={1000}
              height={500}
              alt=""
            />
          </div>
          <div className="xs:col-span-4 md:col-span-3 flex items-center  justify-center">
            <div className="grid">
              <h2 className="text-[24px] text-gray-800">
                หลักสูตร : {data.course_name}
              </h2>
              <h2 className="text-[20px] text-gray-400">
                Course : {data.course_name_en}
              </h2>
            </div>
          </div>
        </div>
        <div className="xs:col-span-4 md:col-span-1 xs:p-0 md:p-5 ">
          <DonutChart data={chartData} />
        </div>
        <div className="xs:col-span-4 md:col-span-3 p-5 gap-3">
          <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-5 ">
            <div>
              {" "}
              <label htmlFor="quiz_score">คะแนนสอบ</label>
              <input
                type="text"
                id="quiz_score"
                className="inputClass w-full"
                value={data.quiz_score}
              />
            </div>
            <div>
              {" "}
              <label htmlFor="engineer_num">รหัสวิศวกรรม</label>
              <input
                type="text"
                id="engineer_num"
                className="inputClass w-full"
                value={data.engineer_num}
              />
            </div>
          </div>
          <button className="primary w-full mt-3" onClick={(e) => print()}>
            ปริ้นใบประกาศนียบัตร
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailCourse;
