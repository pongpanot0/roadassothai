import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ShoppingCart = ({ cartItems, onClose, removeFromCart }) => {
  const router = useRouter();

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handlePayment = () => {
    // Check if cartItems is an array
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      console.error("Cart items are not properly defined.");
      return;
    }

    const jsonData = JSON.stringify(
      cartItems.map((item) => ({
        itemname: item.name,
        itemprice: item.price,
        itemquantity: item.quantity,
      }))
    );

    const queryParams = encodeURIComponent(jsonData);

    // สร้าง URL ใหม่โดยเพิ่ม query parameters ลงใน URL
    const paymentURL = `/maps/payment?data=${queryParams}`;

    router.push(paymentURL);
  };
  const [lannow, setLannow] = React.useState("EN"); // Default to English

  // Use useEffect to set the language from localStorage after the client has loaded
  React.useEffect(() => {
    const language = localStorage.getItem("lan") || "EN"; // Default to 'EN' if not found
    setLannow(language);
  })

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          {" "}
          {lannow == "TH" ? "รายการสินค้าในตะกร้า" : "Items on Cart"}{" "}
        </h2>
        {cartItems.length === 0 ? (
          <p> {lannow == "TH" ? "ไม่มีสินค้าในตะกร้า" : "No Items"} </p>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-gray-300 py-2"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>
                    {lannow == "TH" ? "ราคา" : "Price"} : {item.price}{" "}
                  </p>
                  <p>
                    {lannow == "TH" ? "จำนวน" : "Quantity"} : {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500"
                >
                  {lannow == "TH" ? "ลบ" : "Deleted"}
                </button>
              </div>
            ))}
            <div className="mt-4">
              <h3 className="font-semibold">
                {lannow == "TH" ? "ยอดรวมทั้งหมด" : "Total"} :{" "}
                {calculateTotal()}
              </h3>
            </div>
          </div>
        )}
        <button
          onClick={onClose}
          className="bg-gray-500 text-white p-3   rounded hover:bg-gray-600 mt-4"
        >
          {lannow == "TH" ? "ปิด" : "Close"}
        </button>
        <button onClick={handlePayment} className="primary mt-4 ml-2">
          {lannow == "TH" ? "ชำระเงิน" : "Payment"}
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
