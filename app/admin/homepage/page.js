"use client";
import React from "react";

const page = () => {
  React.useEffect(() => {
    getData();
  }, []);
  const [values, setvalues] = React.useState({
    homepage_detail: "",
    homepage_detail_en: "",
    homepage_pic: null,
  });
  const getData = async () => {
    try {
      const response = await fetch("/api/homepage");
      const data = await response.json();

      setvalues(data.data[0]);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [homedata, sethomedata] = React.useState({
    homepage_detail: values.homepage_detail,
    homepage_detail_en: values.homepage_detail_en,
    homepage_pic: values.homepage_pic,
  });
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
          const maxDimension = 1200; // Set your desired maximum dimension here
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
          setvalues((prevState) => ({
            ...prevState,
            homepage_pic: base64String,
          }));
        };
      };

      // Read the file as a data URL (base64 encoded)
      reader.readAsDataURL(file);
    } else {
        setvalues((prevContent) => ({
        ...prevContent,
        [name]: value,
      }));
    }
  };
  const updatedata = async () => {
    try {
      const response = await fetch("/api/homepage", {
        method: "PUT",
        body: JSON.stringify(values),
      });
      const data = await response.json()
  
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <section className="grid grid-cols-2  gap-10  ">
      <div className="col-span-2 flex justify-end">
        <button className="primary" onClick={(e) => updatedata()}>
          อัพเดทข้อมูล
        </button>
      </div>
      <div className="">
        <textarea
          className="inputClass"
          name="homepage_detail"
          onChange={handleInputChange}
          value={values.homepage_detail}
          rows={25}
        ></textarea>
      </div>
      <div className="">
        <textarea
          onChange={handleInputChange}
          className="inputClass"
          name="homepage_detail_en"
          value={values.homepage_detail_en}
          rows={25}
        ></textarea>
      </div>
      <div className=" col-span-1">
        <input
          onChange={handleInputChange}
          className="inputClass"
          type="file"
          name="homepage_pic"
        />
      </div>
      <div className=" col-span-1">
        <img
          alt="Map"
          className="transition duration-300 w-96 ease-in-out hover:scale-110"
          src={values.homepage_pic}
        />
      </div>
    </section>
  );
};

export default page;
