"use client";
import Image from "next/image";
import React, { useState } from "react";
import Carousel from "@/components/Slider";
import CourseTable from "@/components/Admin/Course/CourseTable";
import Swal from "sweetalert2";
const CourseDetail = ({ params }) => {
  const [coursedetail, setCoursedetail] = useState({
    course_id: "",
    course_name: "",
    course_name_en: "",
    course_gen: "",
    course_expensesonline: "", // Initialize as null for file type
    course_expensesonsite: "",
    course_lecturer: "",
    course_enroll: "",
    course_promopic: null,
    course_start: "",
    course_end: "",
    course_point: "",
    active: "",
  });
  const [image_course, setimage_course] = useState([]);
  React.useEffect(() => {
    getData();
  }, []);
  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    // If the input is a file input, handle it differently
    if (type === "file") {
      setCoursedetail((prevContent) => ({
        ...prevContent,
        [name]: event.target.files[0], // Store the file object
      }));
    } else {
      setCoursedetail((prevContent) => ({
        ...prevContent,
        [name]: value,
      }));
    }
  };
  const handleObjectiveChange = (index, field, value) => {
    const updatedObjectives = [...course_objective];
    updatedObjectives[index][field] = value;
    setCourseObjective(updatedObjectives);
  };

  const handleTopicChange = (index, field, value) => {
    const updatedTopics = [...course_topic];
    updatedTopics[index][field] = value;
    setCourseTopic(updatedTopics);
  };
  const addNewObjective = () => {
    setCourseObjective([
      ...course_objective,
      {
        course_objective_id: null,
        course_objective_name: "",
        course_objective_name_eng: "",
        course_id: coursedetail.course_id,
      },
    ]);
  };

  const addNewTopic = () => {
    setCourseTopic([
      ...course_topic,
      {
        course_topic_id: null,
        course_topic_name: "",
        course_topic_name_eng: "",
        course_id: coursedetail.course_id,
      },
    ]);
  };

  const [course_objective, setCourseObjective] = useState([]);
  const [course_topic, setCourseTopic] = useState([]);

  const getData = async () => {
    try {
      const respose = await fetch(
        `/api/course/id?foo=${params.courseid}`,
        {
          method: "GET",
        }
      );
      const data = await respose.json();
      console.log(data);

      setCoursedetail(data.data[0]);
      setimage_course(data.image_course);

      setCourseTopic(data.course_topic);
      setCourseObjective(data.course_objective);
    } catch (error) {
      console.log(error.message);
    }
  };
  const UpdateData = async () => {
    try {
      const updatedDetails = {
        ...coursedetail,
        course_objective,
        course_topic,
      };
      const respose = await fetch(`/api/course/id`, {
        method: "PUT",
        body: JSON.stringify(updatedDetails),
      });
      const data = await respose.json();
      getData();
      Swal.fire({
        icon: "success",
        title: "แก้ไขข้อมูลสำเร็จ",
        showConfirmButton: true,
        timer: 1500,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const updateGallerypic = async () => {
    try {
      const formData = new FormData();
      formData.set("id", params.courseid);
      formData.set("news_pic_length", photos.length);

      photos.forEach((photo, index) => {
        formData.append(`news_pic_${index}`, photo); // Use unique key for each photo
      });
      const response = fetch("/api/course", {
        method: "PATCH",
        body: formData,
      });
      Swal.fire({
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
        showConfirmButton: true,
        timer: 1500,
      }).then((res) => {
        setShowModal2(false);
      });

      getData();
    } catch (error) {
      console.log(error.message);
    }
  };
  const updatePromopic = async () => {
    try {
      const formData = new FormData();
      formData.set("id", params.courseid);
      formData.set("course_promopic", coursedetail.course_promopic);
      const response = fetch("/api/course", {
        method: "PUT",
        body: formData,
      });
      Swal.fire({
        icon: "success",
        title: "แก้ไขข้อมูลสำเร็จ",
        showConfirmButton: true,
        timer: 1500,
      }).then((res) => {
        setShowModal(false);
        getData();
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const [photos, setPhotos] = useState([]);

  const handleAddRow = () => {
    setPhotos([...photos, null]);
  };
  const handlePhotoChange = (event, index) => {
    const file = event.target.files[0];
    const newPhotos = [...photos];
    newPhotos[index] = file;
    setPhotos(newPhotos);
  };

  const [showModal, setShowModal] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [showModal3, setShowModal3] = React.useState(false);

  const [ShowSketon, setShowSketon] = React.useState(true);
  const ActiveCourese = async (active) => {
    try {
      const data = {
        id: coursedetail.course_id,
        active: active,
      };
      const response = await fetch("/api/course", {
        method: "DELETE",
        body: JSON.stringify(data),
      });
      const res = await response.json();

      if (res.status == 200) {
        getData();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="grid grid-cols-5 p-3 gap-5">
      <div className="col-span-5">
        {coursedetail.active == 0 ? (
          <button className="primary p-3" onClick={(e) => ActiveCourese(1)}>
            เปิดหลักสูตร
          </button>
        ) : (
          <button onClick={(e) => ActiveCourese(0)} className="danger p-3">
            ปิดหลักสูตร
          </button>
        )}
        <button className="primary ml-5" onClick={UpdateData}>
          Update{" "}
        </button>
      </div>

      <div className="col-span-3  bg-[#eff7ff] rounded-lg">
        <div className="grid grid-cols-7">
          <div className="col-span-3 p-3">
            {" "}
            <input
              type="text"
              id="enrollcount"
              className="inputClass"
              placeholder="course_name"
              value={coursedetail.course_name}
              name="course_name"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-3 p-3">
            {" "}
            <input
              type="text"
              id="enrollcount"
              className="inputClass"
              placeholder="course_name_en"
              value={coursedetail.course_name_en}
              name="course_name_en"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-1 p-3">
            {" "}
            <input
              type="text"
              id="enrollcount"
              className="inputClass"
              placeholder="รุ่น"
              value={coursedetail.course_gen}
              name="course_gen"
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-3 p-3">
            <input
              type="text"
              id="course_expensesonsite"
              className="inputClass"
              placeholder="course_expensesonsite"
              value={coursedetail.course_expensesonsite}
              name="course_expensesonsite"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-3 p-3">
            {" "}
            <input
              type="text"
              id="course_expensesonline"
              className="inputClass"
              placeholder="course_expensesonline"
              value={coursedetail.course_expensesonline}
              name="course_expensesonline"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-1 p-3">
            {" "}
            <input
              type="text"
              id="course_enroll"
              className="inputClass"
              placeholder="course_enroll"
              value={coursedetail.course_enroll}
              name="course_enroll"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-7 p-3">
            {" "}
            <input
              type="text"
              id="course_lecturer"
              className="inputClass"
              placeholder="course_lecturer"
              value={coursedetail.course_lecturer}
              name="course_lecturer"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-3 p-3">
            {" "}
            <input
              type="text"
              id="course_lecturer"
              className="inputClass"
              placeholder="course_start"
              value={coursedetail.course_start}
              name="course_start"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-3 p-3">
            {" "}
            <input
              type="text"
              id="course_lecturer"
              className="inputClass"
              placeholder="course_end"
              value={coursedetail.course_end}
              name="course_end"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-1 p-3">
            {" "}
            <input
              type="text"
              id="course_point"
              className="inputClass"
              placeholder="course_point"
              value={coursedetail.course_point}
              name="course_point"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-7"></div>
        </div>
      </div>

      <div className="col-span-2 p-3 bg-[#eff7ff]">
        <div className="grid grid-cols-3">
          <div className="col-span-3 w-full flex justify-center items-center">
            {coursedetail.course_promopic !== null && (
              <img
                className="h-36 border w-auto p-3  rounded-lg border-[#295F93]"
                src={'/api/' + coursedetail.course_promopic}
                alt={coursedetail.course_name}
              />
            )}
          </div>

          <div className="col-span-3 w-full mt-1">
            <button
              className="primary w-full ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal(true)}
            >
              แก้ไขรูปภาพ
            </button>
          </div>

          <div className="col-span-3 mt-5 flex gap-3">
            <div
              className="relative w-36 mx-auto hover:bg-gray-300 rounded-lg cursor-pointer"
              onClick={() => setShowModal2(true)}
            >
              <img
                className="h-auto w-36 object-cover rounded-md"
                src="/1231030-200.png"
                alt="Random image"
              />
              <div className="absolute inset-0 opacity-60 rounded-md"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-3xl font-bold"></h2>
              </div>
            </div>
            <div className="flex-1"></div>
            <button
              className="primary w-full ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal3(true)}
            >
              ดูรูปภาพกิจกรรมทั้งหมด
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-5 grid grid-cols-2 gap-5">
        <div>
          {course_objective.map((objective, index) => (
            <div key={objective.course_objective_id} className="mb-4">
              <label>ชื่อวัตถุประสงค์:</label>
              <input
                type="text"
                className="border rounded p-2 w-full"
                value={objective.course_objective_name}
                onChange={(e) =>
                  handleObjectiveChange(
                    index,
                    "course_objective_name",
                    e.target.value
                  )
                }
              />

              <label>ชื่อวัตถุประสงค์ (อังกฤษ):</label>
              <input
                type="text"
                className="border rounded p-2 w-full"
                value={objective.course_objective_name_eng}
                onChange={(e) =>
                  handleObjectiveChange(
                    index,
                    "course_objective_name_eng",
                    e.target.value
                  )
                }
              />
            </div>
          ))}
          <button
            className="bg-blue-500 text-white p-2 rounded mt-2"
            onClick={addNewObjective}
          >
            เพิ่มวัตถุประสงค์ใหม่
          </button>
        </div>
        <div>
          {" "}
          {course_topic.map((topic, index) => (
            <div key={topic.course_topic_id} className="mb-4">
              <label>ชื่อหัวข้อ:</label>
              <input
                type="text"
                className="border rounded p-2 w-full"
                value={topic.course_topic_name}
                onChange={(e) =>
                  handleTopicChange(index, "course_topic_name", e.target.value)
                }
              />

              <label>ชื่อหัวข้อ (อังกฤษ):</label>
              <input
                type="text"
                className="border rounded p-2 w-full"
                value={topic.course_topic_name_eng}
                onChange={(e) =>
                  handleTopicChange(
                    index,
                    "course_topic_name_eng",
                    e.target.value
                  )
                }
              />
            </div>
          ))}
          <button
            className="bg-blue-500 text-white p-2 rounded mt-2"
            onClick={addNewTopic}
          >
            เพิ่มหัวข้อใหม่
          </button>
        </div>
      </div>
      <div className="col-span-5"></div>
      <div className="col-span-5">
        <CourseTable id={params.courseid} />
      </div>
      {showModal3 ? (
        <>
          <div
            className="justify-center 
          items-center flex overflow-x-hidden 
          overflow-y-auto fixed inset-0 z-50 outline-none 
          focus:outline-none"
          >
            <div className="relative w-full my-6 mx-auto max-w-7xl">
              {/*content*/}
              <div
                className="border-0  rounded-lg shadow-lg relative 
              flex flex-col w-full bg-white outline-none 
              focus:outline-none"
              >
                {/*header*/}
                <div className="flex justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    รูปภาพกิจกรรมทั้งหมด{" "}
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="mx-auto max-w-2xl">
                    <Carousel slides={image_course} />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal3(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showModal2 ? (
        <>
          <div
            className="justify-center 
          items-center flex overflow-x-hidden 
          overflow-y-auto fixed inset-0 z-50 outline-none 
          focus:outline-none"
          >
            <div className="relative w-full my-6 mx-auto max-w-7xl">
              {/*content*/}
              <div
                className="border-0  rounded-lg shadow-lg relative 
              flex flex-col w-full bg-white outline-none 
              focus:outline-none"
              >
                {/*header*/}
                <div className="flex justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">อัพโหลดรูปภาพ </h3>
                  <button className="primary" onClick={(e) => handleAddRow()}>
                    เพิ่มจำนวนรูปภาพ
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="mx-auto w-full">
                    {photos.map((photo, index) => (
                      <div key={index} className="w-full">
                        <label
                          htmlFor={`photobutton${index}`}
                          className="text-xs font-medium text-gray-500"
                        >
                          Your Photo
                        </label>
                        <div className="relative z-0 mt-0.5 flex w-full -space-x-px">
                          <input
                            id={`photobutton${index}`}
                            type="file"
                            onChange={(event) =>
                              handlePhotoChange(event, index)
                            }
                            className="block w-full cursor-pointer appearance-none rounded-l-md border border-gray-200 bg-white px-3 py-2 text-sm transition focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal2(false)}
                  >
                    Close
                  </button>
                  <button
                    className="primary"
                    type="button"
                    onClick={() => updateGallerypic()}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">อัพโหลดรูปภาพ </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="mx-auto w-full">
                    <label
                      htmlFor="example1"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Upload file
                    </label>
                    <input
                      onChange={handleInputChange}
                      id="course_promopic"
                      type="file"
                      name="course_promopic"
                      className="mt-2 block w-full text-sm file:mr-4 
                      file:rounded-md file:border-0 file:bg-teal-500 file:py-2 
                      file:px-4 file:text-sm file:font-semibold file:text-white 
                    hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none 
                      disabled:opacity-60"
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => updatePromopic()}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default CourseDetail;
