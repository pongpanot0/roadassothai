"use client";
import React from "react";
import "./orgchart.css";
import ThaiTextComponent from "./TextBreakBySentence";
function widthCharCount(txt) {
  if (!txt) return 0;
  // Regex เพื่อกรองเฉพาะตัวอักษรที่ไม่ใช่สระลอย (ไทย)
  const thaiFullWidthCharRegex = /[^\u0E31\u0E34-\u0E3E\u0E47-\u0E4E]/g;
  return (txt.match(thaiFullWidthCharRegex) || []).length;
}

function wrapThaiText(segThaiTxt, maxLength, linebreak = "\n") {
  const words = segThaiTxt.split("|"); // แยกคำด้วย "|"
  let txt = "";
  let line = "";
  let linewlength = 0;

  for (let i = 0; i < words.length; i++) {
    const wlen = widthCharCount(words[i]); // นับความยาวของคำ

    if (linewlength + wlen <= maxLength) {
      line += words[i]; // ต่อคำในบรรทัดปัจจุบัน
      linewlength += wlen;
    } else {
      txt += line + linebreak; // บันทึกบรรทัดปัจจุบันพร้อมขึ้นบรรทัดใหม่
      line = words[i]; // เริ่มคำใหม่ในบรรทัดใหม่
      linewlength = wlen;
    }
  }

  if (linewlength > 0) {
    txt += line; // เพิ่มบรรทัดสุดท้าย
  }

  return txt;
}
export default async function about() {
  const [data, setData] = React.useState([]);
  const [objective, setobjective] = React.useState([]);
  const [employees, setemployees] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(`/api/about`, {
        method: "GET",
      });
      const data = await response.json();
      setobjective(data.objective);
      setData(data.data);
      setemployees(data.employees);
    } catch (error) {
      // Handle any errors that occur during the process
      throw error;
    }
  };
  const [lannow, setLannow] = React.useState("EN"); // Default to English

  // Use useEffect to set the language from localStorage after the client has loaded
  React.useEffect(() => {
    const language = localStorage.getItem("lan") || "EN"; // Default to 'EN' if not found
    setLannow(language);
  });
  const groupEmployeesByLevel = (employees) => {
    const levels = {};

    employees.forEach((employee) => {
      const { level } = employee;

      // Initialize the array for each level if it doesn't exist
      if (!levels[level]) {
        levels[level] = [];
      }

      // Add the employee to their respective level
      levels[level].push(employee);
    });

    return levels;
  };
  const renderRowsByLevel = (employees, level) => {
    const rows = [];
    const employeeList = employees[level] || [];

    // Split employees into rows of 3
    for (let i = 0; i < employeeList.length; i += 3) {
      rows.push(employeeList.slice(i, i + 3));
    }
    return rows.map((row, index) => (
      <div className="level" key={`level-${level}-row-${index}`}>
        {row.map((employee) => (
          <div className="position" key={employee.employee_id}>
            <img
              src={
                employee.employees_pic ||
                "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png"
              }
              alt={employee.employees_job}
            />
            <p>
              {lannow === "TH" ? (
                <>
                  {employee.employees_prefix} {employee.employees_firstname}{" "}
                  {employee.employees_lastname}
                  <br />
                  {employee.employees_job}
                </>
              ) : (
                <>
                  {employee.employees_prefix_en}{" "}
                  {employee.employees_firstname_en ??
                    employee.employees_firstname}{" "}
                  {employee.employees_lastname_en ??
                    employee.employees_lastname}
                  <br />
                  {employee.employees_job_en ?? employee.employees_job}
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    ));
  };
  const renderPositionsByLevel = (employees) => {
    const levels = groupEmployeesByLevel(employees);

    // Sort levels in ascending order (level 1, 2, 3, etc.)
    const sortedLevels = Object.keys(levels).sort((a, b) => a - b);

    return (
      <div className="org-chart">
        {sortedLevels.map((level) => (
          <div className="level" key={`level-${level}`}>
            {renderRowsByLevel(levels, level)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="px-5">
      <div className="grid grid-cols-5">
        <div className="col-span-5  text-center">
          <h2 className=" text-[32px] text-gray-800 mt-10">
            {lannow == "TH"
              ? "ประวัติสมาคมทางหลวงแห่งประเทศไทย"
              : "History Of Roads Association of Thailand"}
          </h2>
        </div>
        <div className="col-span-1 xs:hidden md:block"></div>
        <div className="md:col-span-3 xs:col-span-5 col-span-5 px-2 mt-5 text-justify">
          <ThaiTextComponent lannow={lannow} data={data} />
        </div>
        <div className="col-span-1  xs:hidden md:block"></div>
        <div className="col-span-5 text-center">
          <h2 className=" text-[32px] text-gray-800 mt-10">
            {lannow == "TH" ? <>วัตถุประสงค์</> : <>Objective</>}
          </h2>
        </div>
        <div className="col-span-0 md:col-span-1  xs:hidden md:block"></div>
        <div className="md:col-span-3 xs:col-span-5 col-span-5 p-3 md:p-0 regular-16 flex items-center mt-10 justify-center">
          <ul className=" list-decimal">
            {lannow == "TH" ? (
              <>
                {" "}
                {objective.map((res, index) => {
                  return (
                    <li key={index}>
                      {res.employees_prefix} {res.objective_name}
                    </li>
                  );
                })}
              </>
            ) : (
              <>
                {" "}
                {objective.map((res, index) => {
                  // Check if objective_name_en is not null before rendering
                  if (res.objective_name_en !== null) {
                    return (
                      <li key={index}>
                        {res.employees_prefix_en} {res.objective_name_en}
                      </li>
                    );
                  }
                  return null; // Return null for ignored items
                })}
              </>
            )}
          </ul>
        </div>
        <div className=" xs:hidden md:block col-span-1"></div>
        <div className="col-span-5 text-center">
          <h2 className=" text-[32px] text-gray-800 mt-10">
            {lannow == "TH" ? (
              <>คณะกรรมการบริหารชุดประจําปี พ.ศ. 2567-2569</>
            ) : (
              <>Committee and Staff 2024 - 2026</>
            )}
          </h2>
        </div>
        <div className=" xs:hidden md:block col-span-1"></div>
        <div className="md:col-span-5 xs:col-span-5 mt-3">
          <div className="org-chart">{renderPositionsByLevel(employees)}</div>
        </div>
        <div className="col-span-1"></div>
      </div>
    </div>
  );
}
