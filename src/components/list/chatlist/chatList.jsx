import { useEffect, useState } from 'react';
import './chatList.css';
import AddUser from '../../addUser/addUser';
import { userStore } from '../../../lib/userStore';
import { onSnapshot } from 'firebase/firestore';
import {auth, db} from "../../lib/firebase";
import {doc, setDoc, getDoc} from "firebase/firestore";
import {useChatStore} from "../../lib/useChatStore"

const ChatList = () => {

    const [addMode, setaddMode] = useState(false);
    const [chats, setChats] = useState([]);
    const {currentUser} = userStore();
    const {changeChat} = useChatStore();


    useEffect(()=>{
        const unSub = onSnapshot(
            doc(db, "userchats", currentUser.id),
            async (res) =>{
                const items = res.data().chats;

                const promises = items.map(async(item) =>{
                    const userDocRef = doc(db, "users", items.recieverId);
                    const userDocsnap = await getDoc(userDocRef);

                    const user = userDocsnap.data();

                    return { ...item, user};
                });
                const chatData = await Promise.all(promises)

                setChats(chatData.sort((a,b) => b.updatedAt - a.updatedAt));
            }
        )
    })

    useEffect(()=>{
        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), (doc)=> {
            setChats(doc.data());
        });
        return ()=>{

         unSub();
        };
        
    }, [currentUser.id])
    console.log(chats)

    const handleSelect = (chat)=>{
        changeChat(chat.chatId, chat.user)
    }

    return (
        <div className="chatList">
            <div className="search">
                <div className="searchbar">
                    <img src="./plus.png" alt="" />
                    <input type="text" placeholder="search" />
                </div>
                <img className="add" src={addMode ? "./minus.png" : "./pluus.png"} alt="" onClick={() => setaddMode((prev) => !prev)}/>
            </div>
            <div className="item">
                <img src='./avatar.png' alt=''/>
                <div className="texts">
                    <span>
                        Jhon doe
                    </span>
                    <p>messages</p>
                </div>
            </div>
            {chats.map((chat) =>(

            
            <div className="item">
                <img src={chat.user.avatar || './avatar.png'} alt='' key={chat.chatId} onClick={()=> handleSelect(chat)}/>
                <div className="texts">
                    <span>
                        {chat.user.username }
                    </span>
                    <p>{chat.lastMessage}</p>
                </div>
            </div>
            ))}

            {addMode && <AddUser />}
        </div>
    )
}

export default ChatList