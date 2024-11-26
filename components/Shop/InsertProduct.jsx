import React from "react";
import Swal from "sweetalert2";

const InsertProduct = ({ onClose }) => {
  const [productdetail, setProductdetail] = React.useState({
    shop_name: "",
    shop_amount: "",
    shop_pic: null,
    stock: "",
    shop_detail: "",
    pic: null,
    is_preorder:"0"
  });

  const handleInputChange = (event) => {
    const { name, type, files } = event.target;

    if (type === "file" && files.length > 0) {
      const file = files[0];

      // Handle image files (shop_pic)
      if (name === "shop_pic") {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target.result;

          img.onload = () => {
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

            setProductdetail((prevState) => ({
              ...prevState,
              shop_pic: base64String,
            }));
          };
        };
        reader.readAsDataURL(file);
      }

      // Handle PDF files (pic)
      if (name === "pic" ) {
        setProductdetail((prevState) => ({
          ...prevState,
          pic: file,
        }));
      }
    } else {
      setProductdetail((prevContent) => ({
        ...prevContent,
        [name]: event.target.value,
      }));
    }
  };

  const postData = async () => {
    const formData = new FormData();
    formData.append("shop_name", productdetail.shop_name);
    formData.append("shop_amount", productdetail.shop_amount);
    formData.append("stock", productdetail.stock);
    formData.append("shop_detail", productdetail.shop_detail);
    formData.append("is_preorder", productdetail.is_preorder);
    // Append image and PDF files separately
    if (productdetail.shop_pic) {
      formData.append("shop_pic", productdetail.shop_pic); // Base64 string for image
    }
    if (productdetail.pic) {
      formData.append("pic", productdetail.pic); // PDF file as File object
    }

    try {
      const res = await fetch(`/api/shop`, {
        method: "POST",
        body: formData,
      });
      const response = await res.json();

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "เพิ่มข้อมูลสำเร็จ",
          showConfirmButton: true,
          timer: 1500,
        }).then((result) => {
          if (result.isConfirmed) {
            onClose();
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: response.data || "ไม่สามารถเพิ่มข้อมูลได้",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถเพิ่มข้อมูลได้",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto max-w-4xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">เพิ่มข้อมูล สินค้า</h3>
            </div>

            <div className="relative p-6">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <input
                    name="shop_name"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="ชื่อสินค้า"
                    className="inputClass"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    name="shop_amount"
                    onChange={handleInputChange}
                    type="number"
                    placeholder="ราคา"
                    className="inputClass"
                  />
                </div>

                <div className="col-span-2">
                  <label htmlFor="shop_amount">จำนวน</label>
                  <input
                    name="stock"
                    onChange={handleInputChange}
                    type="number"
                    value={productdetail.stock}
                    placeholder="จำนวน"
                    className="inputClass"
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="shop_detail">รายละเอียด</label>
                  <textarea
                    name="shop_detail"
                    onChange={handleInputChange}
                    type="text"
                    multiple
                    value={productdetail.shop_detail}
                    placeholder="รายละเอียด"
                    className="inputClass resize-none w-full h-32 text-start"
                  />
                </div>
                <div className="col-span-2">
                    <label htmlFor="is_preorder">ประเภทสินค้า</label>
                    <select
                      name="is_preorder"
                      onChange={handleInputChange}
                      value={productdetail.is_preorder}
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="0">สินค้าปกติ</option>
                      <option value="1">PreOrder</option>
                    </select>
                  </div>
                <div className="col-span-2">
                  <label htmlFor="shop_pic">รูปภาพ</label>
                  <input
                    name="shop_pic"
                    onChange={handleInputChange}
                    type="file"
                    placeholder="ราคา"
                    className="inputClass"
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="pic">ตัวอย่าง PDF</label>
                  <input
                    name="pic"
                    onChange={handleInputChange}
                    type="file"
                    accept="application/pdf"
                    className="inputClass"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                onClick={onClose}
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Close
              </button>
              <button
                className="primary mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={postData}
              >
                เพิ่มข้อมูล
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default InsertProduct;
