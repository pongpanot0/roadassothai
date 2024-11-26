import React from "react";
import ViewSlip from "./ViewSlip";
import Swal from "sweetalert2";
const EditPreorder = ({ dataItems, data, onClose }) => {
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    dataItems.forEach((item) => {
      totalAmount +=
        item.shop_transaction_items_quatity * item.shop_transaction_items_price;
    });
    return totalAmount + 50;
  };
  const updatecallback = async () => {
    try {
      const response = await fetch("/api/shop/preorder", {
        method: "PUT",
        body: JSON.stringify({ data, dataItems }),
      });
      Swal.fire({
        icon: "success",
        title: "ยืนยันข้อมูลสำเร็จ",
        showConfirmButton: true,
        timer: 5000,
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
  calculateTotalAmount();
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
                  รายละเอียดผู้ซื้อสินค้า
                </h3>
              </div>
              {/*body*/}
              <div className="relative p-6 grid grid-cols-4">
                <div className="col-span-2 grid grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="shop_transaction_name">
                      ชื่อผู้รับสินค้า
                    </label>
                    <input
                      type="text"
                      id="shop_transaction_name"
                      name="shop_transaction_name"
                      placeholder="ชื่อผู้รับสินค้า"
                      value={data.shop_transaction_name}
                      className="inputClass"
                      readOnly
                    />
                  </div>
                  <div>
                    <label htmlFor="shop_transaction_address_zipcode">
                      เบอร์โทรศัพท์
                    </label>
                    <input
                      name="phone"
                      id="phone"
                      type="text"
                      value={data.phone}
                      placeholder="เบอร์โทรศัพท์"
                      className="inputClass"
                      readOnly
                    />
                  </div>
                  <div>
                    <label htmlFor="shop_transaction_address_zipcode">
                      Line ID
                    </label>
                    <input
                      name="line"
                      id="line"
                      type="text"
                      value={data.line}
                      placeholder="line"
                      className="inputClass"
                      readOnly
                    />
                  </div>
                  <div>
                    <label htmlFor="shop_transaction_address_zipcode">
                      Email
                    </label>
                    <input
                      name="shop_transaction_address_zipcode"
                      id="shop_transaction_address_zipcode"
                      type="text"
                      value={data.email}
                      placeholder="email"
                      className="inputClass"
                      readOnly
                    />
                  </div>
                  <div className=" col-span-2">
                    <label htmlFor="shop_transaction_address_zipcode">
                      Facebook
                    </label>
                    <input
                      name="Facebook"
                      id="Facebook"
                      type="text"
                      value={data.facebook}
                      placeholder="Facebook"
                      className="inputClass"
                      readOnly
                    />
                  </div>
                </div>
                <div className="text-center col-span-2">
                  <h2 className="text-[28px]">รายละเอียดสินค้า</h2>
                  <div className="sm:mb-2 -mx-2 px-4">
                    <div className="p-2 w-full">
                      <div className="rounded flex px-4 items-center">
                        <table className="bg-white w-full shadow sm:rounded-md text-start">
                          <thead>
                            <tr>
                              <th className="py-2 px-4 border-b">สินค้า</th>
                              <th className="py-2 px-4 border-b">จำนวน</th>
                              <th className="py-2 px-4 border-b">ราคา</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dataItems.map((res, index) => (
                              <tr key={index} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">
                                  {res.shop_transaction_items_name}
                                </td>
                                <td className="py-2 px-4 border-b">
                                  {res.shop_transaction_items_quatity}
                                </td>
                                <td className="py-2 px-4 border-b">
                                  {res.shop_transaction_items_price}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*footer*/}
              <div className="flex gap-5  items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  onClick={(e) => onClose()}
                  className="danger"
                  type="button"
                >
                  Close
                </button>
                <button
                  onClick={(e) => updatecallback()}
                  className="primary mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  ติดต่อกลับแล้ว
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPreorder;
