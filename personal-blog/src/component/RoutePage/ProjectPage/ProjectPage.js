import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { useParams } from 'react-router-dom'
import "./style/Project.scss"
import "./style/ProjectPage.scss"
import ProjectList from './ProjectList'
import ProjectDetails from './ProjectDetails'


const ProjectPage = () => {
  const {id} = useParams();
  console.log(id);
  return (
  <div className='Projectpage'>
      <ProjectList selectedId={id}/>
      <AnimatePresence>
          {id && <ProjectDetails id={id} key="item"/>}  
        </AnimatePresence>
  </div>

  )
}

export default ProjectPage