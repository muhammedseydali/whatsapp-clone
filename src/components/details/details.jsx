import "./details.css";
import "./detail.css"


const Details = () => {
    return (
        <div className="detail">details
            <div className="user">
                <img src="./avatar.png" alt=""/>
                <h2>User Name</h2>
                <p>Lorem ipsum dolor sit amet.</p>
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
                <button>Block User</button>
            </div>
            </div>
    )
}

export default Details