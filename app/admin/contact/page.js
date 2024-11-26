"use client";
import React from "react";
import Swal from "sweetalert2";

const page = () => {
  React.useEffect(() => {
    getData();
  }, []);
  const [data, setData] = React.useState({
    contact_th: "",
    contact_en: "",
    contact_map: null,
  });
  const getData = async () => {
    try {
      const respose = await fetch("/api/contact");
      const data = await respose.json();

      setData(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    // If the input is a file input, handle it differently
    if (type === "file") {
      const file = event.target.files[0];

      // Create a new FileReader
      const reader = new FileReader();

      // Define a callback function for when the file is loaded
      reader.onload = function (event) {
        // Create an Image object
        const img = new Image();
        img.src = event.target.result;

        // Define a callback function for when the image is loaded
        img.onload = function () {
          // Create a canvas element
          const canvas = document.createElement("canvas");

          // Calculate the aspect ratio
          let width = img.width;
          let height = img.height;
          const maxDimension = 750; // Set your desired maximum dimension here
          if (width > height) {
            if (width > maxDimension) {
              height *= maxDimension / width;
              width = maxDimension;
            }
          } else {
            if (height > maxDimension) {
              width *= maxDimension / height;
              height = maxDimension;
            }
          }

          // Set canvas dimensions
          canvas.width = width;
          canvas.height = height;

          // Draw image on canvas
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Get base64 string from canvas
          const base64String = canvas.toDataURL("image/jpeg", 0.7); // Adjust quality as needed

          // Now you can use the base64String as needed, such as setting state in React
          setData((prevState) => ({
            ...prevState,
            contact_map: base64String,
          }));
        };
      };

      // Read the file as a data URL (base64 encoded)
      reader.readAsDataURL(file);
    } else {
      setData((prevContent) => ({
        ...prevContent,
        [name]: value,
      }));
    }
  };
  const updateData = async () => {
    try {
      const update = await fetch("/api/contact", {
        method: "PUT",
        body: JSON.stringify(data),
      });
      Swal.fire({
        icon: "success",
        title: "อัพเดทข้อมูลสำเร็จ",
        showConfirmButton: true,
        timer: 1500,
      }).then((response) => {
        if (response.isConfirmed == true) {
          getData();
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-2 flex justify-end">
          <button className="primary" onClick={(e) => updateData()}>
            แก้ไขข้อมูล
          </button>
        </div>
        <div className="p-3">
          <textarea
            onChange={handleInputChange}
            className="inputClass"
            name="contact_th"
            value={data.contact_th}
            rows={15}
          />
        </div>
        <div className="p-3">
          <textarea
            onChange={handleInputChange}
            className="inputClass"
            value={data.contact_en}
            name="contact_en"
            rows={15}
          />
        </div>
        <div className="col-span-2 flex justify-center">
          <img src={data.contact_map} />
        </div>
        <div className="p-3 col-span-2">
          <input
            onChange={handleInputChange}
            type="file"
            name="contact_map"
            className="inputClass"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
