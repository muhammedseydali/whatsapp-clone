import './chatList.css';

const ChatList = () => {
    return (
        <div className="chatList">
            <div className="search">
                <div className="searchbar">
                    <img src="./plus.png" alt="" />
                    <input type="text" placeholder="search" />
                </div>
                <img className="add" src="./pluus.png" alt="" />
            </div>
        </div>
    )
}

export default ChatList