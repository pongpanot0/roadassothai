"use client";

import React, { useState, useEffect } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import dynamic from "next/dynamic";
const RenderHTMLWithQuill = dynamic(
  () => import("@/components/Readonlyquill"),
  { ssr: false }
);
const Loading = dynamic(() => import("@/components/Loading"), { ssr: false });
const Modal = dynamic(() => import("@/components/Modal"), { ssr: false });

const NewsDetails = ({ params }) => {
  const [data, setData] = useState([]);
  const [imgdata, setImgData] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    getData();
    getIMG();
    update();
  }, []);

  useEffect(() => {
    if (data[0]?.news_pic) {
      setSelectedImage(data[0]?.news_pic); // Show data[0]?.news_pic by default if available
    } else if (imgdata.length > 0) {
      setSelectedImage(imgdata[0]?.img_path); // Show the first image from imgdata if news_pic is not available
    }
  }, [data, imgdata]);

  const update = async () => {
    try {
      await fetch(`/api/news/byID?foo=${params.newsid}`, {
        method: "PUT",
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const openModal = (image) => {
    setSelectedImageUrl(image);
    setIsModalOpen(true);
  };

  const getData = async () => {
    try {
      const res = await fetch("/api/news/byID", {
        method: "POST",
        body: params.newsid,
      });

      const data = await res.json();
      setData(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getIMG = async () => {
    try {
      const res = await fetch(`/api/news/byID?foo=${params.newsid}`, {
        method: "GET",
      });

      const data = await res.json();
      setImgData(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageUrl("");
  };

  const newdesc = data[0]?.news_desc;
  const newdesc_en = data[0]?.news_desc_en;
  const [lannow, setLannow] = React.useState("EN"); // Default to English

  // Use useEffect to set the language from localStorage after the client has loaded
  React.useEffect(() => {
    const language = localStorage.getItem("lan") || "EN"; // Default to 'EN' if not found
    setLannow(language);
  });

  if (!data) return <p>Loading...</p>;
  return (
    <div className="grid grid-cols-4">
      {loading && <Loading />}

      <div className="col-span-2 px-20 mt-5">
        <div className="grid grid-cols-4 gap-2 mt-5">
          {!loading && (
            <div className="flex justify-center col-span-4">
              <div className="w-auto h-96 aspect-w-1 aspect-h-1">
                <img
                  className="cursor-pointer w-full h-full object-cover rounded-lg shadow-md"
                  src={'/api/'+selectedImage}
                  alt="Selected"
                  onClick={() =>
                    openModal(selectedImage || imgdata[0]?.img_path)
                  }
                  onError={(e) =>
                    (e.target.src = '/api/'+imgdata[0]?.img_path)
                  }
                />
              </div>
            </div>
          )}

          {data[0]?.news_pic && (
            <div className="w-full sm:w-44 md:w-44 lg:w-44 xl:w-44 aspect-w-1 aspect-h-1">
              <img
                className="cursor-pointer w-full h-full object-cover rounded-lg shadow-md hover:border hover:border-[#295F93]"
                src={'/api/'+data[0]?.news_pic}
                alt="news_pic"
                onClick={() => setSelectedImage(data[0]?.news_pic)}
              />
            </div>
          )}

          {imgdata.map((image, index) => (
            <div
              key={index}
              className="w-full sm:w-44 md:w-44 lg:w-44 xl:w-44 aspect-w-1 aspect-h-1"
            >
              <img
                className="cursor-pointer w-full h-full object-cover rounded-lg shadow-md hover:border hover:border-[#295F93]"
                src={'/api/'+image.img_path}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(image.img_path)} // Change the selected image on click
              />
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2">
        {" "}
        <div className="col-span-2 text-center">
          <h2 className="text-[32px] font-semibold mt-5 mb-5">
            {lannow == "TH" ? (
              <> {data[0]?.news_title}</>
            ) : (
              <> {data[0]?.news_title_en}</>
            )}
          </h2>
        </div>{" "}
        <div className="px-3">
          {lannow == "TH" ? (
            <RenderHTMLWithQuill content={newdesc} />
          ) : (
            <RenderHTMLWithQuill content={newdesc_en} />
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={selectedImageUrl}
      />
    </div>
  );
};

export default NewsDetails;
