import { useEffect, useState, useRef } from "react";
import "./chats.css";
import EmojiPicker from "emoji-picker-react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/useChatStore";

const Chats = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [chats, setChats] = useState();
    const { chatId } = useChatStore();
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
            setChats(res.data());
        });

        return () => {
            unSub();
        };
    }, [chatId]);

    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji);
        setOpen(false);
    };

    console.log(text);

    return (
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <span>Jane Doe</span>
                        <p>Lorem ipsum dolor</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
            </div>
            <div className="center">
                {chats?.messages?.map((message) => (
                    <div className="message" key={message?.createdAt}>
                        {message.image && <img src={message.img} alt="" />}
                        <div className="texts">
                            <p>{message.text}</p>
                            <span>1 min ago</span>
                        </div>
                    </div>
                ))}
                <div className="message own">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro iure nam fugiat dicta facilis?</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="./gallery.png" alt="" />
                    <img src="./chat-camera.png" alt="" />
                    <img src="./chat-mic.png" alt="" />
                </div>
                <input type="text" placeholder="Type a message" value={text} onChange={(e) => setText(e.target.value)} />
                <div className="emoji">
                    <img src="./emoji.png" alt="" onClick={() => setOpen((prev) => !prev)} />
                    {open && (
                        <div className="picker">
                            <EmojiPicker onEmojiClick={handleEmoji} />
                        </div>
                    )}
                </div>
                <button className="sendbutton">Send</button>
            </div>
        </div>
    );
};

export default Chats;
