import React from 'react'
import {faEnvelope, faPhone, faCalendar} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import "../Hompage-style/Thirdpage.css"
import jellyMan from '../../../img/jellymen.gif'

const Thirdpage = () => {
    return (
        <div>
            <div className="Tparent">
                <div className="Tdiv1">
                    <img
                        src={jellyMan}
                        alt="jellyMan"
                        style={{
                            objectFit: "fill"
                        }}/>
                    <div className='myName'>Lim Jun Woo</div>
                </div>
                <div className="Tdiv2">
                    <div
                        style={{
                            fontSize: "25px"
                        }}>
                        <FontAwesomeIcon icon={faEnvelope} className="_fontIcon"/>
                        ceo7913@naver.com
                    </div>
                    <div
                        style={{
                            fontSize: "25px"
                        }}>
                        <FontAwesomeIcon icon={faPhone} className="_fontIcon"/>
                        010-6680-4933
                        <FontAwesomeIcon icon={faCalendar} className='secondText'/>
                        1997.03.31
                    </div>
                    <div className='tecStack'>
                        - Technical stack
                    </div>
                    <div className='tecStackIn'>
                        <span>HTML5</span>
                        <span>CSS3</span>
                        <span>JavaScript</span>
                        <span>React</span>
                        <span>axios</span>
                        <span>TypeScript</span>
                        <span>MySQL</span>
                        <span>Node.js</span>
                        <span>Solidity from Ethereum</span>
                        <span>Sequelize</span>
                        <span>RESTful API(JSON)</span>
                        <span>ExpressJS</span>
                        <span>Git</span>
                        <span>Notion</span>
                        <span>GoogleDrive</span>
                        <span>AWS EC2</span>
                    </div>
                    <div className='eduHistory'>
                        - educational history
                    </div>
                    <div className='eduHistoryIn'>
                        <span>
                            블록체인기반 핀테크 및 응용 SW 개발자 양성과정</span>
                        <span>
                            경일게임아카데미(국비지원)</span>
                        <span>
                            2022.05 - 2023.02</span>
                        <span>
                            프론트엔드(HTML5,CSS3,JS,TS)</span>
                        <span>
                            백엔드(MySQL,SEQUELIZE,MONGODB)</span>
                        <span>서버(EXPRESS,AXIOS)</span>
                    </div>
                </div>
            </div>
            <div className='bottomLine'>

                <div className='bottomLink'>
                    <div>
                        <a href='https://github.com/'>GitHub : https://github.com/ceo7913</a>
                    </div>
                    <div>
                        <a href='https://ceo7913.tistory.com/'>TiStory : https://ceo7913.tistory.com/</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Thirdpage