"use client";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import InsertProduct from "@/components/Shop/InsertProduct";
import ViewProduct from "@/components/Shop/Viewproduct";
import Preorder from "@/components/Shop/Preorder";

import EditTransaction from "../../../components/Shop/EditTransaction";
import dayjs from "dayjs";
import 'dayjs/locale/th'; // นำเข้า locale ภาษาไทย

dayjs.locale('th'); // ตั้งค่า locale เป็นภาษาไทย
const page = () => {
  const [data, setData] = React.useState([]);
  const [shopdata, setShopdata] = React.useState([]);
  const [openCreate, setopenCreate] = React.useState(false);
  const [openEdit, setopenEdit] = React.useState(false);
  const [openTransactionDetails, setTransactionDetails] = React.useState(false);

  const [trasntionsitems, settransationsItems] = React.useState({});
  React.useEffect(() => {
    getdata();
    getshopdata();
  }, []);
  const [dataItems, seyDataitems] = React.useState([]);
  const openeditTransaction = async (data) => {
    setTransactionDetails(!openTransactionDetails);
    settransationsItems(data);
    getitems(data);
  };
  const getitems = async (value) => {
    try {
      const response = await fetch(
        `/api/shop/transaction/byid?foo=${value.shop_transaction_id}`
      );
      const dataitems = await response.json();

      seyDataitems(dataitems.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getdata = async () => {
    try {
      const res = await fetch(`/api/shop/admin`);
      const response = await res.json();

      setData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteData = async (values) => {
    try {
      if (values.isdisbled == 0) {
        const data = {
          shop_id: values.shop_id,
          isdisbled: 1,
        };
        const res = await fetch(`/api/shop`, {
          method: "DELETE",
          body: JSON.stringify(data),
        });
        const response = await res.json();
      } else {
        const data = {
          shop_id: values.shop_id,
          isdisbled: 0,
        };
        const res = await fetch(`/api/shop`, {
          method: "DELETE",
          body: JSON.stringify(data),
        });
        const response = await res.json();
      }

      getdata();
    } catch (error) {
      console.log(error.message);
    }
  };
  const getshopdata = async () => {
    try {
      const res = await fetch(`/api/shop/transaction`);
      const response = await res.json();

      setShopdata(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [valuesEdit, setvaluesEdit] = React.useState([]);
  const editData = (res) => {
    setvaluesEdit(res);
    setopenEdit(!openEdit);
  };
  const closeModal = () => {
    getdata();
    setopenCreate(!openCreate);
  };
  const closeModalEdit = () => {
    getdata();
    setopenEdit(!openEdit);
  };
  const closeModalTransaction = () => {
    getshopdata();
    setTransactionDetails(!openTransactionDetails);
  };
  const [product, setProduct] = React.useState(1);
  return (
    <div className="gird grid-cols-2">
      <div className="col-span-1 ">
        <div className="flex gap-5">
          <button className="primary regular-16" onClick={(e) => setProduct(1)}>
            สินค้า
          </button>
          <button onClick={(e) => setProduct(2)} className="primary regular-16">
            การสั่งซื้อ
          </button>
          <button onClick={(e) => setProduct(3)} className="primary regular-16">
            Preorder
          </button>
        </div>
      </div>
      <div className="col-span-1 flex justify-between">
        <div></div>
        <div>
          <button
            className="primary "
            onClick={(e) => setopenCreate(!openCreate)}
          >
            Add items
          </button>
        </div>
      </div>
      <div className="col-span-2">
        {product == 1 ? (
          <table className="min-w-full divide-y divide-gray-200 ">
            {/* Table for product == 1 */}
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ชื่อ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ราคา
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  จำนวน
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  รายละเอียด
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((res, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {res.shop_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {res.shop_amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{res.stock}</td>
                  <td className="px-6 py-4 text-clip">{res.shop_detail}</td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {res.isdisbled == 0 ? (
                      <button
                        onClick={() => deleteData(res)}
                        className="danger"
                      >
                        Delete
                      </button>
                    ) : (
                      <button
                        onClick={() => deleteData(res)}
                        className="primary"
                      >
                        Enabled
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="primary" onClick={() => editData(res)}>
                      ดูรายละเอียด
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : product == 2 ? (
          <table className="min-w-full divide-y divide-gray-200 ">
            {/* Table for product == 2 */}
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ผู้รับ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ที่อยู่
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  วันที่สั่งซื้อ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ประเภทสินค้า
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  สลิปการโอน
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {shopdata.map((res, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {res.shop_transaction_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {res.shop_transaction_address_num}{" "}
                    {res.shop_transaction_address_sub_district}{" "}
                    {res.shop_transaction_address_district}{" "}
                    {res.shop_transaction_address_province}{" "}
                    {res.shop_transaction_address_zipcode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {dayjs(res.created_at).format('YYYY-MM-DD HH:mm') }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {res.slip_accept == 1 ? (
                      <p className="text-green-500">สลิปยืนยันแล้ว</p>
                    ) : (
                      <p className="text-orange-500">สลิปรอการยืนยัน</p>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {res.is_preorder == 0 ? (
                      <p className="text-green-500">สินค้าปกติ</p>
                    ) : (
                      <p className="text-orange-500">สินค้า Pre Order</p>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => openeditTransaction(res)}
                      className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                    >
                      ดูข้อมูล
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Preorder />
        )}

        {openEdit ? (
          <ViewProduct onClose={(e) => closeModalEdit()} values={valuesEdit} />
        ) : null}
        {openCreate ? <InsertProduct onClose={(e) => closeModal()} /> : null}
        {openTransactionDetails ? (
          <EditTransaction
            data={trasntionsitems}
            dataItems={dataItems}
            onClose={(e) => closeModalTransaction()}
          />
        ) : null}
      </div>
    </div>
  );
};

export default page;
