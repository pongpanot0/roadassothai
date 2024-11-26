"use client";
import React from "react";

const page = () => {
  React.useEffect(() => {
    getData();
  }, []);
  const [data, setData] = React.useState({
    contact_th: "",
    contact_en: "",
    contact_map: null,
  });
  const getData = async () => {
    try {
      const respose = await fetch("/api/contact");
      const data = await respose.json();

      setData(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const [lannow, setLannow] = React.useState("EN"); // Default to English

  // Use useEffect to set the language from localStorage after the client has loaded
  React.useEffect(() => {
    const language = localStorage.getItem("lan") || "EN"; // Default to 'EN' if not found
    setLannow(language);
  });
  const formatContactInfo = (text) => {
    return text
      .replace(/(โทร:|Tel:)/g, "\n$1")
      .replace(/(แฟกซ์:|Fax:)/g, "\n$1")
      .replace(/(Email:)/g, "\n$1")
      .replace(/(Facebook:)/g, "\n$1");
  };
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 mx-auto container">
      <img src={data.contact_map} className="mt-3" alt="" />
      <div className="md:px-0 sm:px-5 xs:px-5">
        <h2 className="text-[28px]  whitespace-break-spaces">
          {lannow == "TH"
            ? "สมาคมทางหลวงแห่งประเทศไทย"
            : "Roads Association of Thailand"}{" "}
        </h2>
        <div className="whitespace-pre-line">
        {lannow === "TH" ? (
          <>{formatContactInfo(data.contact_th)}</>
        ) : (
          <>{formatContactInfo(data.contact_en)}</>
        )}
        </div>
      </div>
    </div>
  );
};

export default page;
