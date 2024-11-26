import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra); //
dayjs.locale("th");
const Learning = ({ id }) => {
  React.useEffect(() => {
    getData();
  }, []);
  const [courseData, setcourseData] = React.useState([]);
  const [course_topic, setcourse_topic] = React.useState([]);
  const [course_objective, setcourse_objective] = React.useState([]);
  const [image_course, setimage_course] = React.useState([]);
  const getData = async () => {
    try {
      const response = await fetch(`/api/course/id?foo=${id}`, {
        method: "GET",
      });
      const data = await response.json();

      setcourseData(data.data);
      setcourse_topic(data.course_topic);
      setcourse_objective(data.course_objective);
      setimage_course(data.image_course);
 
    } catch (error) {
      console.log(error.message);
    }
  };
  const [lannow, setLannow] = React.useState("EN"); // Default to English

  // Use useEffect to set the language from localStorage after the client has loaded
  React.useEffect(() => {
    const language = localStorage.getItem("lan") || "EN"; // Default to 'EN' if not found
    setLannow(language);
  })

  return (
    <div className="">
      <div className="text-gray-700">
        <span className="text-[22px] font-bold">
          {lannow == "TH" ? "วัตถุประสงค์ :" : "Objective : "}
          <br></br>
        </span>{" "}
        เพื่อจัดการฝึกอบรมและถ่ายทอดความรู้ความเข้าใจแก่เจ้าหน้าที่และบุคลากรด้านงานทางในประเด็นหลัก
        ดังนี้
        <span className="">
          <ul className="list-disc pl-10 pb-10 gap-4">
            {course_objective.map((res) => (
              <li className="mt-2">{res.course_objective_name}</li>
            ))}
          </ul>
        </span>
        <span className="text-[22px] font-bold">
          {lannow == "TH" ? "วิทยากร :" : "Trainee : "}
          <br></br>
        </span>{" "}
      </div>
      ผู้เชี่ยวชาญและมีประสบการณ์ด้านวิศวกรรมจราจร วิศวกรรมความปลอดภัย
      และอุปกรณ์อํานวยความปลอดภัย
      <div className="text-gray-700 mt-5">
        <span className="text-[22px] font-bold">
          {lannow == "TH" ? "หัวข้อวิชา :" : "Topic : "}
          <br></br>
        </span>{" "}
        <span className="">
          <ul className="list-disc pl-10 pb-10 gap-4">
            {course_topic.map((res) => (
              <li className="mt-2">{res.course_topic_name}</li>
            ))}
          </ul>
        </span>
      </div>
      <div className="text-gray-700 mt-5">
        <span className="text-[22px] font-bold">
          {lannow == "TH" ? "การลงทะเบียน :" : "Topic : "}
          <br></br>
        </span>{" "}
        <span className="">
          <ul className="list-disc pl-10 pb-10 gap-4">
            {course_topic.map((res) => (
              <li className="mt-2">{res.course_topic_name}</li>
            ))}
          </ul>
        </span>
      </div>
    </div>
  );
};

export default Learning;
