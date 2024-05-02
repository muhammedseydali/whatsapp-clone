import "./list.css"
import UserInfo from "./userinfo/userInfo"
import ChatList from "./chatlist/chatList"
const List = () => {
    return (
        <div className="list">
            <UserInfo/>
            <ChatList/>
        </div>
    )
}

export default List