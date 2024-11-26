"use client";
import React from "react";
import dynamic from "next/dynamic";

const EditEmployees = dynamic(
  () => import("@/components/Admin/About/Modal/EditEmployees"),
  { ssr: false }
);
const EditEmployeesPic = dynamic(
  () => import("@/components/Admin/About/Modal/EditEmployeesPic"),
  { ssr: false }
);
const Edithistory = dynamic(
  () => import("@/components/Admin/About/Edithistory"),
  { ssr: false }
);
const Editobjective = dynamic(
  () => import("@/components/Admin/About/Editobjective"),
  { ssr: false }
);

import Swal from "sweetalert2";
function page() {
  const [modal, setModal] = React.useState(false);
  const [modalemployee, setmodalemployees] = React.useState(false);
  const [values, setvalues] = React.useState([]);
  const closeUpdate = () => {
    setModal(false);
    getData();
  };
  const openupdate = (data) => {
    setmodalemployees(!modalemployee);
    setvalues(data);
  };
  const closeupdateemployees = (data) => {
    setmodalemployees(!modalemployee);
    getData();
  };
  const [employees, setEmployees] = React.useState([]);
  React.useEffect(() => {
    getData();
  }, []);
  const deleteData = async (values) => {
    try {
      if (values.isdisbled == 0) {
        const data = {
          employees_id: values.employees_id,
          isdisbled: 1,
        };
        const res = await fetch(`/api/about`, {
          method: "DELETE",
          body: JSON.stringify(data),
        });
        const response = await res.json();
        if (response) {
          Swal.fire({
            icon: "success",
            title: "ลบข้อมูลสำเร็จ",
            showConfirmButton: true,
            timer: 1500,
          }).then((response) => {
            if (response.isConfirmed == true) {
              getData();
            }
          });
        }
      } else {
        const data = {
          employees_id: values.employees_id,
          isdisbled: 0,
        };
        const res = await fetch(`/api/about`, {
          method: "DELETE",
          body: JSON.stringify(data),
        });
        const response = await res.json();
        if (response) {
          Swal.fire({
            icon: "success",
            title: "เปิดข้อมูลสำเร็จ",
            showConfirmButton: true,
            timer: 1500,
          }).then((response) => {
            if (response.isConfirmed == true) {
              getData();
            }
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const [data, setData] = React.useState({
    about_detail: "",
    about_detail_en: "",
  });
  const [objective, setObjective] = React.useState([
    {
      objective_id: "",
      objective_name: "",
      objective_name_en: "",
    },
  ]);

  const handleInputChangeobjective = (index, event, field) => {
    const newObjectives = [...objective];
    newObjectives[index][field] = event.target.value;
    setObjective(newObjectives);
  };

  const handleAddObjective = () => {
    setObjective([
      ...objective,
      {
        objective_id: "",
        objective_name: "",
        objective_name_en: "",
      },
    ]);
  };

  const getData = async () => {
    try {
      const get = await fetch("/api/about");
      const response = await get.json();
      setData(response.data[0]);
      setEmployees(response.employees);
      setObjective(response.objective);
    } catch (error) {
      console.log(error);
    }
  };

  const [datashow, setdatashow] = React.useState(1);
  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    setData((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };
  const updateobjective = async () => {
    try {
      const reponse = await fetch("/api/about", {
        method: "PATCH",
        body: JSON.stringify(objective),
      });
      Swal.fire({
        icon: "success",
        title: "อัพเดทข้อมูลสำเร็จ",
        showConfirmButton: true,
        timer: 1500,
      }).then((response) => {
        if (response.isConfirmed == true) {
          getData();
        }
      });
    } catch (error) {}
  };
  const updateAbout = async () => {
    try {
      const reponse = await fetch("/api/about", {
        method: "PUT",
        body: JSON.stringify(data),
      });
      Swal.fire({
        icon: "success",
        title: "อัพเดทข้อมูลสำเร็จ",
        showConfirmButton: true,
        timer: 1500,
      }).then((response) => {
        if (response.isConfirmed == true) {
          getData();
        }
      });
    } catch (error) {}
  };
  return (
    <div className="grid grid-cols-1">
      <div className="col-span-1  flex justify-end gap-5">
        <button className="primary" onClick={(e) => setdatashow(2)}>
          โชว์ข้อมูลรายละเอียด ประวัติ
        </button>
        <button className="primary" onClick={(e) => setdatashow(3)}>
          โชว์ข้อมูลรายละเอียด วัตถุประสงค์
        </button>
        <button className="primary" onClick={(e) => setdatashow(1)}>
          โชว์ข้อมูลรายละเอียด พนักงาน
        </button>
      </div>
      {datashow == 1 ? (
        <div className=" col-span-1 mt-2">
          <button className="primary" onClick={(e) => setModal(!modal)}>
            เพิ่มข้อมูลพนักงาน
          </button>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ชื่อภาษาไทย
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ชื่อภาษาอังกฤษ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ตำแหน่งภาษาไทย
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ตำแหน่งภาษาอังกฤษ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((res) => {
                return (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {res.employees_prefix} {res.employees_firstname}{" "}
                      {res.employees_lastname}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {res.employees_prefix_en} {res.employees_firstname_en}{" "}
                      {res.employees_lastname_en}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {" "}
                      {res.employees_job}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {res.employees_job_en}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-5">
                      <button
                        onClick={(e) => openupdate(res)}
                        className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                      >
                        Edit
                      </button>
                      {res.isdisbled == 1 ? (
                        <button
                          onClick={(e) => deleteData(res)}
                          className="px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                        >
                          Enabled
                        </button>
                      ) : (
                        <button
                          onClick={(e) => deleteData(res)}
                          className="px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                        >
                          Deleted
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {modal ? <EditEmployees onClose={(e) => closeUpdate()} /> : null}
          {modalemployee ? (
            <EditEmployeesPic
              data={values}
              onClose={(e) => closeupdateemployees()}
            />
          ) : null}
        </div>
      ) : null}

      {datashow == 2 ? (
        <div className=" col-span-1 mt-2 grid grid-cols-2 gap-5">
          <div className="col-span-2 flex justify-end">
            <button className="primary" onClick={(e) => updateAbout()}>
              อัพเดทข้อมูล
            </button>
          </div>

          <div>
            <textarea
              className="inputClass"
              rows={25}
              name="about_detail"
              onChange={handleInputChange}
              value={data.about_detail}
            ></textarea>
          </div>

          <div>
            <textarea
              className="inputClass"
              name="about_detail_en"
              rows={25}
              onChange={handleInputChange}
              value={data.about_detail_en}
            ></textarea>
          </div>
          {modal ? <EditEmployees onClose={(e) => closeUpdate()} /> : null}
        </div>
      ) : null}

      {datashow == 3 ? (
        <div className=" col-span-1 mt-2 grid grid-cols-2 gap-5">
          <div className="col-span-2 flex justify-end">
            <button className="primary" onClick={(e) => updateobjective()}>
              อัพเดทข้อมูล
            </button>
          </div>
          <div className="col-span-2 ">
            <h2 className="text-[28px]">ข้อมูลวัตถุประสงค์</h2>
          </div>
          {objective.map((res, index) => {
            return (
              <>
                <div>
                  <input
                    onChange={(e) =>
                      handleInputChangeobjective(index, e, "objective_name")
                    }
                    value={res.objective_name}
                    className="inputClass"
                  />
                </div>
                <div>
                  {" "}
                  <input
                    onChange={(e) =>
                      handleInputChangeobjective(index, e, "objective_name_en")
                    }
                    value={res.objective_name_en}
                    className="inputClass"
                  />
                </div>
              </>
            );
          })}

          {modal ? <EditEmployees onClose={(e) => closeUpdate()} /> : null}
        </div>
      ) : null}
    </div>
  );
}

export default page;
