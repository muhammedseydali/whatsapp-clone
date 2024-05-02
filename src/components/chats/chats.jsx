import "./chats.css";


const Chats = () => {
    return (
        <div className="chat">Chat
            <div className="top">
                <div className="user">
                    <img src="./avatar.png" alt=""/>
                    <div className="texts">
                        <span>jane doe</span>
                        <p>lorem ipsum doller</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="" alt=""/>
                    <img src="" alt=""/>
                    <img src="" alt=""/>
                </div>
            </div>
            <div className="center"></div>
            <div className="bottom">
                <div className="icons">
                    <img src="" alt=""/>
                    <img src="" alt=""/>
                    <img src="" alt=""/>
                </div>
                <input type="text" placeholder="type a message"/>
                <div className="emoji">
                    <img src="" alt=""/>
                </div>
                <button className="button">Send</button>
            </div>
        </div>
    )
}

export default Chats