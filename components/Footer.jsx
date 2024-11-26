"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation"; // Import useRouter hook
const Footer = () => {
  const router = usePathname(); // Get the current route

  const user = router.split("/")[1];
  const [lannow, setLannow] = React.useState("EN"); // Default to English

  // Use useEffect to set the language from localStorage after the client has loaded
  React.useEffect(() => {
    const language = localStorage.getItem("lan") || "EN"; // Default to 'EN' if not found
    setLannow(language);
  });

  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const respose = await fetch("/api/contact");
      const data = await respose.json();

      setData(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {user === "user" || user == "admin" ? (
        <div></div>
      ) : (
        <div>
          <footer className="flexCenter mt-5 mb-24 w-full">
            <div className="padding-container max-container p-10 md:p-0 flex w-full flex-col gap-14">
              <div className="border  bg-gray-20" />
              <div className="justify-center grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-1 xs:grid-cols-1 xs:px-3">
                <div>
                  <div className="text-[20px] md:text-[24px]">
                    {lannow == "TH"
                      ? "สมาคมทางหลวงแห่งประเทศไทย"
                      : "Roads Association of Thailand "}{" "}
                  </div>
                  <div className="text-[10px] md:text-[14px] text-justify xs:mt-5 sm:mt-5 md:mt-0 whitespace-pre">
                    {lannow == "TH" ? (
                      <>{data.contact_th}</>
                    ) : (
                      <>{data.contact_en}</>
                    )}
                  </div>
                </div>
                <div>
                  {lannow == "TH" ? (
                    <>
                      <div className="text-[20px] md:text-[28px] text-start">
                        สมาพันธ์ในประเทศ
                      </div>
                      <ul className="mt-2 mx-5 list-disc text-[14px] text-start">
                        <li className="mx-5">
                          <a href="https://hwpd.go.th/">
                            กองบังคับการตำรวจทางหลวง
                          </a>
                        </li>
                        <li className="mx-5 ">
                          <a href="https://www.doh.go.th/">กรมทางหลวง</a>
                        </li>
                        <li className="mx-5 ">
                          <a href="https://drr.go.th/">กรมทางหลวงชนบท</a>
                        </li>
                        <li className="mx-5 ">
                          <a href="https://www.exat.co.th/Exat-Home/">
                            การทางพิเศษแห่งประเทศไทย
                          </a>
                        </li>
                        <li className="mx-5 ">
                          <a href="https://www.exat.co.th/Exat-Home/">
                            สำนักการจราจรและขนส่ง
                          </a>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <div className="text-[20px] md:text-[28px] text-start">
                        Association in Thailand
                      </div>
                      <ul className="mt-2 mx-5 list-disc text-[14px] text-start">
                        <li className="mx-5 ">Highway Police Division</li>
                        <li className="mx-5 ">Department of Highways</li>
                        <li className="mx-5 ">Department of Rural Roads</li>
                        <li className="mx-5 ">
                          Expressway Authority of Thailand
                        </li>
                        <li className="mx-5 ">Department of Land Transport</li>
                      </ul>
                    </>
                  )}{" "}
                </div>
                <div>
                  <div className="text-[20px] md:text-[28px] text-start">
                    {lannow == "TH"
                      ? "สมาพันธ์ต่างประเทศ"
                      : "Associations Abroad "}{" "}
                  </div>
                  <ul className="mt-2 mx-5 list-disc text-[14px] text-start">
                    <li className="mx-5 ">
                      <a href="https://www.piarc.org/en">PIARC</a>
                    </li>
                    <li className="mx-5 ">
                      <a href="https://www.irf.global/">IRF</a>
                    </li>
                    <li className="mx-5 ">
                      <a href="https://www.reaaa.net/">REAAA </a>{" "}
                    </li>
                  </ul>
                </div>
              </div>
              <p className="regular-14 w-full text-center text-gray-30 xs:px-4 sm:px-4 xs:mt-5 sm:mt-5 xs:w-4/5 xs:whitespace-pre-wrap sm:w-full">
          
                2024{" "}
                {lannow == "TH"
                  ? "สมาคมทางหลวงแห่งประเทศไทย"
                  : "Roads Association of Thailand"}{" "}
                | All rights reserved
              </p>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default Footer;
