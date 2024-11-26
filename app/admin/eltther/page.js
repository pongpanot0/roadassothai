"use client";
import React from "react";
import InsertEltter from "@/components/Admin/eletter/InsertEltter";
import EditEltter from "@/components/Admin/eletter/editeltter";
import Swal from "sweetalert2";
const page = () => {
  const [openCreate, setopenCreate] = React.useState(false);
  const [openEdit, setopenEdit] = React.useState(false);
  const [EletterData, setEletterData] = React.useState({
    eletter_id: "",
    eletter_name: "",
    eletter_pdf: "",
  });

  const openModalEdit = async (data) => {
    setEletterData(data);
    setopenEdit(!openEdit);
  };
  const closeModal = async () => {
    setopenCreate(!openCreate);
    getData();
  };
  const closeModalEdit = async () => {
    setopenEdit(!openEdit);
    getData();
  };
  const [data, setData] = React.useState([]);
  const getData = async () => {
    try {
      const response = await fetch("/api/eletter/admin", {
        method: "GET",
      });
      const res = await response.json();
      setData(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  React.useEffect(() => {
    getData();
  }, []);
  function moveUp(index) {
    const newData = [...data];
    if (index > 0) {
      // Swap display_order of the current item with the previous item
      [newData[index].display_order, newData[index - 1].display_order] = [
        newData[index - 1].display_order,
        newData[index].display_order,
      ];
      setData(newData);
      updateOrder(newData[index]);
      updateOrder(newData[index - 1]);
    }
  }

  function moveDown(index) {
    const newData = [...data];
    if (index < newData.length - 1) {
      // Swap display_order of the current item with the next item
      [newData[index].display_order, newData[index + 1].display_order] = [
        newData[index + 1].display_order,
        newData[index].display_order,
      ];
      setData(newData);
      updateOrder(newData[index]);
      updateOrder(newData[index + 1]);
    }
  }
  const updateOrder = async (index) => {
    try {
      const response = await fetch("/api/eletter/admin", {
        method: "PUT",
        body: JSON.stringify(index),
      });
      const res = await response.json();

      getData();
    } catch (error) {
      console.log(error.message);
    }
  };
  const toggleDisable = async (eletter) => {
    const newStatus = eletter.is_disbled === 0 ? 1 : 0;

    try {
      // Send a request to update the is_disabled status
      const response = await fetch(`/api/eletter/admin`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_disbled: newStatus,
          eletter_id: eletter.eletter_id,
        }),
      });

      if (response.ok) {
        getData();
      } else {
        console.error("Failed to update is_disabled status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const HardDeleted = async (id) => {
    try {
      // Open SweetAlert2 confirmation dialog
      const result = await Swal.fire({
        title: "ยืนยันการลบ?",
        text: "จะเป็นการลบข้อมูลฐาวร",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });
  
      // Check if the user confirmed the action
      if (result.isConfirmed) {
        const res = await fetch("/api/eletter/admin", {
          method: "DELETE",
          body:id
        });
  
     
  
        // Show success message
        await Swal.fire({
          title: "Deleted!",
          text: "The record has been successfully deleted.",
          icon: "success",
        }).then(()=>{
          getData()
        })
      }
    } catch (error) {
      console.error("Error:", error.message);
  
      // Show error message
      await Swal.fire({
        title: "Error",
        text: "Something went wrong while deleting the record.",
        icon: "error",
      });
    }
  };
  return (
    <div className="container mx-auto">
      <div className="flex items-end justify-end">
        <button className="primary" onClick={(e) => setopenCreate(!openCreate)}>
          เพิ่มข้อมูล E-letter
        </button>
      </div>
      <div>
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ชื่อ E-letter
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ชื่อ E-letter ภาษาอังกฤษ
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                จำนวนการดู
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                แก้ไขข้อมูล
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                จัดลำดับ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data
              .sort((a, b) => a.display_order - b.display_order)
              .map((res, index) => (
                <tr key={res.eletter_id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {res.eletter_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {res.eletter_name_en}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {res.eletter_view}
                  </td>
                  <td className="px-6 flex  gap-5 whitespace-nowrap">
                    <button
                      onClick={() => toggleDisable(res)}
                      className={`${
                        res.is_disbled == 0 ? "danger" : "primary"
                      }  mr-2`}
                    >
                      {res.is_disbled == 0 ? "ลบข้อมูล" : "เปิดข้อมูล"}
                    </button>
                    <button
                      onClick={() => openModalEdit(res)}
                      className="primary"
                    >
                      แก้ไขข้อมูล
                    </button>
                    <button
                      onClick={() => HardDeleted(res.eletter_id)}
                      className="danger"
                    >
                      ลบถาวร
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className="mr-2 primary"
                    >
                      ⬆️
                    </button>
                    <button
                      className="primary"
                      onClick={() => moveDown(index)}
                      disabled={index === data.length - 1}
                    >
                      ⬇️
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {openCreate ? <InsertEltter onClose={(e) => closeModal()} /> : null}
      {openEdit ? (
        <EditEltter onClose={(e) => closeModalEdit()} data={EletterData} />
      ) : null}
    </div>
  );
};

export default page;
