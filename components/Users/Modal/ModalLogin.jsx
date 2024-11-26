import React from "react";
import LoginPage from "./Loginpage";

const ModalLogin = ({ onClose }) => {
  const onCloser = () => {
    onClose();
  };
  return (
    <div>
      <div
        className="justify-center 
  items-center flex overflow-x-hidden 
  overflow-y-auto fixed inset-0 z-50 outline-none 
  focus:outline-none"
      >
        <LoginPage onCloses={e=>onCloser()} />
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default ModalLogin;
