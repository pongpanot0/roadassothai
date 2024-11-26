"use client";
import React, { useState, useEffect, useRef } from "react";
import { pdfjs } from "react-pdf";
import dynamic from "next/dynamic";
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from "react-icons/fa";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// Import HTMLFlipBook dynamically for client-side use only
const HTMLFlipBook = dynamic(() => import("react-pageflip"), {
  ssr: false,
  loading: () => <p>Loading flipbook...</p>,
});

export default function Eletter({ params }) {
  const [data, setData] = useState([]);
  const [numPages, setNumPages] = useState(0);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const flipBookRef = useRef(null);

  const getData = async () => {
    try {
      const response = await fetch(`/api/eletter/byid?foo=${params.id}`, {
        method: "GET",
      });
      const res = await response.json();
      setData(res.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderPdfPages = async (pdfUrl) => {
    try {
      const pdf = await pdfjs.getDocument(pdfUrl).promise;
      const pageImages = [];
      const scale = 1.5;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;
        pageImages.push(canvas.toDataURL("image/png"));
      }

      setPages(pageImages);
      setNumPages(pdf.numPages);
      setLoading(false);
    } catch (error) {
      console.error("Error rendering PDF pages:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data.length > 0 && data[0].eletter_pdf) {
      renderPdfPages(`http://roadassothai.com${data[0].eletter_pdf}`);
    }
  }, [data]);

  const goToFirstPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flip(0);
      setCurrentPage(1);
    }
  };

  const goToLastPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flip(numPages - 1);
      setCurrentPage(numPages);
    }
  };

  const goToNextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
      setCurrentPage((prev) => Math.min(prev + 1, numPages));
    }
  };

  const goToPreviousPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-900"></div>
          <p className="mt-2 text-gray-700">กำลังโหลด รอสักครู่...</p>
        </div>
      ) : pages.length > 0 ? (
        <>
          <div className="relative flex items-center mb-4 bg-gray-800 p-5 rounded-lg">
            <div className="flex justify-center items-center w-full">
           {/*    <button
                onClick={goToFirstPage}
                disabled={currentPage === 1}
                className="text-white mx-2"
              >
                <FaAngleDoubleLeft />
              </button>
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="text-white mx-2"
              >
                <FaAngleLeft />
              </button> */}
              <span className="text-white mx-2">
                {currentPage} / {numPages}
              </span>
         {/*      <button
                onClick={goToNextPage}
                disabled={currentPage === numPages}
                className="text-white mx-2"
              >
                <FaAngleRight />
              </button>
              <button
                onClick={goToLastPage}
                disabled={currentPage === numPages}
                className="text-white mx-2"
              >
                <FaAngleDoubleRight />
              </button> */}
            </div>

            <div className="absolute right-0 mr-5">
              <a
                href={`http://roadassothai.com${data[0]?.eletter_pdf}`}
                download
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Download PDF
              </a>
            </div>
          </div>

          <HTMLFlipBook
            width={550}
            height={733}
         
            className="mt-4 mx-auto"
            ref={flipBookRef}
            onFlip={(e) => setCurrentPage(e.data + 1)}
          >
            {pages.map((page, index) => (
              <div key={index} className="page">
                <img
                  src={'/api/'+page}
                  alt={`Page ${index + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </HTMLFlipBook>
        </>
      ) : (
        <p className="text-center mt-4">No pages to display.</p>
      )}
    </div>
  );
}
