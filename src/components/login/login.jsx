import { useState } from "react"
import "./login.css"

const Login = () => {
    const [avatar, setvatar] = useState({
        file:null,
        url:""
    })

    const handleAvatar = e =>{
        setvatar({
            file:e.target.files[0],
            url:URL.createObjectURL(e.target.files[0])
        })
    }


    return(
        <div className="login">
            <div className="item">
                <h2>welcome back</h2>
                <form>
                    <input type="text" placeholder="email" name="email"/>
                    <input type="password" placeholder="password" name="password"/>
                    <button>SignIn</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>create an account</h2>
                <form>
                    <label htmlFor="file">
                        <img src={avatar.url || "./avatar.png"} alt=""/>
                    </label>
                    <input type="file" id="file" style={{display:"none"}} onChange={handleAvatar}/>
                    <input type="text" placeholder="email" name="email"/>
                    <input type="password" placeholder="password" name="password"/>
                    <button>Signup</button>
                </form>
                </div>
            </div>
        
    )
}

export default Login