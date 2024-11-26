"use client";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { FaNewspaper } from "react-icons/fa6";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const page = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    getData();
  }, []);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1); // start on first page
  const [loading, setLoading] = useState(true);
  const [pageWidth, setPageWidth] = useState(0);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  function onPageLoadSuccess() {
    setPageWidth(window.innerWidth);
    setLoading(false);
  }
  const options = useMemo(
    () => ({
      cMapUrl: "cmaps/",
      cMapPacked: true,
    }),
    []
  );
  const getData = async () => {
    try {
      const res = await fetch("/api/eletter", {
        method: "GET",
      });
      const data = await res.json();
     

      setData(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [lannow, setLannow] = React.useState("EN"); // Default to English

  // Use useEffect to set the language from localStorage after the client has loaded
  React.useEffect(() => {
    const language = localStorage.getItem("lan") || "EN"; // Default to 'EN' if not found
    setLannow(language);
  });

  return (
    <div className="max-container padding-container grid grid-cols-3 mt-10">
      <div className="relative col-span-3 text-center">
        <ul className="grid grid-cols-1 xl:grid-cols-3 gap-20 gap-x-6 items-start p-8">
          {data.map((item, index) => (
            <li
              key={item.eletter_id}
              className="relative flex flex-col sm:flex-row xl:flex-col items-center"
            >
              <div className="order-1 sm:ml-6 xl:ml-0">
                <h3 className="mb-1 text-slate-900 font-semibold dark:text-slate-200">
                  <span className="mb-1 block text-xl leading-6 text-indigo-500">
                    {lannow == "TH" ? (
                      <> {item.eletter_name}</>
                    ) : (
                      <> {item.eletter_name_en}</>
                    )}{" "}
                  </span>
                  {lannow == "TH" ? (
                    <> จำนวนการเข้าชม : {item.eletter_view ?? 0}</>
                  ) : (
                    <> Viewer : {item.eletter_view ?? 0}</>
                  )}{" "}
                </h3>
                <a
                  className="group inline-flex items-center text-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mt-6"
                  href={`/eletter/${item.eletter_id}`}
                >
                  {lannow == "TH" ? <>อ่านเพิ่มเติม</> : <>Read more</>}
                  <svg
                    className="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400 dark:text-slate-500 dark:group-hover:text-slate-400"
                    width="3"
                    height="6"
                    viewBox="0 0 3 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M0 0L3 3L0 6"></path>
                  </svg>
                </a>
              </div>

              {data && item.eletter_pdf ? (
                <Document
                  file={`http://roadassothai.com${item.eletter_pdf}`}
                  onLoadSuccess={onDocumentLoadSuccess}
                  options={options}
                  renderMode="canvas"
                  className="w-max"
                >
                  <Page
                    className="w-max"
                    key={pageNumber}
                    pageNumber={pageNumber}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    onLoadSuccess={onPageLoadSuccess}
                    onRenderError={() => setLoading(false)}
                    width={200}
                    height={150}
                  />
                </Document>
              ) : (
                <div>Loading PDF...</div> // Display fallback if PDF is not available
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default page;
