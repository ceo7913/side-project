import React from "react";
import  { EffectCoverflow, Pagination } from "swiper";
import { SwiperSlide, Swiper as SwiperComponent } from "swiper/react";
import { items } from "./data";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./style/ProjectPage.css";



function Card({ id, category, title }) {
  return (
    <li className="card">
      <div className="card-content-container">
        <motion.div className="card-content" layoutId={`card-container-${id}`}>
          <motion.div
            className="title-container"
            layoutId={`title-container-${id}`}
          >
            <span className="category">{category}</span>
            <h2>{title}</h2>
          </motion.div>
        </motion.div>
      </div>
      <Link to={id} className="card-open-link" />
    </li>
  );
}
const List = ({ selectedId }) => {
  return (
    <div>
      <div className="ProjectPageBody">
        <div className="swiperWraps">
          <SwiperComponent 
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          onSlideChange={() => console.log("slide change")}
          // .swiper-pagination-bullet-active
          // direction= {"horizontal"}
          pagination={{
            clickable: true,
            el: ".myCustomPagination",
            type: "progressbar",
            // progressbarFillClass:{     el:".customFill" }
          }}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
          >
            {items.map((card) => (
              <SwiperSlide key={card.id} className="firstSw">
                <Card
                  {...card}
                  isSelected={card.id === selectedId}
                />
              </SwiperSlide>
            ))}
          </SwiperComponent>
        </div>
      </div>
    </div>
  );
};

export default List;
