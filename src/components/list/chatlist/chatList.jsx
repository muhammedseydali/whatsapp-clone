import { useEffect, useState } from 'react';
import './chatList.css';
import AddUser from '../../addUser/addUser';
import { userStore } from '../../../lib/userStore';
import { onSnapshot, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { chatStore as useChatStore } from '../../../lib/chatStore';

const ChatList = () => {
    const [addMode, setAddMode] = useState(false);
    const [chats, setChats] = useState([]);
    const [input, setInput] = useState("");

    const { currentUser } = userStore();
    const { changeChat } = useChatStore();

    useEffect(() => {
        const unSub = onSnapshot(
            doc(db, "userchats", currentUser.id),
            async (res) => {
                const items = res.data().chats;
                const promises = items.map(async (item) => {
                    const userDocRef = doc(db, "users", item.recieverId);
                    const userDocSnap = await getDoc(userDocRef);
                    const user = userDocSnap.data();
                    return { ...item, user };
                });
                const chatData = await Promise.all(promises);
                setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
            }
        );
        return () => unSub();
    }, [currentUser.id]);

    const handleSelect = async (chat) => {
        const userChatsRef = doc(db, "userchats", currentUser.id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
            const userChatsData = userChatsSnapshot.data();
            const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chat.chatId);
            if (chatIndex !== -1) {
                userChatsData.chats[chatIndex].isSeen = true;
                userChatsData.chats[chatIndex].updatedAt = Date.now();
                await updateDoc(userChatsRef, {
                    chats: userChatsData.chats,
                });
                changeChat(chat.chatId, chat.user);
            }
        }
    };

    const filteredChats = chats.filter(c => c.user.username.toLowerCase().includes(input.toLowerCase()));

    return (
        <div className="chatList">
            <div className="search">
                <div className="searchbar">
                    <img src="./plus.png" alt="Add" />
                    <input
                        type="text"
                        placeholder="Search"
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <img
                    className="add"
                    src={addMode ? "./minus.png" : "./plus.png"}
                    alt="Toggle Add User"
                    onClick={() => setAddMode((prev) => !prev)}
                />
            </div>
            {filteredChats.map((chat) => (
                <div className="item" key={chat.chatId} onClick={() => handleSelect(chat)}>
                    <img
                        src={chat.user.blocked.includes(currentUser.id) ? './avatar.png' : chat.user.avatar || './avatar.png'}
                        alt='User Avatar'
                        style={{ backgroundColor: chat.isSeen ? "transparent" : "#5183fe" }}
                    />
                    <div className="texts">
                        <span>{chat.user.blocked.includes(currentUser.id) ? "Blocked User" : chat.user.username}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}
            {addMode && <AddUser />}
        </div>
    );
};

export default ChatList;
