import React from "react";
import Swal from "sweetalert2";

const ModalEditUser = ({ data, onClose }) => {
  const [usersDetails, setuserDetails] = React.useState({
    user_id: data.user_id,
    user_name: data.user_name,
    user_password: data.user_password,
    user_email: data.user_email,
    role: data.role,
    firstname_th: data.firstname_th,
    lastname_th: data.lastname_th,
    firstname_en: data.firstname_en,
    lastname_en: data.lastname_en,
    engineers_card: data.engineers_card,
    user_type: data.user_type,
    department: data.department,
    phone: data.phone,
    jobs: data.jobs,
    membernumber: data.membernumber,
  });
  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    // If the input is a file input, handle it differently

    setuserDetails((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };
  const updateUserRole = async () => {
    try {
      const response = await fetch("/api/users/table", {
        method: "PUT",
        body: JSON.stringify(usersDetails),
      });

      Swal.fire({
        icon: "success",
        title: "อัพเดทข้อมูลสำเร็จ",
        showConfirmButton: true,
        timer: 1500,
      }).then((response) => {
        if (response.isConfirmed == true) {
          onClose();
        }
        onClose();
      });
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
                <h3 className="text-3xl font-semibold">อัพเดทข้อมูลใช้งาน</h3>
              </div>
              {/*body*/}
              <div className="relative p-6">
                <div className="grid grid-cols-2 gap-5">
                  <div className="grid grid-cols-4 gap-5">
                    <div className="col-span-2">
                      <input
                        value={usersDetails.firstname_th}
                        name="firstname_th"
                        onChange={handleInputChange}
                        type="text"
                        disabled
                        placeholder="ชื่อสินค้า"
                        className="inputClass"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        name="lastname_th"
                        value={usersDetails.lastname_th}
                        onChange={handleInputChange}
                        type="text"
                        disabled
                        placeholder="ราคา"
                        className="inputClass"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        name="firstname_en"
                        onChange={handleInputChange}
                        type="text"
                        disabled
                        placeholder="ราคา"
                        value={usersDetails.firstname_en}
                        className="inputClass"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        name="lastname_en"
                        onChange={handleInputChange}
                        type="text"
                        value={usersDetails.lastname_en}
                        placeholder="ราคา"
                        disabled
                        className="inputClass"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        name="engineers_card"
                        value={usersDetails.engineers_card}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="ราคา"
                        disabled
                        className="inputClass"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        name="department"
                        value={usersDetails.department}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="ราคา"
                        disabled
                        className="inputClass"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        name="phone"
                        onChange={handleInputChange}
                        type="text"
                        value={usersDetails.phone}
                        disabled
                        placeholder="ราคา"
                        className="inputClass"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        name="jobs"
                        onChange={handleInputChange}
                        type="text"
                        value={usersDetails.jobs}
                        disabled
                        placeholder="ราคา"
                        className="inputClass"
                      />
                    </div>
                    <div className="col-span-4">
                      <input
                        name="user_email"
                        onChange={handleInputChange}
                        type="text"
                        disabled
                        value={usersDetails.user_email}
                        placeholder="ราคา"
                        className="inputClass"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <h2 className="text-[28px]">ประเภทสมาชิก</h2>
                    <div>
                      <select
                        value={usersDetails.user_type}
                        id="pic_column"
                        onChange={handleInputChange}
                        name="user_type"
                        className="bg-white border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="1" selected>
                          สมาชิกสามัญ
                        </option>
                        <option value="2">สมาชิกสมทบ</option>
                        <option value="3">สมาชิกกิตติมศักดิ์</option>
                      </select>
                    </div>
                    <div className="text-center">
                      <h2 className="text-[28px] mt-2">รหัสสมาชิก</h2>
                      <div className="col-span-4">
                        <input
                          name="membernumber"
                          onChange={handleInputChange}
                          type="text"
                          value={usersDetails.membernumber}
                          placeholder="รหัสสมาชิก"
                          className="inputClass"
                        />
                      </div>
                    </div>
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
                  onClick={(e) => updateUserRole()}
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

export default ModalEditUser;
