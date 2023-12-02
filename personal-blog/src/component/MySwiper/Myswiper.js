import React, { useState } from "react";
import{Firstpage,Secondpage,Thirdpage} from "../HomePage/index"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore from "swiper/core"
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./Myswiper.css";

// import required modules
import { Controller, Mousewheel, Pagination } from "swiper";

// SwiperCore.use([Controller]);

const Myswiper = () => {
  // const [controlledSwiper1,setControlledSwiper1] = useState()
  return (
    <>
      <Swiper
        // id="projectSlide1"
        direction={"vertical"}
        slidesPerView={1}
        // spaceBetween={30}
        mousewheel={true}
        pagination={{
          clickable: true,
          
        }}
        // onSwiper={(swiper)=>Secondpage(swiper)}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Mousewheel, Pagination]}
        className="Myswiper"
        // onSwiper={setControlledSwiper1}
      >
        <SwiperSlide>
          <Firstpage/>
        </SwiperSlide>
        <SwiperSlide><Secondpage/></SwiperSlide>
        <SwiperSlide>
          <Thirdpage/>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Myswiper;
