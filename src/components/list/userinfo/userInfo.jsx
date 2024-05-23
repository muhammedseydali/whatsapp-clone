import "./userInfo.css"
import { userStore } from "../../../lib/userStore"


const {currentUser} = userStore()
const UserInfo = () => {
    return (
        <div className="">
            <div className="user">
                <img src={currentUser.avatar || './images/avatr.png' } alt="" />

                <h2>{currentUser.username}</h2>
            </div>

            <div className="icons">
                <img src="./images/avatr.png" alt="" />
                <img src="" alt="" />
                <img src="./edit.png" alt="" />
            </div>
        
        </div>
    )
}

export default UserInfo