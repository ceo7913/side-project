import { AnimatePresence,motion,wrap } from "framer-motion";
import React, {useState} from 'react'
import { images } from "./image-date";
import "./style/StudyPage.css"

const variants = {
    enter: (direction) => {
        return {
            x: direction > 0
                ? 1000
                : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => {
        return {
            zIndex: 0,
            x: direction < 0
                ? 1000
                : -1000,
            opacity: 0
        };
    }
};
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};
const StudyPage = () => {
    const [
        [
            page, direction
        ], setPage
    ] = useState([0, 0]);
    const imageIndex = wrap(0, images.length, page);

    const paginate = (newDirection) => {
        setPage([
            page + newDirection,
            newDirection
        ]);
    };

    return (
    <div className="example-container">
        <AnimatePresence initial={false} custom={direction}>
            <motion.img
            key={page}
            src={images[imageIndex]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
                x:{type:"spring",stiffness:300, damping:100},
                opacity:{duration:0.7}
            }}
            drag="x"
            dragConstraints={{left:0,right:0}}
            dragElastic={1}
            onDragEnd={(e,{offset,velocity})=>{
                const swipe = swipePower(offset.x,velocity.x);
                if(swipe<-swipeConfidenceThreshold){
                    paginate(1);
                }else if(swipe>swipeConfidenceThreshold){
                    paginate(-1)
                }
            }}
            />
        </AnimatePresence>
        {/* <div className="next" onClick={()=>paginate(1)}>{"."}</div>
        <div className="prev" onClick={()=>paginate(-1)}>{"."}</div> */}
    </div>
    )
}

export default StudyPage