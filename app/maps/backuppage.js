"use client";
import React, { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import ShoppingCartModal from "@/components/Shop/Bill";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const ShoppingPage = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [lannow, setLannow] = useState("EN");
  const router = useRouter();

  // Calculate total items and price
  const totalItems = cart.reduce((total, item) => total + item.itemquantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.itemprice * item.itemquantity, 0);

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

  // Add to cart functionality
  const handleAddToCart = () => {
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex((item) => item.itemname === selectedProduct.itemname);
    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].itemquantity += Number(quantity);
    } else {
      updatedCart.push({ ...selectedProduct, itemquantity: Number(quantity) });
    }
    setCart(updatedCart);
    setIsDetail(false);
    setSelectedProduct(null);
  };

  // Open and close product detail modal
  const openModal = (product) => {
    setIsDetail(true);
    setSelectedProduct(product);
  };
  const handleCloseModal = () => {
    setIsDetail(false);
    setSelectedProduct(null);
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  // Handle payment and redirect to payment page
  const handlePayment = () => {
    const jsonData = JSON.stringify(cart);
    const queryParams = encodeURIComponent(jsonData);
    const paymentURL = `/maps/payment?data=${queryParams}`;
    router.push(paymentURL);
  };

  // Remove item from cart
  const handleRemoveItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  return (
    <div className="container mx-auto">
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 mt-5">
          <div className="grid grid-cols-4 gap-2 mt-5">
            <div className="flex justify-center col-span-4">
              <img
                className="cursor-pointer w-auto h-96 rounded-lg shadow-md"
                src="http://roadassothai.com/map66.jpg"
                alt="Selected"
              />
            </div>
            <img
              className="cursor-pointer h-auto w-full sm:w-44 md:w-44 lg:w-44 xl:w-44 rounded-lg shadow-md hover:border hover:border-[#295F93]"
              src="http://roadassothai.com/map66.jpg"
              alt="news_pic"
            />
          </div>
          <div>
            <font className="text-[20px] font-medium">แผนที่ทางหลวงประเทศไทย ฉบับปี 2567</font>
            <font className="text-[18px] font-light">
              <br />
              สมาคมทางหลวงแห่งประเทศไทย ได้จัดพิมพ์แผนที่ทางหลวงประเทศไทย ฉบับปี 2567
              <br />
              ชนิด A3 มาตราส่วน 1:1,000,000 อัพเดทข้อมูลพิเศษทันสมัย
              <br />
              สามารถใช้งานในรูปแบบ E-Book ด้วยการแสกน QR Code และใส่รหัสลงทะเบียนภายในเล่ม
            </font>
            <br />
            <font className="text-[24px] mt-5 font-semibold text-teal-800">
              สั่งซื้อได้ที่ สมาคมทางหลวงแห่งประเทศไทย
            </font>
            {/* Contact info here */}
            <button className="primary mt-5 px-28 w-48" onClick={handlePayment}>
              สั่งซื้อ
            </button>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {isDetail && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{selectedProduct.itemname}</h2>
            <p>{lannow === "TH" ? "ราคา" : "Price"} {selectedProduct.itemprice * quantity}</p>
            <label className="block mt-4">
              {lannow === "TH" ? "จำนวน" : "Total"} :
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="border rounded p-1 ml-2"
              />
            </label>
            <div className="mt-6">
              <button
                onClick={handleAddToCart}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {lannow === "TH" ? "เพิ่มลงในตะกร้า" : "Add to Cart"}
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
              >
                {lannow === "TH" ? "ปิด" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <ShoppingCartModal
          cartItems={cart}
          removeFromCart={handleRemoveItem}
          totalItems={totalItems}
          totalPrice={totalPrice}
          onClose={() => setIsCartOpen(false)}
        />
      )}
    </div>
  );
};

export default ShoppingPage;
