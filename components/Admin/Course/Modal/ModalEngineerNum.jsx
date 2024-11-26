import React from "react";

const ModalEngineerNum = ({ slippic, onClose }) => {
  const [engineernum, setengineernum] = React.useState("");
  const postData = async () => {
    try {
      const data = {
        engineernum: engineernum,
        course_enroll_id: slippic.course_enroll_id,
      };
      const response = await fetch("/api/enroll", {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.status == 200) {
        onClose();
      }
    } catch (error) {}
  };
  return (
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
              <h3 className="text-3xl font-semibold">
                เพิ่มรายละเอียดเลขเอกสารจากสภาวิศวกรรม
              </h3>
            </div>
            {/*body*/}
            <div className="relative p-6">
              <div className=" max-w-4xl">
                <input
                  onChange={(e) => setengineernum(e.target.value)}
                  type="text"
                  className="inputClass"
                />
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
                เพิ่มข้อมูล
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0  z-40 bg-black"></div>
    </div>
  );
};

export default ModalEngineerNum;
