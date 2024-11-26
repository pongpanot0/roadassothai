"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

const page = ({ searchParams }) => {
  const data = JSON.parse(searchParams.data);

  // Initialize state for shop details and items
  const [shopdetail, setShopdetail] = React.useState({
    shop_transaction_name: "",
    shop_transaction_address_num: "",
    shop_transaction_address_sub_district: "",
    shop_transaction_address_district: "",
    shop_transaction_address_province: "",
    shop_transaction_address_zipcode: "",
    shop_transaction_address_slip: "",
    shopdetailitem: data,
    email: "",
    line: "",
    facebook: "",
    phone: "",
  });

  // Calculate sum dynamically based on item quantities and prices
  const calculateSum = () =>
    shopdetail.shopdetailitem.reduce((accumulator, item) => {
      return accumulator + item.itemprice * item.itemquantity;
    }, 50); // เพิ่มค่าจัดส่ง 50 บาทในขั้นตอนเริ่มต้น

  const [sum, setSum] = React.useState(calculateSum());

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function () {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxDimension = 750;

          if (width > height) {
            if (width > maxDimension) {
              height *= maxDimension / width;
              width = maxDimension;
            }
          } else {
            if (height > maxDimension) {
              width *= maxDimension / height;
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const base64String = canvas.toDataURL("image/jpeg", 0.7);

          setShopdetail((prevState) => ({
            ...prevState,
            shop_transaction_address_slip: base64String,
          }));
        };
      };

      reader.readAsDataURL(file);
    } else {
      setShopdetail((prevContent) => ({
        ...prevContent,
        [name]: value,
      }));
    }
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = shopdetail.shopdetailitem.map((item, i) =>
      i === index ? { ...item, itemquantity: newQuantity } : item
    );

    setShopdetail((prevDetail) => ({
      ...prevDetail,
      shopdetailitem: updatedItems,
    }));

    setSum(calculateSum(updatedItems));
  };

  const router = useRouter();
  const postData = async () => {
    try {
      const {
        shop_transaction_name,
        shop_transaction_address_num,
        shop_transaction_address_sub_district,
        shop_transaction_address_district,
        shop_transaction_address_province,
        shop_transaction_address_zipcode,
        shop_transaction_address_slip,
        phone,
      } = shopdetail;
      if (
        !shop_transaction_name ||
        !phone ||
        !shop_transaction_address_num ||
        !shop_transaction_address_sub_district ||
        !shop_transaction_address_district ||
        !shop_transaction_address_province ||
        !shop_transaction_address_zipcode ||
        !shop_transaction_address_slip
      ) {
        Swal.fire({
          icon: "error",
          title: "กรุณากรอกข้อมูลให้ครบถ้วน",
          text: "โปรดกรอกข้อมูลให้ครบถ้วน",
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
        return;
      }
      const response = await fetch("/api/shop/transaction", {
        method: "POST",
        body: JSON.stringify(shopdetail),
      });

      const re = await response.json();
      if (re.status === 200) {
        Swal.fire({
          icon: "success",
          title: "สร้างข้อมูลสำเร็จ",
          showConfirmButton: true,
          confirmButtonText: "OK",
          timer: 3000,
        }).then((res) => {
          if (res.isConfirmed) {
            router.push(`/`);
          }
          router.push(`/`);
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="p-3">
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <h1 className="text-[28px] p-2">ที่อยู่จัดส่ง</h1>
          <div className="grid grid-cols-2 gap-5">
            <input
              onChange={handleInputChange}
              type="text"
              name="shop_transaction_name"
              placeholder="ชื่อผู้รับสินค้า"
              className="inputClass"
            />
            <input
              name="shop_transaction_address_num"
              type="text"
              onChange={handleInputChange}
              placeholder="บ้านเลขที่"
              className="inputClass"
            />
            <input
              type="text"
              name="shop_transaction_address_sub_district"
              placeholder="ตำบล / แขวง"
              onChange={handleInputChange}
              className="inputClass"
            />
            <input
              type="text"
              placeholder="เขต / อำเภอ"
              onChange={handleInputChange}
              className="inputClass"
              name="shop_transaction_address_district"
            />
            <input
              type="text"
              name="shop_transaction_address_province"
              placeholder="จังหวัด"
              onChange={handleInputChange}
              className="inputClass"
            />
            <input
              type="text"
              name="shop_transaction_address_zipcode"
              placeholder="รหัสไปรษณีย์"
              onChange={handleInputChange}
              className="inputClass"
            />
            <input
              type="text"
              name="phone"
              placeholder="เบอร์โทรศัพท์"
              onChange={handleInputChange}
              className="inputClass"
            />
            <input
              type="email"
              name="email"
              placeholder="E-Mail"
              onChange={handleInputChange}
              className="inputClass"
            />
            <input
              type="text"
              name="line"
              placeholder="Line"
              onChange={handleInputChange}
              className="inputClass"
            />
            <input
              type="text"
              name="facebook"
              placeholder="Facebook"
              onChange={handleInputChange}
              className="inputClass "
            />
          </div>
        </div>
        <div className="col-span-1">
          <h1 className="text-[28px] p-2">สรุปรายการสั่งซื้อ</h1>{" "}
          <div className="grid grid-cols-2  gap-5 ">
            <div className="col-span-2 border-gray-500 border p-2 rounded-lg">
              <table className="w-full table-fixed border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-2 text-left">
                      สินค้า
                    </th>
                    <th className="border border-gray-200 p-2 text-left">
                      จำนวน
                    </th>
                    <th className="border border-gray-200 p-2 text-left">
                      ราคา
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shopdetail.shopdetailitem.map((item, index) => (
                    <tr key={index} className="">
                      <td className="border border-gray-200 p-2 overflow-hidden  whitespace-pre-wrap text-ellipsis">
                        {item.itemname}
                      </td>
                      <td className="border border-gray-200 p-2">
                        <input
                          type="number"
                          value={item.itemquantity}
                          onChange={(e) =>
                            handleQuantityChange(index, Number(e.target.value))
                          }
                          min="1"
                          className="w-full px-2 py-1 border rounded-md"
                        />
                      </td>
                      <td className="border border-gray-200 p-2">
                        {(item.itemprice * item.itemquantity).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-span-2">
              <div className="grid grid-cols-2">
                <div>
                  <h2 className="text-[28px]">ค่าส่ง</h2>
                </div>
                <div>
                  {" "}
                  <h2 className="text-[22px]">50 บาท</h2>{" "}
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="grid grid-cols-2">
                <div>
                  <h2 className="text-[28px]">รวมจำนวนเงิน</h2>
                </div>
                <div>
                  {" "}
                  <h2 className="text-[22px]">
                    {" "}
                    {calculateSum().toLocaleString()} บาท
                  </h2>{" "}
                </div>
              </div>
            </div>
            <div className="col-span-2 text-center">
              <h2 className="text-[18px] text-gray-500">
                โอนเงินเข้าบัญชีธนาคารไทยพาณิชย์
              </h2>
              <h2 className="text-[18px] text-gray-500">
                ชื่อบัญชีสมาคมทางหลวงแห่งประเทศไทย สาขาชิดลม
                <br />
                เลขที่บัญชี 008 2 00408 8 ประเภทบัญชีสะสมทรัพย์{" "}
              </h2>
            </div>
            <div className="col-span-2">
              <input
                className="inputClass w-full"
                type="file"
                placeholder="อัพโหลดสลิป"
                accept="images/*"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-2">
              <button className="primary w-full" onClick={(e) => postData()}>
                {" "}
                ชำระเงิน
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
