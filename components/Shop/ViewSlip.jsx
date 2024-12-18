import React from "react";

const ViewSlip = ({ slip, onClose }) => {
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
          <div className="relative w-full my-6 mx-auto  max-w-5xl">
            {/*content*/}
            <div
              className="border-0  rounded-lg shadow-lg relative 
flex flex-col w-full bg-white outline-none 
focus:outline-none"
            >
              {/*header*/}
              <div className="flex justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  สลิปการโอน
                </h3>
              </div>
              {/*body*/}
              <div className="relative p-6 flex justify-center">
                <div className="col-span-3 gap-5">
                  <img src={'/api/'+slip} />
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
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-50 fixed inset-0  z-40 bg-black"></div>
      </div>
    </div>
  );
};

export default ViewSlip;
