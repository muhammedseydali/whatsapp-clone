import { useState } from "react";
import "./chats.css";
import EmojiPicker from "emoji-picker-react"

const Chats = () => {
const[open,SetOpen] = useState(false);
const[text, SetText] = useState("");


const HandleEmoji = e =>{
    SetText((prev) => prev + e.emoji);
    SetOpen(false)
};

console.log(text)

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
                    <img src="./phone.png" alt=""/>
                    <img src="./video.png" alt=""/>
                    <img src="./mic.png" alt=""/>
                </div>
            </div>
            <div className="center"></div>
            <div className="bottom">
                <div className="icons">
                    <img src="" alt=""/>
                    <img src="" alt=""/>
                    <img src="" alt=""/>
                </div>
                <input type="text" placeholder="type a message" value={text} onChange={(e) => SetText(e.target.value)}/>
                <div className="emoji">
                    <img src="" alt="" onClick={() => SetOpen((prev) => !prev)}/>
                    <div className="picker">
                    <EmojiPicker open={open} onEmojiClick={HandleEmoji}/>
                    </div>
                </div>
                <button className="sendbutton">Send</button>
            </div>
        </div>
    )
}

export default Chats