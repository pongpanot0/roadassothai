"use client";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoTrashBin } from "react-icons/io5";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { FaCalendar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
const InsertLearning = () => {
  const router = useRouter();
  const [objectives, setObjectives] = useState([{ name: "", name_en: "" }]);

  const [Learningob, setLearningob] = useState([{ name: "", name_en: "" }]);

  const [coursedetail, setCoursedetail] = useState({
    course_name: "",
    course_name_en: "",
    course_gen: "",
    course_expensesonline: "", // Initialize as null for file type
    course_expensesonsite: "",
    course_lecturer: "",
    course_enroll: "",
    course_start: "",
    course_end: "",
    course_point: "",
    role_3_expenses: "",
    corse_type:0
  });

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    // If the input is a file input, handle it differently

    setCoursedetail((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleObjectiveChange = (index, event) => {
    const { name, value } = event.target;
    const newObjectives = [...objectives];
    newObjectives[index][name] = value;
    setObjectives(newObjectives);
  };

  const handleLearningobChange = (index, event) => {
    const { name, value } = event.target;
    const newLearningob = [...Learningob];
    newLearningob[index][name] = value;
    setLearningob(newLearningob);
  };
  const handleAddLearningob = () => {
    const updatedLearningob = [...Learningob, { name: "", name_en: "" }];
    setLearningob(updatedLearningob);
  };
  const handleAddObjective = () => {
    const updatedObjectives = [...objectives, { name: "", name_en: "" }];
    setObjectives(updatedObjectives);
  };

  const handleRemoveObjective = (indexToRemove) => {
    setObjectives(objectives.filter((_, index) => index !== indexToRemove));
  };
  const postData = async () => {
    try {
      const data = {
        objectives: objectives,
        Learningob: Learningob,
        coursedetail: coursedetail,
      };
      const jsonData = JSON.stringify(data); // ลองแปลงเป็น JSON string
      const response = await fetch("/api/course", {
        method: "POST",
        body: jsonData,
      });
      const res = await response.json();
      if (res.status == 200) {
        Swal.fire({
          icon: "success",
          title: "เพิ่มข้อมูลเรียบร้อย",
          showConfirmButton: true,
          timer: 1500,
        }).then((response) => {
          if (response.isConfirmed == true) {
            router.push(`/admin/course/edit/${res.data.insertId}`);
          }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="grid grid-cols-5 ">
      <div className="col-span-5 flex ">
        <div className="flex-1"></div>
        <button className="primary p-5 rounded-lg " onClick={(e) => postData()}>
          postData
        </button>
      </div>
      <div className="w-full col-span-2 p-3">
        <input
          type="text"
          value={coursedetail.course_name}
          name="course_name"
          onChange={handleInputChange}
          id="floating_filled"
          className="block bg-white rounded px-2.5 pb-2.5 pt-5 w-full text-base text-stone-500 border border-stone-300 appearance-none focus:outline-none ring-0 focus:ring-2 focus:ring-sky-200 focus:border-sky-500 peer"
          placeholder="Course Name thai"
        />
      </div>
      <div className="w-full col-span-2 p-3">
        <input
          type="text"
          value={coursedetail.course_name_en}
          name="course_name_en"
          onChange={handleInputChange}
          id="floating_filled"
          className="block bg-white rounded px-2.5 pb-2.5 pt-5 w-full text-base text-stone-500 border border-stone-300 appearance-none focus:outline-none ring-0 focus:ring-2 focus:ring-sky-200 focus:border-sky-500 peer"
          placeholder="Course Name eng"
        />
      </div>
      <div className="w-full col-span-1 p-3">
        <input
          type="text"
          value={coursedetail.course_enroll}
          name="course_enroll"
          onChange={handleInputChange}
          id="enrollcount"
          className="block bg-white rounded px-2.5 pb-2.5 pt-5 w-full text-base text-stone-500 border border-stone-300 appearance-none focus:outline-none ring-0 focus:ring-2 focus:ring-sky-200 focus:border-sky-500 peer"
          placeholder="จำนวนการรับลงทะเบียน"
        />
      </div>
      <div className="w-full col-span-2 p-3">
        <input
          type="text"
          id="course_expensesonline"
          value={coursedetail.course_expensesonline}
          name="course_expensesonline"
          onChange={handleInputChange}
          className="block bg-white rounded px-2.5 pb-2.5 pt-5 w-full text-base text-stone-500 border border-stone-300 appearance-none focus:outline-none ring-0 focus:ring-2 focus:ring-sky-200 focus:border-sky-500 peer"
          placeholder="ค่าใช้จ่าย Online"
        />
      </div>
      <div className="w-full col-span-2 p-3">
        <input
          type="text"
          id="enrollcount"
          className="block bg-white rounded px-2.5 pb-2.5 pt-5 w-full text-base text-stone-500 border border-stone-300 appearance-none focus:outline-none ring-0 focus:ring-2 focus:ring-sky-200 focus:border-sky-500 peer"
          placeholder="ค่าใช้จ่าย Onsite"
          value={coursedetail.course_expensesonsite}
          name="course_expensesonsite"
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full col-span-1 p-3">
        <input
          type="text"
          id="enrollcount"
          className="block bg-white rounded px-2.5 pb-2.5 pt-5 w-full text-base text-stone-500 border border-stone-300 appearance-none focus:outline-none ring-0 focus:ring-2 focus:ring-sky-200 focus:border-sky-500 peer"
          placeholder="ค่าใช้จ่ายพิเศษสำหรับสมาชิก"
          value={coursedetail.role_3_expenses}
          name="role_3_expenses"
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full col-span-1 p-3">
        <input
          type="text"
          id="enrollcount"
          className="block bg-white rounded px-2.5 pb-2.5 pt-5 w-full text-base text-stone-500 border border-stone-300 appearance-none focus:outline-none ring-0 focus:ring-2 focus:ring-sky-200 focus:border-sky-500 peer"
          placeholder="รุ่น"
          value={coursedetail.course_gen}
          name="course_gen"
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full col-span-1 p-3">
        <input
          type="date"
          id="course_start"
          className="block bg-white rounded px-2.5 pb-2.5 pt-5 w-full text-base text-stone-500 border border-stone-300 appearance-none focus:outline-none ring-0 focus:ring-2 focus:ring-sky-200 focus:border-sky-500 peer"
          placeholder="วันที่เริ่มต้น"
          value={coursedetail.course_start}
          name="course_start"
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full col-span-1 p-3">
        <input
          type="date"
          id="enrollcount"
          className="block bg-white rounded px-2.5 pb-2.5 pt-5 w-full text-base text-stone-500 border border-stone-300 appearance-none focus:outline-none ring-0 focus:ring-2 focus:ring-sky-200 focus:border-sky-500 peer"
          placeholder="วันที่สิ้นสุด"
          value={coursedetail.course_end}
          name="course_end"
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full col-span-2 p-3">
        <input
          type="text"
          id="enrollcount"
          className="block bg-white rounded px-2.5 pb-2.5 pt-5 w-full text-base text-stone-500 border border-stone-300 appearance-none focus:outline-none ring-0 focus:ring-2 focus:ring-sky-200 focus:border-sky-500 peer"
          placeholder="จำนวนหน่วย"
          value={coursedetail.course_point}
          name="course_point"
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full col-span-2 p-3">
        <select
          value={coursedetail.corse_type}
          id="corse_type"
          onChange={handleInputChange}
          name="corse_type"
          className="bg-white border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="0" selected>
            อบรม
          </option>
          <option value="1">สัมมนา</option>
        </select>
      </div>

      <div className="col-span-5 p-3">
        {" "}
        <h2 className="text-[24px] font-semibold px-3">วัตถุประสงค์</h2>
      </div>

      <div className="col-span-5"></div>
      <div className="col-span-1 p-3">
        <button
          onClick={handleAddObjective}
          className="primary p-3 rounded-lg flex items-center gap-2"
        >
          {" "}
          <IoMdAdd /> เพิ่มวัตถุประสงค์
        </button>
      </div>
      <div className="col-span-5">
        {objectives.map((objective, index) => (
          <div key={index} className="grid grid-cols-7">
            <div className="col-span-3 p-3">
              <input
                onChange={(event) => handleObjectiveChange(index, event)}
                type="text"
                name="name"
                id={`watu-${index}`}
                className="block mt-2 bg-white rounded px-2.5 pb-2.5 pt-5 w-full text-base text-stone-500 border border-stone-300 appearance-none focus:outline-none ring-0 focus:ring-2 focus:ring-sky-200 focus:border-sky-500 peer"
                placeholder="วัตถุประสงค์"
                value={objective.name} // Assuming your objective object has a 'name' property
              />
            </div>
            <div className="col-span-3 p-3">
              <input
                onChange={(event) => handleObjectiveChange(index, event)}
                type="text"
                name="name_en"
                id={`watu-${index}`}
                className="block mt-2 bg-white rounded px-2.5 pb-2.5 pt-5 w-full text-base text-stone-500 border border-stone-300 appearance-none focus:outline-none ring-0 focus:ring-2 focus:ring-sky-200 focus:border-sky-500 peer"
                placeholder="วัตถุประสงค์ ภาษาอังกฤษ"
                value={objective.name_en} // Assuming your objective object has a 'name_en' property
              />
            </div>
            <div className="col-span-1 p-3 flex">
              <div className="flex-1"></div>
              <button
                onClick={() => handleRemoveObjective(index)}
                className="primary w-full p-3 rounded-lg flex items-center gap-2 align-middle"
              >
                {" "}
                <IoTrashBin /> ลบ
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-1 p-3">
        {" "}
        <h2 className="text-[24px] font-semibold px-3">วิทยากร</h2>
      </div>
      <div className="col-span-5 p-3">
        <input
          type="text"
          id="watu"
          value={coursedetail.course_lecturer}
          name="course_lecturer"
          onChange={handleInputChange}
          className="block mt-2 bg-white rounded px-2.5 pb-2.5 pt-5 w-full text-base text-stone-500 border border-stone-300 appearance-none focus:outline-none ring-0 focus:ring-2 focus:ring-sky-200 focus:border-sky-500 peer"
          placeholder="วิทยากร"
        />
      </div>
      <div className="col-span-1 p-3">
        <h2 className="text-[24px] font-semibold px-3">หัวข้อวิชา</h2>
      </div>
      <div className="col-span-4 p-3">
        <button
          onClick={handleAddLearningob}
          className="primary p-3 rounded-lg flex items-center gap-2"
        >
          {" "}
          <IoMdAdd /> เพิ่มหัวข้อวิชา
        </button>
      </div>
      <div className="col-span-5">
        {Learningob.map((objective, index) => (
          <div key={index} className="grid grid-cols-7">
            <div className="col-span-3 p-3">
              <input
                onChange={(event) => handleLearningobChange(index, event)}
                type="text"
                id={`watu-${index}`}
                className="block mt-2 bg-white rounded px-2.5 pb-2.5 pt-5 w-full text-base text-stone-500 border border-stone-300 appearance-none focus:outline-none ring-0 focus:ring-2 focus:ring-sky-200 focus:border-sky-500 peer"
                placeholder="หัวข้อวิชา"
                value={objective.name}
                name="name"
              />
            </div>
            <div className="col-span-3 p-3">
              <input
                onChange={(event) => handleLearningobChange(index, event)}
                type="text"
                id={`watu-${index}`}
                className="block mt-2 bg-white rounded px-2.5 pb-2.5 pt-5 w-full text-base text-stone-500 border border-stone-300 appearance-none focus:outline-none ring-0 focus:ring-2 focus:ring-sky-200 focus:border-sky-500 peer"
                placeholder="หัวข้อวิชา ภาษาอังกฤษ"
                value={objective.name_en}
                name="name_en"
              />
            </div>
            <div className="col-span-1 p-3 flex">
              <div className="flex-1"></div>
              <button
                onClick={() => handleRemoveObjective(index)}
                className="primary w-full p-3 rounded-lg flex items-center gap-2"
              >
                {" "}
                <IoTrashBin /> ลบหัวข้อวิชา
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsertLearning;
