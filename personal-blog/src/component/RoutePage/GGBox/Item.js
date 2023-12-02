import React from 'react'
import { items } from './data'
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
const Item = ({id}) => {
    // const nav =useNavigate()
    // const toProject = () => nav("/project")
    const {category,title,innnerText} = items.find(item => item.id === id);
  return (
    <>
    <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0,transition:{duration:0.15}}}
        transition={{duration:0.2,delay:0.15}}
        style={{pointerEvents:"auto"}}
        className="overlay"
    >
        <Link to="project"/>
        {/* {toProject} */}
    </motion.div>
    <div className='card-content-container open'>
        <motion.div className='card-content' layoutId={`card-container-${id}`}>
            <motion.div
                className='title-container'
                layoutId={`title-container-${id}`}
            >
                <span className='category'>{category}</span>
                <h2>{title}</h2>
            </motion.div>
            <motion.div className='content-container' >
                {innnerText}
            </motion.div>
        </motion.div>
    </div>
    </>
  )
}

export default Item