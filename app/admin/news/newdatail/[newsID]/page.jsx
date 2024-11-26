"use client";

import Image from "next/image";
import React, { useState, useMemo } from "react";
import Modal from "@/components/Modal";
import Loading from "@/components/Loading";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
import { IoIosAdd } from "react-icons/io";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { FaTrashAlt, FaUndo } from "react-icons/fa"; // Import FaUndo for recovery icon

import { useRouter } from "next/navigation";
const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false,
});
const NewsDetails = ({ params }) => {
  const router = useRouter();
  React.useEffect(() => {
    getData();
    getIMG();
  }, []);
  const [data, setData] = React.useState([]);
  const [imgdata, setImgData] = React.useState([]);
  const [content, setContent] = useState({
    news_desc: "",
    news_id: "",
    news_title: "",
    news_title_en: "",
    news_desc_en: "",
    news_pic: null, // Initialize as null for file type
    pic_column: "1",
    isnewpic: false,
  });
  const getData = async () => {
    try {
      const res = await fetch("/api/news/byID", {
        method: "POST",
        body: params.newsID,
      });

      const data = await res.json();

      setContent(data.data[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getIMG = async () => {
    try {
      const res = await fetch(`/api/news/admin?foo=${params.newsID}`, {
        method: "GET",
      });

      const data = await res.json();

      setImgData(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageUrl("");
  };

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
      formData.append("news_id", content.news_id);

      formData.append("isnewpic", content.isnewpic);
      photos.forEach((photo, index) => {
        formData.append(`news_pic_${index}`, photo); // Use unique key for each photo
      });

      const response = await fetch(`/api/news/admin`, {
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
          title: "แก้ไข ข่าวเรียบร้อย",
          showConfirmButton: true,
          timer: 1500,
        }).then((cal) => {
          getData();
          getIMG();
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
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
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file); // Convert image to base64 URL for preview
        setContent((prevContent) => ({
          ...prevContent,
          isnewpic: true, // Store the file object
        }));

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
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const handleDelete = async (active) => {
    const data = {
      news_id: content.news_id,
      active: active,
    };
    const res = await fetch(`/api/news/admin`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    const responseData = await res.json();

    if (responseData.status == 200) {
      if (active == 0) {
        Swal.fire({
          icon: "success",
          title: "เปิดใช้งานเรียบร้อย",
          showConfirmButton: true,
          timer: 1500,
        }).then((cal) => {
          getData();
          getIMG();
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "ลบเรียบร้อย",
          showConfirmButton: true,
          timer: 1500,
        }).then((cal) => {
          getData();
          getIMG();
        });
      }
    }
  };
  const handleImageDelete = async (id, active) => {
    const data = {
      news_img_id: id,
      active: active,
    };
    const res = await fetch(`/api/news/admin`, {
      method: "DELETE",
      body: JSON.stringify(data),
    });
    const responseData = await res.json();

    if (responseData.status == 200) {
      if (active == 0) {
        Swal.fire({
          icon: "success",
          title: "ดึงข้อมูลรูปภาพเรียบร้อย",
          showConfirmButton: true,
          timer: 1500,
        }).then((cal) => {
          getData();
          getIMG();
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "ลบรูปภาพเรียบร้อย",
          showConfirmButton: true,
          timer: 1500,
        }).then((cal) => {
          getData();
          getIMG();
        });
      }
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
    Swal.fire({
      icon: "success",
      title: "เพิ่ม รูปภาพสำเร็จ",
      showConfirmButton: true,
      timer: 1500,
    });
  };
  const handleSwap = async (index1, index2) => {
    // Create a copy of the images in the state
    const newImages = [...imgdata];

    // Swap the images in the array
    [newImages[index1], newImages[index2]] = [
      newImages[index2],
      newImages[index1],
    ];

    // Update the img_index for both swapped images
    newImages[index1].img_index = index2; // Update img_index for the first image
    newImages[index2].img_index = index1; // Update img_index for the second image

    // Update the state with the new image array
    setImgData(newImages);

    // Prepare the updated order to send to the server
    const updatedOrder = newImages.map((img) => ({
      news_img_id: img.news_img_id,
      img_index: img.img_index,
    }));

    // Make a PUT API call to update the order on the server
    const res = await fetch(`/api/news/admin/updateorder`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify(updatedOrder), // Send the updated data
    });

    const responseData = await res.json();
    console.log(responseData);
  };
  return (
    <div className="p-5 overflow-auto w-full container h-screen bg-cover">
      {loading && <Loading />}
      <div className="grid grid-cols-8">
        <h2 className="text-[24px] col-span-4 text-gray-800">
          หัวข้อ : {data[0]?.news_title}
        </h2>

        <h2 className="text-[24px] col-span-4 text-gray-800">
          <div className="grid grid-cols-2 gap-5">
            {" "}
            <button className="primary" onClick={(e) => handleSubmit()}>
              แก้ไขข้อมูล
            </button>
            {content.active == 0 ? (
              <button className="primary" onClick={(e) => handleDelete(1)}>
                ลบ
              </button>
            ) : (
              <button className="primary" onClick={(e) => handleDelete(0)}>
                เปิดใช้งาน
              </button>
            )}
          </div>
        </h2>
        <div className="bg-white p-5 rounded-lg px-5 col-span-8 grid gap-10 grid-cols-4">
          <div className="relative mt-2 bg-inherit col-span-2">
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
          <div className="relative bg-inherit mt-2 col-span-2">
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
        <h2 className="text-[20px] col-span-8  mt-3 text-gray-700">รูปภาพ</h2>
        <div className="col-span-4 ">
          {" "}
          <Image
            width={250}
            height={150}
            src={previewImage ? previewImage : "/api/" + content.news_pic}
            className="rounded-md h-52"
            alt=""
          />
        </div>
        <div className="col-span-4 mt-3">
          <div className=" max-w-xs">
            <label
              for="example1"
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
        <div className="col-span-8 mt-3">
          <div className="col-span-4 px-5 mt-5">
            <label
              for="pic_column"
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
                </div>
              </div>
            ))}
          </div>
          <div className={`grid grid-cols-3 gap-5 mt-5`}>
            {imgdata
              .filter((res) => res) // Filter out any falsy values
              .map((res, index) => (
                <div key={index} className="relative">
                  <img
                    className="cursor-pointer hover:border h-52 hover:border-[#295F93] rounded-md"
                    src={'/api/'+res.img_path}
                    alt=""
                    onClick={() => handleImageClick(res.img_path)}
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        // Check if we can swap with the previous image
                        if (index > 0) {
                          handleSwap(index, index - 1); // Swap with the previous image
                        }
                      }}
                      disabled={index === 0} // Disable if it's the first item
                    >
                      ↑
                    </button>
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        // Check if we can swap with the next image
                        if (index < imgdata.length - 1) {
                          handleSwap(index, index + 1); // Swap with the next image
                        }
                      }}
                      disabled={index === imgdata.length - 1} // Disable if it's the last item
                    >
                      ↓
                    </button>
                    {res.active === 0 ? (
                      <FaTrashAlt
                        className="text-red-600 cursor-pointer hover:text-red-800"
                        onClick={() => handleImageDelete(res.news_img_id, 1)} // Send 1 to recover image
                      />
                    ) : (
                      <FaUndo
                        className="text-green-600 cursor-pointer hover:text-green-800"
                        onClick={() => handleImageDelete(res.news_img_id, 0)} // Send 0 to delete image
                      />
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageUrl={selectedImageUrl}
        />
      </div>
    </div>
  );
};

export default NewsDetails;
