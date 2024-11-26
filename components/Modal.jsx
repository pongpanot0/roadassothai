import React from 'react';

const Modal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative w-auto max-w-3xl mx-auto">
        {/* Modal content */}
        <div className="border border-gray-200 shadow-lg rounded-lg bg-white outline-none focus:outline-none">
          <button
            className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 12.586l-4.293 4.293-1.414-1.414L8.586 11 5.293 7.707l1.414-1.414L10 9.586l4.293-4.293 1.414 1.414L11.414 11l3.293 3.293-1.414 1.414L10 12.586z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <img src={'/api/'+imageUrl} alt="Modal" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
