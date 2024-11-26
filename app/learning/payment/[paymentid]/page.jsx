"use client";
import React from "react";
import { IoIosCash } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
const Payment = ({ params }) => {
  const [courseData, setcourseData] = React.useState([]);
  const [slips, setSlip] = React.useState("");
  const getData = async () => {
    try {
      const response = await fetch(
        `/api/course/payroll?foo=${params.paymentid}`
      );
      const res = await response.json();
   
      setcourseData(res.data[0]);
    } catch (error) {
      console.log(error.message);
    }
  };
  const router = useRouter();
  const updateSlip = async () => {
    try {
      const body = {
        id: params.paymentid,
        slips: slips,
      };
      const response = await fetch("/api/course/payroll", {
        method: "PUT",
        body: JSON.stringify(body),
      });
      const data = await response.json();

      Swal.fire({
        icon: "success",
        title: "สร้างข้อมูลสำเร็จ",
        showConfirmButton: true,
        confirmButtonText: "OK",
        timer: 1500,
      }).then((res) => {
        if (res.isConfirmed == true) {
          router.push(`/`);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleInputChange = async (event) => {
    const { name, value, type } = event.target;
    const file = event.target.files[0];

    // If the input is a file input, handle it differently
    const base64 = await readFileAsBase64(file);
    setSlip((prevContent) => ({
      ...prevContent,
      [name]: base64, // Store the file object
    }));
  };
  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Calculate the desired dimensions for the resized image
          const maxWidth = 800; // Set your desired max width
          const maxHeight = 600; // Set your desired max height
          let width = img.width;
          let height = img.height;

          // Maintain aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          // Set canvas dimensions
          canvas.width = width;
          canvas.height = height;

          // Draw image on canvas
          ctx.drawImage(img, 0, 0, width, height);

          // Get base64 representation of the resized image
          const base64 = canvas.toDataURL("image/jpeg"); // Change format if needed

          // Resolve with base64 string
          resolve(base64);
        };
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };
  React.useEffect(() => {
    getData();
  }, []);
  const [lannow, setLannow] = React.useState("EN"); // Default to English

  // Use useEffect to set the language from localStorage after the client has loaded
  React.useEffect(() => {
    const language = localStorage.getItem("lan") || "EN"; // Default to 'EN' if not found
    setLannow(language);
  })

  return (
    <div className="p-10 container mx-auto grid xs:grid-cols-1 md:grid-cols-2">
      <div className="col-span-2 ">
        <div className="grid md:grid-cols-6 xs:grid-cols-3">
          <div className="md:col-span-6 xs:col-span-3 flex items-center mb-5">
            <FaUserAlt className="text-[44px] text-gray-500" />
            <h2 className="font-semibold text-[28px] ml-3 text-gray-500">
              {lannow == "TH"
                ? "สรุปรายละเอียดผู้สมัครหลักสูตรการฝึกอบรม"
                : "Training Course Registration Confirmation"}{" "}
            </h2>
          </div>
          <div className="col-span-3 p-3">
            {" "}
            <input
              disabled
              placeholder="ชื่อ"
              value={courseData.firstname_th}
              className="block w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 xs:text-sm xs:leading-6"
            />{" "}
          </div>
          <div className="col-span-3 p-3">
            {" "}
            <input
              disabled
              value={courseData.lastname_th}
              placeholder="นามสกุล"
              className="block w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 xs:text-sm xs:leading-6"
            />{" "}
          </div>
          <div className="col-span-3 p-3">
            {" "}
            <input
              disabled
              value={courseData.firstname_en}
              placeholder="First Name"
              className="block w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 xs:text-sm xs:leading-6"
            />{" "}
          </div>
          <div className="col-span-3 p-3">
            {" "}
            <input
              disabled
              value={courseData.lastname_en}
              placeholder="Last Name"
              className="block w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 xs:text-sm xs:leading-6"
            />{" "}
          </div>
          <div className="xs:col-span-3 md:col-span-2 p-3">
            <input
              disabled
              value={courseData.engineers_card}
              placeholder="หมายเลขสมาชิกสภาวิศวกร"
              className="block w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 xs:text-sm xs:leading-6"
            />{" "}
          </div>
          <div className="xs:col-span-3 md:col-span-2 p-3">
            <input
              disabled
              value={courseData.jobs}
              placeholder="ตำแหน่ง"
              className="block w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 xs:text-sm xs:leading-6"
            />{" "}
          </div>
          <div className="xs:col-span-3 md:col-span-2 p-3">
            <input
              disabled
              value={courseData.department}
              placeholder="หน่วยงาน"
              className="block w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 xs:text-sm xs:leading-6"
            />{" "}
          </div>
          <div className="col-span-3 p-3">
            <input
              disabled
              value={courseData.enroll_name}
              placeholder="ช่องทางการเข้ารับการอบรม"
              className="block w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 xs:text-sm xs:leading-6"
            />{" "}
          </div>
          <div className="col-span-3 p-3">
            {courseData.enroll_type == 1 ? (
              <input
                disabled
                value={courseData.course_expensesonline + " ฿"}
                placeholder="จำนวนเงิน"
                className="block w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 xs:text-sm xs:leading-6"
              />
            ) : courseData.enroll_type === 2 ? (
              <input
                disabled
                value={courseData.course_expensesonsite + " ฿"}
                placeholder="จำนวนเงิน"
                className="block w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 xs:text-sm xs:leading-6"
              />
            ) : courseData.enroll_type === 3 ? (
              <input
                disabled
                value={courseData.role_3_expenses + " ฿"}
                placeholder="จำนวนเงิน"
                className="block w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 xs:text-sm xs:leading-6"
              />
            ):(null)}
          </div>
        </div>
      </div>
      <div className="xs:col-span-3 md:col-span-2 mt-2">
        <div className="grid grid-cols-4">
          <div className="col-span-4 flex items-center">
            <IoIosCash className="text-[44px] text-gray-500" />
            <h2 className="font-semibold text-[28px] ml-3 text-gray-500">
              {lannow == "TH" ? "ชำระเงิน" : "Payment."}
            </h2>
          </div>

          <div className="xs:col-span-4 md:col-span-2 p-5">
            <h2 className="text-[18px] text-gray-500">
              {lannow == "TH"
                ? "โอนเงินเข้าบัญชีธนาคารไทยพาณิชย์"
                : "Transfer money to Siam Commercial Bank account."}
            </h2>
            <h2 className="text-[18px] text-gray-500">
              {lannow == "TH"
                ? "ชื่อบัญชี : สมาคมทางหลวงแห่งประเทศไทย สาขาชิดลม "
                : "The name of the account: สมาคมทางหลวงแห่งประเทศไทย สาขาชิดลม"}

              <br />
              {lannow == "TH"
                ? "เลขที่บัญชี 008 2 00408 8 ประเภทบัญชีสะสมทรัพย์"
                : "Account number 008-2-00408-8, Savings Account"}
            </h2>
          </div>
          <div className="xs:col-span-4 md:col-span-2 p-5">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              {lannow == "TH"
                ? " เมื่อโอนเงินเรียบร้อยแล้ว อัพโหลดสลิป"
                : "After successfully transferring the money, upload the payment slip"}
            </label>
            <input
              className="block w-full text-sm 
              text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-100 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              name="slips"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
      </div>
      <div className="col-span-2 mt-3">
        <button
          onClick={(e) => updateSlip()}
          className=" bg-[#77A8D8] w-full p-2 text-white rounded-lg hover:bg-[#295F93] "
        >
          {lannow == "TH" ? "ยืนยันการชำระเงิน" : "Confirm Payment."}{" "}
        </button>
      </div>
    </div>
  );
};

export default Payment;
