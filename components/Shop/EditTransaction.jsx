import React from "react";
import ViewSlip from "./ViewSlip";
import Swal from "sweetalert2";
const EditTransaction = ({ dataItems, data, onClose }) => {
  const [showslip, setshowSlip] = React.useState(false);
  const [showAccept, setshowAccept] = React.useState(false);
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    dataItems.forEach((item) => {
      totalAmount +=
        item.shop_transaction_items_quatity * item.shop_transaction_items_price;
    });
    return totalAmount + 50;
  };
  const openslipAccept = async () => {
    setshowAccept(!showAccept);
  };
  const updateSlip = async () => {
    try {
      const response = await fetch("/api/shop/transaction", {
        method: "PUT",
        body: JSON.stringify({ data, dataItems,AcceptSlipDetails }),
      });
      Swal.fire({
        icon: "success",
        title: "ยืนยันข้อมูลสำเร็จ",
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
  calculateTotalAmount();
  const [AcceptSlipDetails, setAcceptSlipDetails] = React.useState({
    delivery_by: "",
    numberpack: "",
  });

  const handleInputChange = (event) => {
    const { name, type } = event.target;
    setAcceptSlipDetails((prevContent) => ({
      ...prevContent,
      [name]: event.target.value,
    }));
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
          <div className="relative w-full my-6 mx-auto  max-w-5xl">
            {/*content*/}
            <div
              className={`border-0  rounded-lg shadow-lg relative 
flex flex-col w-full bg-white ${showAccept ? " opacity-90" : ""} outline-none 
focus:outline-none`}
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
                    <label htmlFor="shop_transaction_address_num">
                      บ้านเลขที่
                    </label>
                    <input
                      name="shop_transaction_address_num"
                      id="shop_transaction_address_num"
                      type="text"
                      value={data.shop_transaction_address_num}
                      placeholder="บ้านเลขที่"
                      className="inputClass"
                      readOnly
                    />
                  </div>
                  <div>
                    <label htmlFor="shop_transaction_address_sub_district">
                      ตำบล / แขวง
                    </label>
                    <input
                      name="shop_transaction_address_sub_district"
                      id="shop_transaction_address_sub_district"
                      type="text"
                      value={data.shop_transaction_address_num}
                      placeholder="ตำบล / แขวง"
                      className="inputClass"
                      readOnly
                    />
                  </div>

                  <div>
                    <label htmlFor="shop_transaction_address_district">
                      ตำบล / แขวง
                    </label>
                    <input
                      name="shop_transaction_address_district"
                      id="shop_transaction_address_district"
                      type="text"
                      value={data.shop_transaction_address_district}
                      placeholder="เขต / อำเภอ"
                      className="inputClass"
                      readOnly
                    />
                  </div>

                  <div>
                    <label htmlFor="shop_transaction_address_province">
                      จังหวัด
                    </label>
                    <input
                      name="shop_transaction_address_province"
                      id="shop_transaction_address_province"
                      type="text"
                      value={data.shop_transaction_address_province}
                      placeholder="จังหวัด"
                      className="inputClass"
                      readOnly
                    />
                  </div>

                  <div>
                    <label htmlFor="shop_transaction_address_zipcode">
                      รหัสไปรษณีย์
                    </label>
                    <input
                      name="shop_transaction_address_zipcode"
                      id="shop_transaction_address_zipcode"
                      type="text"
                      value={data.shop_transaction_address_zipcode}
                      placeholder="รหัสไปรษณีย์"
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
                  <div>
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
                  <div className="">
                    <label htmlFor="total">จำนวนเงินที่ต้องชำระ</label>
                    <input
                      name="total"
                      id="total"
                      type="text"
                      value={calculateTotalAmount()}
                      placeholder="จำนวนเงินที่ต้องชำระ"
                      className="inputClass"
                      readOnly
                    />
                  </div>
                  <div className="">
                    <label htmlFor="total">ค่าส่ง</label>
                    <input
                      name="total"
                      id="total"
                      type="text"
                      value="50"
                      placeholder="ค่าส่ง"
                      className="inputClass"
                      readOnly
                    />
                  </div>
                  <div>
                    <button
                      className="primary"
                      onClick={(e) => setshowSlip(!showslip)}
                    >
                      ดูสลิปการโอน
                    </button>
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
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  onClick={(e) => onClose()}
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Close
                </button>
                <button
                  onClick={(e) => openslipAccept()}
                  className="primary mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  ยืนยันสลิป
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-50 fixed inset-0  z-40 bg-black"></div>

        {showAccept ? (
          <div>
            {" "}
            <div>
              <div
                className="justify-center 
      items-center flex overflow-x-hidden 
      overflow-y-auto fixed inset-0 z-50 outline-none 
      focus:outline-none"
              >
                <div className="relative w-full my-6 mx-auto  max-w-3xl">
                  {/*content*/}
                  <div
                    className="border-0  rounded-lg shadow-lg relative 
      flex flex-col w-full bg-white outline-none 
      focus:outline-none"
                  >
                    {/*header*/}
                    <div className="flex justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        รายละเอียดการจัดส่ง
                      </h3>
                    </div>
                    {/*body*/}
                    <div className="col-span-2 px-5">
                      <label htmlFor="delivery_by">ส่งโดย</label>
                      <input
                        name="delivery_by"
                        onChange={handleInputChange}
                        type="text"
                        value={AcceptSlipDetails.delivery_by}
                        placeholder="ส่งโดย"
                        className="inputClass"
                      />
                    </div>{" "}
                    <div className="col-span-2 px-5">
                      <label htmlFor="numberpack">หมายเลขการจัดส่ง</label>
                      <input
                        name="numberpack"
                        onChange={handleInputChange}
                        type="text"
                        value={AcceptSlipDetails.numberpack}
                        placeholder="ส่งโดย"
                        className="inputClass"
                      />
                    </div>
                    {/*footer*/}
                    <div className="flex items-center mt-3 justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        onClick={(e) => setshowAccept(!showAccept)}
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Close
                      </button>
                      <button
                        onClick={(e) => updateSlip()}
                        className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        ยืนยัน
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-50 fixed inset-0  z-40 bg-black"></div>
            </div>
          </div>
        ) : null}
        {showslip ? (
          <ViewSlip
            slip={data.shop_transaction_address_slip}
            onClose={(e) => setshowSlip(!showslip)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default EditTransaction;
