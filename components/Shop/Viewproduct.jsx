import React from "react";
import Swal from "sweetalert2";

const ViewProduct = ({ onClose, values }) => {
  const [productdetail, setProductdetail] = React.useState({
    shop_id: values.shop_id,
    shop_name: values.shop_name,
    shop_amount: values.shop_amount,
    stock: values.stock,
    shop_detail: values.shop_detail,
    shop_pic: values.shop_pic, // For image file
    shop_sample: values.shop_sample,
    is_preorder: values.is_preorder || "0", // default to "สินค้าปกติ"
  });

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      const file = event.target.files[0];

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
      } else if (name === "shop_sample") {
        // Set the PDF file for 'shop_sample'
        setProductdetail((prevState) => ({
          ...prevState,
          shop_sample: file,
        }));
      }
    } else {
      // For text inputs
      setProductdetail((prevContent) => ({
        ...prevContent,
        [name]: value,
      }));
    }
  };

  const postData = async () => {
    const formData = new FormData();
    formData.append("shop_id", productdetail.shop_id);
    formData.append("shop_name", productdetail.shop_name);
    formData.append("shop_amount", productdetail.shop_amount);
    formData.append("stock", productdetail.stock);
    formData.append("shop_detail", productdetail.shop_detail);
    formData.append("is_preorder", productdetail.is_preorder);
    
    if (productdetail.shop_pic) {
      formData.append("shop_pic", productdetail.shop_pic);
    }
    if (productdetail.shop_sample) {
      formData.append("pic", productdetail.shop_sample);
    }

    try {
      const res = await fetch(`/api/shop`, {
        method: "PUT",
        body: formData,
      });
      const response = await res.json();
      Swal.fire({
        icon: "success",
        title: "เพิ่มข้อมูลสำเร็จ",
        showConfirmButton: true,
        timer: 1500,
      }).then((response) => {
        if (response.isConfirmed) {
          onClose();
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
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
                      value={productdetail.shop_name}
                      placeholder="ชื่อสินค้า"
                      className="inputClass"
                    />
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="shop_amount">ราคา</label>
                    <input
                      name="shop_amount"
                      onChange={handleInputChange}
                      type="number"
                      value={productdetail.shop_amount}
                      placeholder="ราคา"
                      className="inputClass"
                    />
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="stock">จำนวน</label>
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
                  <div className="col-span-1">
                    <label htmlFor="shop_pic">รูปภาพ</label>
                    <input
                      name="shop_pic"
                      onChange={handleInputChange}
                      type="file"
                      accept="image/*"
                      className="inputClass"
                    />
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="shop_sample">ตัวอย่าง (PDF)</label>
                    <input
                      name="shop_sample"
                      onChange={handleInputChange}
                      type="file"
                      accept="application/pdf"
                      className="inputClass"
                    />
                  </div>
                  <div className="col-span-1">
                    {productdetail.shop_pic && (
                      <img
                        src={productdetail.shop_pic}
                        alt="Product Preview"
                        className="mt-2 w-full h-64 object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div className="col-span-1">
                    {productdetail.shop_sample && (
                      <a
                        href={
                          "http://roadassothai.com" +
                          productdetail.shop_sample
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-blue-500 underline"
                      >
                        PDF ตัวอย่าง
                      </a>
                    )}
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
    </div>
  );
};

export default ViewProduct;
