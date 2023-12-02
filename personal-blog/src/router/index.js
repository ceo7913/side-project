import { useRoutes } from "react-router-dom";
import Myswiper from "../component/MySwiper/Myswiper";
import { StudyPage } from "../component/RoutePage";
import ProjectPage from "../component/RoutePage/ProjectPage/ProjectPage";
import ScrollEvent from "../ScrollEvent";
import IssuePage from "../component/RoutePage/IssuePage/IssuePage";

function Router(){
    const routes = [
        {
            path: 'HomePage-for-Fun/',
            element: <Myswiper/>,
            children:[
                {
                    // 이런식으로 하위 페이지 라우터를 설정할 수 있음
                    // path:'issueLog',
                    // element:<></>,
                },
                {
                    // path:'about',
                    // element:<></>,
                },
            ]
            
        },
        // {
        //     path:'project',
        //     element:<ProjectPage/>,
        // },
        {
            path:'HomePage-for-Fun/study',
            element:<StudyPage/>,
        },
        {
            path:'HomePage-for-Fun/issue',
            element:<IssuePage/>,
        },
        // {
        //     // path:'issue',
        //     element:<IssuPage/>,
        //     children:[
        //         {
        //             path:'/:id'
        //         },
        //         {
        //             path:'issue'
        //         }
        //     ]
        // },
        {
            element:<ProjectPage/>,
            children:[
                {
                    path:"HomePage-for-Fun/:id"
                },
                {
                    path:"HomePage-for-Fun/project"
                }
            ]
        }
    ]
    return useRoutes(routes)
}

export default Router