import React from "react";

const ModalSlip = ({ slippic, onClose }) => {
  const updateAccepted = async () => {
    try {
      const response = await fetch("/api/enroll", {
        method: "PUT",
        body: slippic.course_enroll_id,
      });
      if (response.status == 200) {
        onClose();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div
        className="justify-center 
  items-center flex overflow-x-hidden 
  overflow-y-auto fixed inset-0 z-50 outline-none 
  focus:outline-none"
      >
        <div className="relative w-full my-6 mx-auto max-w-6xl">
          {/*content*/}
          <div
            className="border-0  rounded-lg shadow-lg relative 
      flex flex-col w-full bg-white outline-none 
      focus:outline-none"
          >
            {/*header*/}
            <div className="flex justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">รายละเอียดสลิป</h3>
            </div>
            {/*body*/}
            <div className="relative p-6">
              <div className=" max-w-6xl flex items-center justify-center">
                <img className=" h-48 w-auto" src={'/api/'+slippic.slip_pic} alt="" />
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
                onClick={(e) => updateAccepted()}
                className="primary mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                ยืนยันสลิป
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default ModalSlip;
