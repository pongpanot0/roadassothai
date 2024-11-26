import Link from "next/link";
import React from "react";

const Activitynews = () => {
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
      const splitdata = data.data.slice(0, 3);
      setData(splitdata);
    } catch (error) {
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
    <div className="max-container padding-container grid grid-cols-3 mt-10 ">
      <div className="relative col-start-2 col-span-1 col-end-2 text-center">
        {lannow == "TH" ? (
          <Link href={`/news`}>
            <h1 className="mb-4 hover:text-[#77A8D8] text-4xl font-semibold">
              ข่าวสารกิจกรรม
            </h1>
          </Link>
        ) : (
          <Link href={`/news`}>
            <h1 className="mb-4 hover:text-[#77A8D8] text-4xl font-semibold">
              Activity
            </h1>
          </Link>
        )}
      </div>
      <div className="relative  col-span-3  text-center">
        <ul className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
          {data.map((item, index) => (
            <li
              key={index}
              className="relative flex flex-col sm:flex-row xl:flex-col items-center"
            >
              <div className="order-1 sm:ml-6 xl:ml-0">
                <h3 className="mb-1 text-slate-900 font-semibold ">
                  <span className="mb-1 block text-sm leading-6 text-indigo-500">
                    {item.news_createdate}
                  </span>
                  {item.news_title}
                </h3>

                <a
                  className="group inline-flex items-center text-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500      mt-6"
                  href={`/news/${item.news_id}`}
                >
                  อ่านเพิ่มเติม
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
                className="mb-6 object-cover h-52 hover:scale-105 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 
                xl:w-full"
                width="1216"
                height="640"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Activitynews;
