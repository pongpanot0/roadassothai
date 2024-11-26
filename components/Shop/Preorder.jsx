import React from "react";
import EditPreorder from "@/components/Shop/EditPreorder";
import dayjs from "dayjs";
const Preorder = () => {
  const [shopdata, setShopdata] = React.useState([]);
  React.useEffect(() => {
    getshopdata();
  });
  const getshopdata = async () => {
    try {
      const res = await fetch(`/api/shop/preorder`);
      const response = await res.json();

      setShopdata(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [openTransactionDetails, setTransactionDetails] = React.useState(false);

  const [trasntionsitems, settransationsItems] = React.useState({});
  const openeditTransaction = async (data) => {
    setTransactionDetails(!openTransactionDetails);
    settransationsItems(data);
    getitems(data);
  };
  const [dataItems, seyDataitems] = React.useState([]);
  const getitems = async (value) => {
    try {
      const response = await fetch(
        `/api/shop/transaction/byid?foo=${value.shop_transaction_id}`
      );
      const dataitems = await response.json();

      seyDataitems(dataitems.data);
    } catch (error) {

    }
  };
  const closeModalTransaction = () => {
    getshopdata();
    setTransactionDetails(!openTransactionDetails);
  };
  return (
    <div>
      {" "}
      <table className="min-w-full divide-y divide-gray-200 ">
        {/* Table for product == 2 */}
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ผู้รับ
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              เบอร์โทรศัพท์
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              วันที่สั่งซื้อ
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ประเภทสินค้า
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              การติดต่อกลับ
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
              <td className="px-6 py-4 whitespace-nowrap">{res.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {" "}
                {dayjs(res.created_at).format("YYYY-MM-DD HH:mm")}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                {res.is_preorder == 0 ? (
                  <p className="text-green-500">สินค้าปกติ</p>
                ) : (
                  <p className="text-orange-500">สินค้า Pre Order</p>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {res.call_back == 1 ? (
                  <p className=" text-green-500">ติดต่อกลับแล้ว</p>
                ) : (
                  <font className=" text-red-800">ยังไม่ได้ติดต่อกลับ</font>
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
      {openTransactionDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <EditPreorder
              data={trasntionsitems}
              dataItems={dataItems}
              onClose={(e) => closeModalTransaction()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Preorder;
