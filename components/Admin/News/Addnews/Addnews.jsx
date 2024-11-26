"use client";
import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "./Addnews.css";
import axios from "axios";
import { FaAd } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
const QuillEditor = dynamic(() => import('react-quill'), {
  ssr: false,
});
const Addnews = () => {
  const router = useRouter();
  const [content, setContent] = useState({
    news_desc: "",

    news_title: "",
    news_title_en: "",
    news_desc_en: "",
    news_pic: null, // Initialize as null for file type
    pic_column: "1",
  });
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "align",
    "color",
    "code-block",
  ];
  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    // If the input is a file input, handle it differently
    if (type === "file") {
      const file = event.target.files[0]; // Get the selected file
      if (file) {
        // Check if a file is selected
        setContent((prevContent) => ({
          ...prevContent,
          [name]: file, // Store the file object
        }));

        // Show success popup
        Swal.fire({
          icon: "success",
          title: "เพิ่ม รูปภาพสำเร็จ",
          showConfirmButton: true,
          timer: 1500,
        });
      }
    } else {
      setContent((prevContent) => ({
        ...prevContent,
        [name]: value,
      }));
    }
  };
  const handleQuillChange = (newContent, delta, source, editor) => {
    setContent((prevContent) => ({
      ...prevContent,
      news_desc: newContent, // Update the news_desc property with newContent
    }));
  };
  const handleQuillChange_en = (newContent, delta, source, editor) => {
    setContent((prevContent) => ({
      ...prevContent,
      news_desc_en: newContent, // Update the news_desc property with newContent
    }));
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
    Swal.fire({
      icon: "success",
      title: "เพิ่ม รูปภาพสำเร็จ",
      showConfirmButton: true,
      timer: 1500,
    });
  };
  const handleDeletePhoto = (index) => {
    // Update the photos state by filtering out the deleted photo
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
  };
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("news_desc", content.news_desc);
      formData.append("news_desc_en", content.news_desc_en);
      formData.append("news_title_en", content.news_title_en);
      formData.append("news_title", content.news_title);
      formData.set("news_pic", content.news_pic);
      formData.append("news_pic_length", photos.length);
      formData.append("pic_column", content.pic_column);
      photos.forEach((photo, index) => {
        formData.append(`news_pic_${index}`, photo); // Use unique key for each photo
      });
      const response = await fetch("/api/news", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (responseData.status == 200) {
        Swal.fire({
          icon: "success",
          title: "เพิ่ม ข่าวเรียบร้อย",
          showConfirmButton: true,
          timer: 1500,
        }).then((response) => {
          router.push("/admin/news");
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container h-full">
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <h2 className="text-[24px]"> Add News</h2>
        </div>
        <div className="col-span-1 flex">
          <div className="flex-1"></div>
          <button
            className="bg-[#77A8D8] p-4 w-full text-white hover:bg-[#295F93]  rounded-lg"
            onClick={(e) => handleSubmit()}
          >
            upload
          </button>
        </div>
        <div className="col-span-2">
          <div className="bg-white p-5 rounded-lg px-5">
            <div className="relative bg-inherit ">
              <input
                type="text"
                id="news_title"
                value={content.news_title}
                name="news_title"
                onChange={handleInputChange}
                className="peer bg-transparent h-10 w-full rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                placeholder="Type Title"
              />
              <label
                htmlFor="username"
                className="absolute cursor-text 
                left-0 -top-3 text-sm text-black
                bg-inherit mx-1 px-1 peer-placeholder-shown:text-base 
                peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 
                peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
              >
                เพิ่ม Title
              </label>
            </div>
            <div className="relative bg-inherit mt-2">
              <input
                type="text"
                id="news_title_en"
                value={content.news_title_en}
                name="news_title_en"
                onChange={handleInputChange}
                className="peer bg-transparent h-10 w-full rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                placeholder="Type Title"
              />
              <label
                htmlFor="username"
                className="absolute cursor-text 
                left-0 -top-3 text-sm text-black
                bg-inherit mx-1 px-1 peer-placeholder-shown:text-base 
                peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 
                peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
              >
                เพิ่ม Titleภาษาอังกฤษ
              </label>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className=" max-w-xs">
            <label
              htmlFor="example1"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Upload file
            </label>
            <input
              id="example1"
              name="news_pic"
              onChange={handleInputChange}
              type="file"
              className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 
              file:bg-[#77A8D8] file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white 
              hover:file:bg-[#295F93] focus:outline-none disabled:pointer-events-none disabled:opacity-60"
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="h-full w-full mt-2 px-5">
            ภาษาไทย
            <QuillEditor
              value={content.news_desc}
              onChange={handleQuillChange}
              modules={quillModules}
              formats={quillFormats}
              name="news_desc"
              theme="snow"
              className="w-full h-fit  bg-white -z-50"
            />
          </div>
        </div>
        <div className="col-span-4">
          {" "}
          <div className="h-full w-full mt-2 px-5">
            ภาษาอังกฤษ
            <QuillEditor
              value={content.news_desc_en}
              onChange={handleQuillChange_en}
              modules={quillModules}
              formats={quillFormats}
              name="news_desc_en"
              theme="snow"
              className="w-full h-fit  bg-white -z-50"
            />
          </div>
        </div>
        <div className="col-span-4 px-5 mt-5">
          <label
            htmlFor="pic_column"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            จำนวนการโชว์รูปในแต่ละหน้า
          </label>
          <select
            value={content.pic_column}
            id="pic_column"
            onChange={handleInputChange}
            name="pic_column"
            className="bg-white border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="1" selected>
              1
            </option>
            <option value="3">3</option>
            <option value="5">5</option>
          </select>
          <div className="mt-2">
            {" "}
            <button
              onClick={handleAddRow}
              className="primary flex items-center rounded-lg p-3  "
            >
              {" "}
              <IoIosAdd className="scale-125" /> เพิ่มรูปภาพ{" "}
            </button>{" "}
          </div>
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
                  onChange={(event) => handlePhotoChange(event, index)}
                  className="block w-full cursor-pointer appearance-none rounded-l-md border border-gray-200 bg-white px-3 py-2 text-sm transition focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
                />
                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => handleDeletePhoto(index)}
                  className="ml-2 inline-flex items-center rounded-md border border-red-300 bg-white px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Addnews;
