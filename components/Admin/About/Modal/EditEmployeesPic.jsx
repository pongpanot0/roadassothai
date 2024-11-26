import React from "react";
import Swal from "sweetalert2";

const EditEmployeesPic = ({ data, onClose }) => {
  const [employees, setemployees] = React.useState({
    employees_id: data.employees_id,
    employees_prefix_en: data.employees_prefix_en,
    employees_prefix: data.employees_prefix,
    employees_firstname: data.employees_firstname,
    employees_lastname: data.employees_lastname,
    employees_job: data.employees_job,
    employees_job_en: data.employees_job_en,
    employees_firstname_en: data.employees_firstname_en,
    employees_lastname_en: data.employees_lastname_en,
    employees_pic: data.employees_pic,
    level: data.level,
  });

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    // If the input is a file input, handle it differently
    if (type === "file") {
      // Obtain the file from event.target.files array
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
          setemployees((prevState) => ({
            ...prevState,
            employees_pic: base64String,
          }));
        };
      };

      // Read the file as a data URL (base64 encoded)
      reader.readAsDataURL(file);
    } else {
      setemployees((prevContent) => ({
        ...prevContent,
        [name]: value,
      }));
    }
  };
  const postData = async () => {
    try {
      const response = await fetch("/api/about/byid", {
        method: "PUT",
        body: JSON.stringify(employees),
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
            onClose();
          }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      {" "}
      <div>
        <div
          className="justify-center 
items-center flex overflow-x-hidden 
overflow-y-auto fixed inset-0 z-50 outline-none 
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
                <h3 className="text-3xl font-semibold">เพิ่มข้อมูลพนักงาน</h3>
              </div>
              {/*body*/}
              <div className="relative p-6">
                <div className="grid grid-cols-2 gap-5">
                  <div className=" max-w-4xl">
                    <input
                      onChange={handleInputChange}
                      type="text"
                      value={employees.employees_prefix}
                      placeholder="คำนำหน้าชื่อ"
                      name="employees_prefix"
                      className="inputClass"
                    />
                  </div>
                  <div className=" max-w-4xl">
                    <input
                      onChange={handleInputChange}
                      type="text"
                      value={employees.employees_prefix_en}
                      placeholder="prefix"
                      name="employees_prefix_en"
                      className="inputClass"
                    />
                  </div>
                  <div className=" max-w-4xl">
                    <input
                      onChange={handleInputChange}
                      type="text"
                      value={employees.employees_firstname}
                      placeholder="ชื่อ"
                      name="employees_firstname"
                      className="inputClass"
                    />
                  </div>
                  <div className=" max-w-4xl">
                    <input
                      onChange={handleInputChange}
                      type="text"
                      value={employees.employees_firstname_en}
                      placeholder="FirstName"
                      name="employees_firstname_en"
                      className="inputClass"
                    />
                  </div>
                  <div className=" max-w-4xl">
                    <input
                      onChange={handleInputChange}
                      type="text"
                      value={employees.employees_lastname}
                      placeholder="นามสกุล"
                      name="employees_lastname"
                      className="inputClass"
                    />
                  </div>
                  <div className=" max-w-4xl">
                    <input
                      onChange={handleInputChange}
                      type="text"
                      value={employees.employees_lastname_en}
                      placeholder="Lastname"
                      name="employees_lastname_en"
                      className="inputClass"
                    />
                  </div>
                  <div className=" max-w-4xl">
                    <input
                      onChange={handleInputChange}
                      type="text"
                      value={employees.employees_job}
                      name="employees_job"
                      placeholder="ตำแหน่ง"
                      className="inputClass"
                    />
                  </div>
                  <div className=" max-w-4xl">
                    <input
                      onChange={handleInputChange}
                      type="text"
                      value={employees.employees_job_en}
                      name="employees_job_en"
                      placeholder="Jobs"
                      className="inputClass"
                    />
                  </div>
                  <div className="col-span-2 max-w-4xl">
                    <input
                      onChange={handleInputChange}
                      type="number"
                      value={employees.level}
                      name="level"
                      placeholder="แถวที่อยู่"
                      className="inputClass"
                    />
                  </div>
                  
                  <div className="col-span-2 max-w-4xl">
                    <input
                      onChange={handleInputChange}
                      type="file"
                      accept="image/*"
                      name="employees_pic"
                      placeholder="รูปภาพ"
                      className="inputClass"
                    />
                  </div>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  onClick={(e) => onClose()}
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Close
                </button>
                <button
                  onClick={(e) => postData()}
                  className="primary mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  อัพเดทข้อมูล
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-50 fixed inset-0  z-40 bg-black"></div>
      </div>
    </div>
  );
};

export default EditEmployeesPic;
