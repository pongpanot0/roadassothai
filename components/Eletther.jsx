"use client";
import Link from "next/link";
import React, { useState,useMemo } from "react";
import { FaNewspaper } from "react-icons/fa6";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const Eletther = () => {
  const [data, setData] = React.useState([]);
  const getData = async () => {
    try {
      const response = await fetch("/api/eletter", {
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
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
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
  const options = useMemo(() => ({
    cMapUrl: "cmaps/",
    cMapPacked: true,
  }), []);

  const groupedData = data.reduce((acc, res) => {
    const date = new Date(res.create_date);

    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(res);
    return acc;
  }, {});
  const [width, setWidth] = useState(300); // Default width
  const updateDimensions = () => {
    const containerWidth = window.innerWidth * 0.9; // Adjust to 90% of viewport width
    setWidth(containerWidth > 700 ? 700 : containerWidth); // Limit max width to 700px
  };
  return (
    <div className="px-5 max-container padding-container ">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div className="col-span-1 text-start  rounded-lg flex justify-center items-center">
          {data && data[0]?.eletter_pdf ? (
            <Document
              file={`http://roadassothai.com${data[0].eletter_pdf}`}
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
                width={300}
          
              />
            </Document>
          ) : (
            <div>Loading...</div> // Show a loading message or spinner
          )}
        </div>
        <div className="col-span-1">
          <p className="text-center mt-2 text-[28px] flex items-center align-middle justify-center">
            RATh e-Newsletter
          </p>
          <ul className="mt-8 mx-auto text-left font-medium text-lg leading-none border-orange-50 divide-y divide-orange-200">
            {Object.keys(groupedData)
              .sort((a, b) => b - a)
              .flat() // Flatten to a single array of items
              .slice(0, 12) // Limit to top 12 items
              .map((year, yearIndex) => (
                <React.Fragment key={year}>
                  
                  {groupedData[year].map((res, resIndex) => (
                    <li key={res.eletter_id}>
                      <Link
                        className="py-3.5 w-full flex items-center regular-16 text-gray-500 hover:text-orange-700 hover:bg-blue-100"
                        href={`/eletter/${res.eletter_id}`}
                      >
                        <span className="ml-5 mr-2.5 w-1 h-7 bg-orange-500 rounded-r-md"></span>
                        {res.eletter_name}

                        {/* Display "new" for the first item */}
                        {yearIndex === 0 && resIndex === 0 && (
                          <span className="ml-2 text-red-500 font-bold">
                            (New)
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </React.Fragment>
              ))}
          </ul>
          <Link href="/eletter">
            <button className="primary w-full">เพิ่มเติม</button>
          </Link>
        </div>
        <div className=" col-span-1 text-center"></div>
      </div>
    </div>
  );
};

export default Eletther;
