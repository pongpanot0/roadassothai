import React from "react";

function Dashboard() {
  return (
    <div className="">
      <div className="grid lg:grid-cols-5  xs:grid-cols-1 gap-4 p-4">
        <div className="lg:col-span-2 xs:col-span-1 col-span-1 bg-white flex justify-between w-full border border-gray-50 p-4 rounded-lg">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">$7,846</p>
            <p className="text-gray-600">Daily Revenue</p>
          </div>
          <p className="bg-[#77A8D8] flex justify-center items-center p-2 rounded-lg">
            <span>+18%</span>
          </p>
        </div>
        <div className="lg:col-span-2 xs:col-span-1 col-span-1 bg-white flex justify-between w-full border-gray-50 border p-4 rounded-lg">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">$7,846</p>
            <p className="text-gray-600">Daily Revenue</p>
          </div>
          <p className="bg-[#77A8D8] flex justify-center items-center p-2 rounded-lg">
            <span>+18%</span>
          </p>
        </div>
        <div className="bg-white flex justify-between w-full border-gray-50 border p-4 rounded-lg">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">$7,846</p>
            <p className="text-gray-600">Daily Revenue</p>
          </div>
          <p className="bg-[#77A8D8] flex justify-center items-center p-2 rounded-lg">
            <span>+18%</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
