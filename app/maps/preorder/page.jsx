"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

const page = ({ searchParams }) => {
  const data = JSON.parse(searchParams.data);


  // Initialize state for shop details and items
  const [shopdetail, setShopdetail] = React.useState({
    shop_transaction_name: "",
    shopdetailitem: data,
    email: "",
    line: "",
    facebook: "",
    phone: "",
    is_preorder: 1,
  });

  // Calculate sum dynamically based on item quantities and prices
  const calculateSum = () =>
    shopdetail.shopdetailitem.reduce((accumulator, item) => {
      return 50 + accumulator + item.itemprice * item.itemquantity;
    }, 0);

  const [sum, setSum] = React.useState(calculateSum());

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    setShopdetail((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
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
      const { shop_transaction_name, email, line, facebook, phone } = shopdetail;
      if (!shop_transaction_name || !phone) {
        Swal.fire({
          icon: "error",
          title: "กรุณากรอกข้อมูลให้ครบถ้วน",
          text: "โปรดกรอกข้อมูลที่อยู่และเบอร์โทรศัพท์",
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
        return;
      }
      const response = await fetch("/api/shop/preorder", {
        method: "POST",
        body: JSON.stringify(shopdetail),
      });

      const re = await response.json();
      if (re.status === 200) {
        Swal.fire({
          icon: "success",
          title: "สร้างข้อมูลสำเร็จกรุณารอเจ้าหน้าที่ติดต่อกลับ",
          showConfirmButton: true,
          confirmButtonText: "OK",
          timer: 5000,
        }).then((res) => {
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
          <form>
          <div className="grid grid-cols-2 gap-5">
      
              <input
                onChange={handleInputChange}
                type="text"
                name="shop_transaction_name"
                placeholder="ชื่อผู้รับสินค้า"
                className="inputClass"
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="เบอร์โทรศัพท์"
                onChange={handleInputChange}
                className="inputClass"
                required
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
                className="inputClass col-span-2"
              />
        
          </div>
          </form>
        </div>
        <div className="col-span-1">
          <h1 className="text-[28px] p-2">สรุปรายการ Pre Order</h1>{" "}
          <div className="grid grid-cols-2 gap-5 ">
            <div className="col-span-2 border-gray-500 border p-2 rounded-lg">
              <table className="min-w-full border-collapse border border-gray-200">
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
                      <td className="border border-gray-200 p-2 overflow-hidden whitespace-nowrap text-ellipsis">
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
              <button className="primary w-full" onClick={(e) => postData()}>
                {" "}
                บันทึกข้อมูล
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
