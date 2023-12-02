import React from 'react'
import {projectitems} from './Project-date'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'

const ProjectDetails = ({id}) => {
    const {imgUrl, date, projectName, innerText} = projectitems.find(item => item.id === id);
    // const {category,title,innnerText} = items.find(item => item.id === id);
    return (
        <>
                <motion.div
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    exit={{
                        opacity: 0,
                        transition: {
                            duration: 0.15
                        }
                    }}
                    transition={{
                        duration: 0.2,
                        delay: 0.15
                    }}
                    style={{
                        pointerEvents: "auto"
                    }}
                    className="overlay DetailParent">
                    <Link to="HomePage-for-Fun/project"/> {/* {toProject} */}
                </motion.div>
                <div className='card-content-container open'>
                    <motion.div className='card-content' layoutId={`card-container-${id}`}>
                        <motion.div class="DerailDiv1">{imgUrl}</motion.div>
                        <motion.div class="DerailDiv2">
                            <motion.div>
                                <motion.div className='title-container' layoutId={`title-container-${id}`}>
                                    <span>{date}</span>
                                    <span>{projectName}</span>
                                </motion.div>
                                <motion.div className='content-container'>
                                    {innerText}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
        </>
    )
}

export default ProjectDetails