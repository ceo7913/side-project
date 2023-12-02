import "../Hompage-style/Firstpage.css"


import BackImg2 from "../../../img/55ZJaQ3.gif"
import Textscramble from "../Homepage-Function/Textscramble"


const Firstpage = () => {

    return (
        <div className='firstPage'>
            <div className='firstImg'>
                <div className="textScramble">
                    <Textscramble/>
                </div>
                <img src={BackImg2} alt="room.gif" />
            </div>
        </div>
    )
}

export default Firstpage