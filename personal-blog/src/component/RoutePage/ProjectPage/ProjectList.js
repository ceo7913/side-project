import React from 'react'
import {SwiperSlide, Swiper} from 'swiper/react'
import {Pagination, Scrollbar, Mousewheel, Keyboard, Navigation} from "swiper"
// import SamplePage from './SamplePage'
import { projectitems } from './Project-date'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// function Card({ id, category, title }) {
//     return (
//       <li className="card">
//         <div className="card-content-container">
//           <motion.div className="card-content" layoutId={`card-container-${id}`}>
//             <motion.div
//               className="title-container"
//               layoutId={`title-container-${id}`}
//             >
//               <span className="category">{category}</span>
//               <h2>{title}</h2>
//             </motion.div>
//           </motion.div>
//         </div>
//         <Link to={id} className="card-open-link" />
//       </li>
//     );
//   }
function Card({imgUrl,date,html,projectName,id}){
     return (
    <li className='card'>
    <div className="height-100 display-table">
        <motion.div className="display-table-cell vertical-align-middle" layoutId={`card-container-${id}`}>
            <div className="display-block position-relative">
                <img src={imgUrl} alt=""/>
                <p className="font-weight-600 bottom-text text-middle text-white text-uppercase text-center">{date}</p>
            </div>
            <div className="hover-title-box padding-55px-lr width-300px sm-width-100 sm-padding-20px-lr">
                <div className="separator width-50px bg-black md-display-none xs-margin-lr-auto"></div>
                <h3><a className="text-white font-weight-600 alt-font text-white-hover" href={html}>{projectName}</a></h3>
            </div>
        </motion.div>
    </div>
    <Link to={id} className="card-open-link" />
    </li>
  )
}

const ProjectList = ({selectedId}) => {

    return (
        <div className='SamplePage'>
        <div  className=" swiper-bottom-scrollbar-full swiper-container ">
        <Swiper
            modules={[Pagination, Scrollbar, Mousewheel, Keyboard, Navigation]}
            allowTouchMove={true}
            slidesPerView={'auto'}
            // grabCursor={true}
            preventClicks={true}
            spaceBetween={30}
            keyboardcontrol="true"
            speed={1000}
            pagination={{
                el: null
            }}
            scrollbar={{
                el: '.swiper-scrollbar',
                draggable: true,
                hide: false,
                snapOnRelease: true
            }}
            mousewheel={{
                enable: true
            }}
            keyboard={{
                enabled: true
            }}
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }}
            breakpoints={{
                767 : {
                    scrollbar: {
                        hide: true
                    },
                    spaceBetween: 0,
                    autoHeight: true,
                    centeredSlides: false,
                    slidesOffsetAfter: 85
                }
            }}>
            <div className='swiper-wrapper'>
                <SwiperSlide className=""style={{width:"35vw"}}>

                {/* <!-- start slider item --> */}
                <div className="swiper-slide width-450px xs-width-100 xs-height-auto">
                    <div
                        className="position-relative width-90 height-100 display-table padding-ten-all xs-padding-fifteen-all xs-width-100">
                        <div className="display-table-cell vertical-align-middle">
                            <h4 className="text-medium-gray display-block margin-5px-bottom alt-font">Welcome,</h4>
                            <h6 className="text-medium-gray font-weight-300 margin-50px-bottom alt-font">To My Project Page</h6>
                            <p
                                className="font-weight-300 width-90 margin-100px-bottom text-medium-gray alt-font margin-15px-left">
                                Here is a record of my Projects at the Kyungil Game Acafemy</p>
                            <img
                                src="http://www.themezaa.com/html/pofo/images/signature.png"
                                className="margin-70px-left width-60 signature"
                                alt=""/>
                        </div>
                    </div>
                </div>
                {/* <!-- end slider item --> */}
                </SwiperSlide>
                {
                    projectitems.map((card) => (
                        <SwiperSlide key={card.id} style={{width:"auto"}}>
                            <Card {...card} isSelected={card.id === selectedId}/>
                        </SwiperSlide>
                    ))
                }
                   {/* {items.map((card) => (
              <SwiperSlide key={card.id} className="firstSw">
                <Card
                  {...card}
                  isSelected={card.id === selectedId}
                />
              </SwiperSlide>
            ))} */}
            </div>
        </Swiper>
        </div>
        </div>
    )
}

export default ProjectList