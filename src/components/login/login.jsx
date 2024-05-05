import { useState } from "react"
import "./login.css"
import { toast } from "react-toastify"

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

    const handleLogin = e => {
        e.preventDefault()
        toast.warning("hello")
    }


    return(
        <div className="login">
            <div className="item">
                <h2>welcome back</h2>
                <form onSubmit={handleLogin}>
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
                        <img src={avatar.url || "./avatar.png"} alt=""/>Upload an image
                    </label>
                    <input type="file" id="file" style={{display:"none"}} onChange={handleAvatar}/>
                    <input type="text" placeholder="username" name="username"/>
                    <input type="email" placeholder="email" name="email"/>
                    <input type="password" placeholder="password" name="password"/>
                    <button>Signup</button>
                </form>
                </div>
            </div>
        
    )
}

export default Login