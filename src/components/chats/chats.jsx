import { useEffect, useState, useRef } from "react";
import "./chats.css";
import EmojiPicker from "emoji-picker-react";
import { onSnapshot, doc, arrayUnion, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/useChatStore";
import upload from "../../lib/uploads";

const Chats = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [chats, setChats] = useState();
    const [image, setImage] = useState({file:null, url:"",});

    const { chatId, user, IsCurrentUserBlocked, IsRecieverBlocked } = useChatStore();
    const endRef = useRef(null);
    const currentUser = useUserStore()


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

    const handleImg = e => {
        setImage({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        });
    };

    const handleSend = async () => {
        if (text === "") return;

        let imageUrl = null;
    
        try {

            if (image.file){
                imageUrl = await upload(image.file)
            }
            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    text,
                    createdAt: new Date(),
                    ...(imageUrl && {image: imageUrl}),
                }),
            });
    
            const userIds = [currentUser.id, user.id];
            userIds.forEach(async (id) => {
                const userChatsRef = doc(db, "userchats", id);
                const userChatsSnapshot = await getDoc(userChatsRef);
    
                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data();
    
                    const chatIndex = userChatsData.chats.findIndex(c => c.ChatId === chatId);
    
                    userChatsData.chats[chatIndex].lastMessage = text;
                    userChatsData.chats[chatIndex].isSeen = id === currentUser.id;
                    userChatsData.chats[chatIndex].date = Date.now();
    
                    await updateDoc(userChatsRef, {
                        chats: userChatsData.chats,
                    });
                }
            });
        } catch (err) {
            console.log(err);
        }

        setImage({
            file:null,
            url:"",
        }),

        setText("")
    };
    
    

    console.log(text);

    return (
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src={user?.avatar || "./avatar.png"} alt="" />
                    <div className="texts">
                        <span>{user?.username}</span>
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
                    <div className={message.senderId === currentUser?.id ? "message own": "message"} key={message?.createdAt}>
                        {message.image && <img src={message.img} alt="" />}
                        <div className="texts">
                            <p>{message.text}</p>
                            <span>1 min ago</span>
                        </div>
                    </div>
                ))}
                {image.url && (
                <div className="message own">
                    <div className="texts">
                        <img src={image.url} alt="" />
                    </div>
                </div>
                )}

                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <label htmlFor="file">
                        <img src="./gallery.png" alt="" />
                    </label>
                    <input type="file" id="file" style={{display:"none"}} onChange={handleImg}/>
                    <img src="./chat-camera.png" alt="" />
                    <img src="./chat-mic.png" alt="" />
                </div>
                <input type="text" placeholder={(IsCurrentUserBlocked || IsRecieverBlocked ) ? "you cannot send a message":"Type a message"} value={text} onChange={(e) => setText(e.target.value)} disabled={IsCurrentUserBlocked || IsRecieverBlocked} />
                <div className="emoji">
                    <img src="./emoji.png" alt="" onClick={() => setOpen((prev) => !prev)} />
                    {open && (
                        <div className="picker">
                            <EmojiPicker onEmojiClick={handleEmoji} />
                        </div>
                    )}
                </div>
                <button className="sendbutton" onClick={handleSend} disabled={IsCurrentUserBlocked || IsRecieverBlocked}>Send</button>
            </div>
        </div>
    );
};

export default Chats;
