"use client";
import React from "react";
import ModalEditUser from "@/components/Admin/User/ModalEditUser";
import { useRouter } from "next/navigation";
const page = () => {
  React.useEffect(() => {
    getdata();
  }, []);
  const [data, setData] = React.useState([]);
  const getdata = async () => {
    try {
      const res = await fetch(`/api/users/table`);
      const response = await res.json();

      setData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [dataUser, setDatauser] = React.useState([]);
  const [openCreate, setopenCreate] = React.useState(false);
  const handleEdit = (row) => {
    setDatauser(row);
    setopenCreate(!openCreate);
  };

  const closeModal = () => {
    setopenCreate(!openCreate);
    getdata();
  };
  const router = useRouter()
  const topage = () =>{
    router.push('/admin/newsadmins')
  }
  return (
    <div className="p-3">
      <div>
        <div>
          <button className="primary" onClick={topage}> เพิ่ม Admin ใหม่</button>
        </div>
        <table className="min-w-full divide-y divide-gray-200 mt-5">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ชื่อ-ภาษาไทย
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ชื่อ-ภาษาอังกฤษ
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                หมายเลขวิศวกรรม
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                สมาชิกสมาคม
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((res) => {
              return (
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {res.firstname_th} {res.lastname_th}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {res.firstname_en} {res.lastname_en}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {res.engineers_card}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {res.users_type_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={(e) => handleEdit(res)}
                      className="ml-2 px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {openCreate ? (
          <ModalEditUser data={dataUser} onClose={(e) => closeModal()} />
        ) : null}
      </div>
    </div>
  );
};

export default page;
