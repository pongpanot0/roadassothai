"use client";
import Image from "next/image";
import Button from "./Button";
import "animate.css";
import React from "react";
const Hero = () => {
  React.useEffect(() => {
    getData();
  }, []);

  const [values, setValues] = React.useState<
    {
      homepage_detail?: string;
      homepage_detail_en?: string;
      homepage_pic: string;
    }[]
  >([]);
  const [loading, setLoading] = React.useState(true);
  const getData = async () => {
    try {
      const response = await fetch("/api/homepage");
      const data = await response.json();

      setValues(data.data);
      setLoading(true);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const [lannow, setLannow] = React.useState("EN"); // Default to English

  // Use useEffect to set the language from localStorage after the client has loaded
  React.useEffect(() => {
    const language = localStorage.getItem("lan") || "EN"; // Default to 'EN' if not found
    setLannow(language);
  }, []); // This ensures the effect runs once after the component mounts
  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
      {lannow == "TH" ? (
        <>
          <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
            <h1 className="bold-40 lg:bold-60 p-2 md:p-0 animate__animated animate__fadeIn animate__faster">
              ยินดีต้อนรับสู่ <br></br>เว็บไซต์สมาคมทางหลวงแห่งประเทศไทย
            </h1>
            <p className="text-ellipsis tracking-tight text-justify p-2 md:p-0  regular-16 mt-6 text-gray-30 xl:max-w-[620px]">
              <span>{values[0]?.homepage_detail ?? ""}</span>
            </p>
          </div>

          <div className="relative flex flex-1 items-start">
            {values && values[0]?.homepage_pic ? (
              <img
                alt="Map"
                className="transition duration-300  ease-in-out hover:scale-110"
                src={values[0]?.homepage_pic}
              />
            ) : null}
          </div>
        </>
      ) : (
        <>
          <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
            <h1 className="bold-40 p-2 md:p-0 lg:bold-60 animate__animated animate__fadeIn animate__faster">
              Welcome to <br></br>the website of Roads Association of Thailand.
            </h1>
            <p className="text-ellipsis tracking-tight text-justify p-2 md:p-0  regular-16 mt-6 text-gray-30 xl:max-w-[620px]">
              <span>{values[0]?.homepage_detail_en ?? ""}</span>
            </p>
          </div>

          <div className="relative flex flex-1 items-start">
            {values && values[0]?.homepage_pic ? (
              <img
                alt="Map"
                className="transition duration-300 ease-in-out hover:scale-110"
                src={values[0]?.homepage_pic}
              />
            ) : null}
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;
