import {doc, collection, getDoc, query, serverTimestamp, setDoc, where, updateDoc, arrayUnion } from "firebase/firestore";
import "./addUser.css"
import {db} from "../../../../lib/firebase"
import { useState } from "react";
import {useUserStore} from "../../../../lib/userStore";


const   AddUser = () => {

    const [user, setUser] = useState(null)

    const {currentUser} = useUserStore()

    const handleSearch = async (e) =>{
        e.preventDefault();

        const formData = new formData(e.target);

        const username = formData.get("username");

        try{
            const userRef = collection(db, "users");

            const q = query(userRef, where("username", "==", "username"));

            const querySnapshot = await getDoc();

            if (!querySnapshot.empty){
                setUser(querySnapshot.docs[0].data());
            }
        }catch(err){
            console.log(err)
        }
    };

    const handleAdd = async() =>{

        const chatRef = collection(db, "chats")
        const userChatsref = collection(db, "userchats")

        try{
            const newChatRef = doc(chatRef)

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: []
            });

            await updateDoc(doc(userChatsref, user.id),{
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastmessage:"",
                    recieverId: currentUser.id,
                    updatedAt:Date.now(),
                })
            });

            await updateDoc(doc(userChatsref, currentUser.id),{
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastmessage:"",
                    recieverId: user.id,
                    updatedAt:Date.now(),
                })
            });

        }catch(err){
            console.log(err);
        }
    };


    return(
        <div classname="addUser">add user 
        <form onSubmit={handleSearch}>
            <input type="text" placeholder="username" name='username' />
            <button >search</button>
        </form>
        {user && <div className="user">
            <div className="detail">
                <img src={user.avatar ||"../avatar.png"} alt="sample"/>
                <span>{user.username}</span>
            </div>
            <button onClick={handleAdd}>add user</button>
        </div>}
        </div>
    )
}

export default AddUser