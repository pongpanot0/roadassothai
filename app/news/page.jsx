"use client";
import React from "react";

const News = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const res = await fetch("/api/news", {
        method: "GET",
      });
      const data = await res.json();

      setData(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const defaultImage =
    "https://www.rama.mahidol.ac.th/sdmc/sites/default/files/default_images/Default-NoPicture.jpg";
    const [lannow, setLannow] = React.useState("EN"); // Default to English

    // Use useEffect to set the language from localStorage after the client has loaded
    React.useEffect(() => {
      const language = localStorage.getItem("lan") || "EN"; // Default to 'EN' if not found
      setLannow(language);
    })
  
  return (
    <div className="px-0 md:px-0 p-0 grid grid-cols-3 mt-10">
  <div className="relative p-0 sm:p-0 md:p-8 col-span-3 text-center">
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-20 gap-x-0 md:gap-x-6 items-start p-0 sm:p-0 md:p-8">
      {data.map((item, index) => (
        <li
          key={index}
          className="relative mx-10 sm:mx-0 md:m-0 flex flex-col sm:flex-row xl:flex-col items-center"
        >
          <div className="order-1 sm:ml-6 xl:ml-0">
            <h3 className="mb-1 text-slate-900 text-sm md:text-sm font-semibold">
              <span className="mb-1 block text-sm leading-6 text-indigo-500">
                {item.news_createdate}
              </span>
              {lannow == "TH" ? (
                <> {item.news_title}</>
              ) : (
                <> {item.news_title_en}</>
              )}
            </h3>

            <a
              className="group inline-flex items-center text-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 mt-6"
              href={`/news/${item.news_id}`}
            >
              {lannow == "TH" ? <>อ่านเพิ่มเติม</> : <>Read more</>}
              <svg
                className="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400"
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
          <img
            src={'/api/'+item.news_pic}
            alt=""
            className="mb-6 sm:mb-0 md:p-0 hover:scale-105 h-52 object-cover shadow-md rounded-lg bg-slate-50 w-full sm:w-full xl:mb-6 xl:w-96"
            onError={(e) => (e.target.src = defaultImage)}
          />
        </li>
      ))}
    </ul>
  </div>
</div>

  );
};

export default News;
