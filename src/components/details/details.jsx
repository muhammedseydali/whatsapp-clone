import "./details.css";
import "./detail.css"
import { auth} from "../../lib/firebase"
import { useUserStore } from "../../lib/userStore";
import { arrayRemove, arrayUnion, updateDoc } from "firebase/firestore";


const Details = () => {
     
    const {chatId, user, IsCurrentUserBlocked, IsRecieverBlocked, changeBlock} = useChatStore();
    const {currentUser} = useUserStore();

    const handleBlock = async() => {
        if (!user) return;

        const userDocRef = doc(db, "users", currentUser.id)

        try{
            await updateDoc(userDocRef, {
                blocked: IsRecieverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
            });
            changeBlock()
        }catch(err){
            console.log(err)
        }
    };
    return (
        <div className="detail">details
            <div className="user">
                <img src="./avatar.png" alt=""/>
                <h2>{user?.avatar || "./avatar.png"}</h2>
                <p>{user?.username}</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>chat settings</span>
                        <img src="./arrowupp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span> privacy % help</span>
                        <img src="./arrowupp.png" alt="" />
                    </div>
                </div>

                <div className="option">
                    <div className="title">
                        <span>shared photos</span>
                        <img src="./arrowdown.png" alt="" />
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="./avatar.png" alt="" />
                                <span>photo 2024</span>
                            </div>
                        <img src="./download.png" alt=""  className="icon"/>
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>shared files</span>
                        <img src="./arrowupp.png" alt="" />
                    </div>
                </div>
                <button onClick={handleBlock}>
                    IsCurrentUserBlocked ? "you are blocked": IsRecieverBlocked ? "User Blocked": "Blocked"
                </button>
                <button className="logout" onClick={() => auth.signOut()}>Logout</button>

            </div>
            </div>
    )
}

export default Details