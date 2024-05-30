import { useEffect, useState } from 'react';
import './chatList.css';
import AddUser from '../../addUser/addUser';
import { userStore } from '../../../lib/userStore';
import { onSnapshot, updateDoc } from 'firebase/firestore';
import {auth, db} from "../../lib/firebase";
import {doc, setDoc, getDoc} from "firebase/firestore";
import {useChatStore} from "../../lib/useChatStore"

const ChatList = () => {

    const [addMode, setaddMode] = useState(false);
    const [chats, setChats] = useState([]);
    const [inputs, setInputs] = useState("");


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

    const handleSelectt = async(chat)=>{
        const userChats = chats.map((item) => {
            const {user, ...rest} = item;
            return rest;

        });

        const chatIndex = userChats.findIndex((item) => item.chatId === chat.chatId);
        userChats[chatIndex].isSeen = true;

        const userChatsRef = doc(db, "userchats", currentUser.id);
        try{
            await updateDoc(userChatsRef,{
                chats:userChats,
            });
            changeChat(chat.chatId, chat.user);

        }catch(err){
            console.log(err )
        }

    };

    const handleSelect = async(chat)=>{

        const userChatsref = doc(db, "userchats", currentUser.id);
        const userChatsSnapshot = await getDoc(userChatsref);

        if (userChatsSnapshot.exists()) {
            const userChatsData = userChatsSnapshot.data()

            const chatIndex = userChatsData.chats.findIndex(
                (c) => c.chatId === chatId
            );
            userChatsData.chats[chatIndex].lastMessage = text;
            userChatsData.chats[chatIndex].isSeen =  true;
            userChatsData.chats[chatIndex].updatedAt = Date.now();

            await updateDoc(userChatsref, {
                chats: userChatsData.chats,
            });

        }

        changeChat(chat.chatId, chat.user)

    }

    const filteredChats = chats.filter((c)=>{
        c.user.username.toLowerCase().includes(input.toLowerCase())
    })

    return (
        <div className="chatList">
            <div className="search">
                <div className="searchbar">
                    <img src="./plus.png" alt="" />
                    <input type="text" placeholder="search" onChange={(e) => setInputs(e.target.value)}/>
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
            {filteredChats.map((chat) =>(

            
            <div className="item">
                <img src={chat.user.blocked.includes(currentUser.id) ? './avatar.png': chat.user.avatar || './avatar.png'} alt='' key={chat.chatId} onClick={()=> handleSelect(chat)} style={{backgroundColor: chats?.isSeen ? "transparent": "5183fe"}}/>
                <div className="texts">
                    <span>
                        {chat.user.blocked.includes(currentUser.id) ? "user":chat.user.username }
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