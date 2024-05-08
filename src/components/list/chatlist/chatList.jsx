import { useState } from 'react';
import './chatList.css';
import AddUser from '../../addUser/addUser';

const ChatList = () => {
    const [addMode, setaddMode] = useState(false)
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
            <div className="item">
                <img src='./avatar.png' alt=''/>
                <div className="texts">
                    <span>
                        Jhon doe
                    </span>
                    <p>messages</p>
                </div>
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
            <div className="item">
                <img src='./avatar.png' alt=''/>
                <div className="texts">
                    <span>
                        Jhon doe
                    </span>
                    <p>messages</p>
                </div>
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
            <div className="item">
                <img src='./avatar.png' alt=''/>
                <div className="texts">
                    <span>
                        Jhon doe
                    </span>
                    <p>messages</p>
                </div>
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
            {addMode && <AddUser />}
        </div>
    )
}

export default ChatList