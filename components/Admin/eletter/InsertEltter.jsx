import React from "react";
import Swal from "sweetalert2";

const InsertEltter = ({ onClose }) => {
  const [eletter, setEletter] = React.useState({
    Elettername: "",
    Elettername_file: null,
    Elettername_en: "",
  });
  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    // If the input is a file input, handle it differently
    if (type === "file") {
      const file = event.target.files[0];

      // Create a new FileReader

      setEletter((prevState) => ({
        ...prevState,
        Elettername_file: file,
      }));

      // Read the file as a data URL (base64 encoded)
    } else {
      setEletter((prevContent) => ({
        ...prevContent,
        [name]: value,
      }));
    }
  };
  const postData = async () => {
    try {
      const formData = new FormData();
      formData.set("id", eletter.Elettername);
      formData.append(`pic`, eletter.Elettername_file); // Use unique key for each photo
      formData.append(`Elettername_en`, eletter.Elettername_en); // Use unique key for each photo
      const res = await fetch(`/api/eletter`, {
        method: "POST",
        body: formData,
      });
      const response = await res.json();
      

      if (response.status == 200) {
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
                <h3 className="text-3xl font-semibold">เพิ่มข้อมูล E-Letter</h3>
              </div>
              {/*body*/}
              <div className="relative p-6">
                <div className="grid grid-cols-2 gap-5">
                  <div className="col-span-2">
                    <input
                      name="Elettername"
                      onChange={handleInputChange}
                      type="text"
                      placeholder="E-Letter"
                      className="inputClass"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      name="Elettername_en"
                      onChange={handleInputChange}
                      type="text"
                      placeholder="E-Letter ภาษาอังกฤษ"
                      className="inputClass"
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <input
                      name="Elettername_file"
                      onChange={handleInputChange}
                      type="file"
                      placeholder=""
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
                  className="primary mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={(e) => postData()}
                >
                  เพิ่มข้อมูล
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

export default InsertEltter;
