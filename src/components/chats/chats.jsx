import { useEffect, useState } from "react";
import "./chats.css";
import EmojiPicker from "emoji-picker-react"
import { useRef } from "react";
import { onSnapshot } from "firebase/firestore";
import {doc, onSnapshot} from "firebase/firestore"
import {db} from "../../lib/firebase",
import {useChatStore} from "../../lib/useChatStore"


const Chats = () => {
const[open,SetOpen] = useState(false);
const[text, SetText] = useState("");
const [chats, setChats] = useState();

const {chatId} = useChatStore();

const endRef = useRef(null)

useEffect(() => {
    endRef.current?.scrollIntoView({behavior:"smooth"})
}, [])

useEffect(() =>{
    const unSub = onSnapshot(doc(db, "chats", chatId), (res)=>{
        setChats(res.data())
    })

    return () =>{
        unSub();
    };
}, [chatId])

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
            <div className="center">
                <div className="message">
                    <img src="./avatar.png" alt=""/>
                    <div className="texts">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro iure nam fugiat dicta facilis?</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <img src="./avatar.png" alt=""/>
                    <div className="texts">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro iure nam fugiat dicta facilis?</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt=""/>
                    <div className="texts">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro iure nam fugiat dicta facilis?</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <img src="./avatar.png" alt=""/>
                    <div className="texts">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro iure nam fugiat dicta facilis?</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="./gallery.png" alt=""/>
                    <img src="./chat-camera.png" alt=""/>
                    <img src="./chat-mic.png" alt=""/>
                </div>
                <input type="text" placeholder="type a message" value={text} onChange={(e) => SetText(e.target.value)}/>
                <div className="emoji">
                    <img src="./emoji.png" alt="" onClick={() => SetOpen((prev) => !prev)}/>
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