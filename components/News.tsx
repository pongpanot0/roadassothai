"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  Autoplay,
  EffectFade,
  Virtual,
  Scrollbar,
  Navigation,
  Pagination,
  A11y,
} from "swiper/modules";
const News = () => {
  return (
    <div className="max-container padding-container grid grid-cols-3 ">
      <div className="relative col-start-2 col-span-1 col-end-2 text-center">
        <h1 className="mb-4 text-4xl font-semibold">ข่าวทั่วไป</h1>
      </div>
      <div className="relative  col-span-3  text-center">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <SwiperSlide>
            <img
              className="transition duration-300 ease-in-out hover:scale-110"
              src="https://images.unsplash.com/photo-1505533321630-975218a5f66f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />{" "}
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <img
              className="transition duration-300 ease-in-out hover:scale-110"
              src="https://images.unsplash.com/photo-1570051008600-b34baa49e751?q=80&w=2085&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />{" "}
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <img
              className="transition duration-300 ease-in-out hover:scale-110"
              src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />{" "}
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <img
              className="transition duration-300 ease-in-out hover:scale-110"
              src="https://plus.unsplash.com/premium_photo-1661678244954-d1d766c00a57?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />{" "}
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default News;
