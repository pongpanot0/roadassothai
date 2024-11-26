"use client";
import React, { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import ShoppingCartModal from "@/components/Shop/Bill";
import { useRouter } from "next/navigation";

import dynamic from "next/dynamic";

const Loading = dynamic(
  () => import("@/components/Loading"),
  { ssr: false }
);
const ShoppingPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [lannow, setLannow] = useState("EN");
  const router = useRouter();
  const [cart, setCart] = useState([]); // State to hold cart items
  // Calculate total items and price

  // Fetch data
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/shop`);
        const response = await res.json();
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    getData();

    // Set language
    const language = localStorage.getItem("lan") || "EN";
    setLannow(language);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleShowModal = (shop) => {
    setSelectedShop(shop);
    setQuantity(1); // Reset quantity to 1 when opening a new modal
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedShop(null);
  };

  const handleIncreaseQuantity = () => {
    if (quantity < selectedShop.stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const handleAddToCart = () => {
    const itemToAdd = {
      id: selectedShop.shop_id, // Ensure this property exists
      itemname: selectedShop.shop_name,
      itemprice: selectedShop.shop_amount,
      itemquantity: quantity,
    };

    // Check if item is already in the cart
    const existingItemIndex = cart.findIndex(
      (item) => item.id === itemToAdd.id
    );
    if (existingItemIndex >= 0) {
      // Update the quantity if it already exists
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      // Add new item to the cart
      setCart((prevCart) => [...prevCart, itemToAdd]);
    }

    // Close the modal after adding to cart
    handleCloseModal();
  };

  const handlePreorder = (res) => {
    const itemToAdd = {
      id: res.shop_id,
      itemname: res.shop_name,
      itemprice: res.shop_amount,
      itemquantity: 1,
    };

    // Clear the cart and add only the selected item
    setCart([itemToAdd]); // Update cart to an array with the selected item

    // Directly pass [itemToAdd] to handleProceedToPreorder
    handleProceedToPreorder([itemToAdd]);
  };

  const handleProceedToPreorder = (itemToAdd) => {
    const cartData = JSON.stringify(itemToAdd); // Serialize cart data

    router.push(`/maps/preorder?data=${cartData}`);
  };

  const [showCart, setShowCart] = useState(false); // State to show/hide cart
  const handleToggleCart = () => {
    setShowCart((prev) => !prev); // Toggle cart visibility
  };
  const handleProceedToPayment = () => {
    // Serialize cart data to JSON and navigate to payment page
    const cartData = JSON.stringify(cart);
    router.push(`/maps/payment?data=${encodeURIComponent(cartData)}`);
  };
  const handlePreviewPDF = (url) => {
    if (url) {
      window.open(
        "http://roadassothai.com" + url,
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      alert("ไม่มีไฟล์ตัวอย่าง PDF");
    }
  };

  return (
    <div className="container mx-auto">
      {showCart && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white shadow-lg rounded-lg p-4 max-w-xl w-full">
            <h2 className="text-2xl font-bold mb-2 text-center">
              ตะกร้าสินค้า
            </h2>
            <ul>
              {cart.length === 0 ? (
                <li className="text-center text-2xl">ไม่มีสินค้าในตะกร้า</li>
              ) : (
                cart.map((item) => (
                  <li key={item.id} className="flex justify-between mb-2">
                    <span>{item.itemname}</span>
                    <span>
                      จำนวน {item.itemquantity} ชิ้น | ราคา : {item.itemprice}{" "}
                      บาท
                    </span>
                  </li>
                ))
              )}
            </ul>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onClick={handleToggleCart} className="danger">
                ปิด
              </button>
              <button onClick={handleProceedToPayment} className="primary">
                เข้าสู่หน้าชำระเงิน
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-3 mt-5">
          <div className="col-span-2"></div>

          <div className="text-end items-end relative">
            <button className="primary relative p-0">
              <FaCartShopping
                className="text-3xl p-1 cursor-pointer scale-150"
                onClick={handleToggleCart}
              />
              {cart.length > 0 && (
                <span className="absolute  rounded-full  top-0 right-0 text-xs font-bold bg-blue-300 text-white  p-1">
                  {cart.reduce((acc, item) => acc + item.itemquantity, 0)}
                </span>
              )}
            </button>
          </div>
          {data.map((res) => (
            <div
              key={res.id}
              className="max-w-full md:max-w-sm mt-2 col-span-3 md:col-span-1 bg-white border border-gray-200 rounded-lg shadow "
            >
              <img
                className="rounded-t-lg w-full  md:h-72 object-contain"
                src={res.shop_pic}
                alt={res.shop_name} // Better alt attribute for accessibility
              />

              <div className="p-5 mt-5">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                  {res.shop_name}{" "}
                  {res.is_preorder == 1 ? (
                    <p className="text-red-500 regular-16">
                      สินค้า (Pre Order)
                    </p>
                  ) : null}
                </h5>

                <p className="mb-3 font-normal text-gray-700 ">
                  จำนวน : {res.stock}
                </p>
                <p className="mb-3 font-normal text-gray-700 ">
                  ราคา : {res.shop_amount}
                </p>
                {/* Conditional rendering of the button */}
                {res.stock > 0 ? (
                  <div>
                    {res.is_preorder == 0 ? (
                      <button
                        onClick={() => handleShowModal(res)}
                        className="w-full primary mb-3"
                      >
                        สั่งซื้อสินค้า
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePreorder(res)}
                        className="w-full primary mb-3"
                      >
                        Pre Order สินค้า
                      </button>
                    )}
                    <button
                      onClick={() => handlePreviewPDF(res.shop_sample)}
                      className="w-full primary"
                    >
                      ดูตัวอย่าง
                    </button>
                  </div>
                ) : (
                  <button disabled className="danger w-full">
                    สินค้าหมด
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {showModal && selectedShop && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-5">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 ">
              {selectedShop.shop_name}
            </h2>
            <img
              src={selectedShop.shop_pic}
              alt=""
              className="w-full max-h-[300px] mx-auto rounded-lg mb-4 object-contain"
            />
            <p className="text-gray-700  mb-2">{selectedShop.shop_detail}</p>
            <p className="text-gray-900  font-semibold mb-5">
              ราคา: {selectedShop.shop_amount * quantity} บาท
            </p>

            {/* Display Stock Information */}
            <p className="text-gray-700  mb-5">
              มีสินค้าจำนวน: {selectedShop.stock} ชิ้น
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center mb-5">
              <button
                onClick={handleDecreaseQuantity}
                className="px-3 py-1 text-lg font-bold bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                -
              </button>
              <span className="mx-5 text-lg font-medium">{quantity}</span>
              <button
                onClick={handleIncreaseQuantity}
                className="px-3 py-1 text-lg font-bold bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              ใส่สินค้าลงตะกร้า
            </button>
            <button
              onClick={handleCloseModal}
              className="w-full mt-3 px-3 py-2 text-sm font-medium text-gray-700  border border-gray-300 rounded-lg hover:bg-gray-200 "
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingPage;
