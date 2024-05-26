// import { useState } from "react"
// import "./login.css"
// import { toast } from "react-toastify"
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
// import {auth, db} from "../../lib/firebase";
// import {doc, setDoc} from "firebase/firestore";
// import upload from "../../lib/uploads";

// const Login = () => {
//     const [avatar, setvatar] = useState({
//         file:null,
//         url:""
//     });

//     const [loading, setLoading] = useState(false)

//     const handleAvatar = e =>{
//         setvatar({
//             file:e.target.files[0],
//             url:URL.createObjectURL(e.target.files[0])
//         })
//     };

//     const handleLogin = e => {
//         e.preventDefault();
//         setLoading(true);

//         const formData = new FormData(e.target);

//         const {email, password} = Object.fromEntries(formData);

//         try{
//             // await signInWithEmailAndPassword(auth, email, password);
//         }catch(err){
//             console.log(err)
//             toast.error(err.message)
//         }
//         finally{
//             setLoading(false)
//         }
//     };

//     const handleRegister = async e => {
//         e.preventDefault();
//         setLoading(true)
//         const formData = new FormData(e.target);

//         const {username, email, password } = Object.fromEntries(formData)

//         try{   
//             const res = await createUserWithEmailAndPassword(auth, email, password)

//             const imageUrl = await upload(avatar.file)

//             await setDoc(doc(db, "users", res.user.uid), {
//                 username,
//                 email,
//                 avatar: imageUrl,
//                 id: res.user.uid,
//                 blocked: []
//             });

//             await setDoc(doc(db, "userchats", res.user.uid), {
//                 chats: []
//             });

//             toast.success("Account created successfully!! , you can login now")

//         }catch(err){
//             console.log(err)
//             toast.error(err.message)
//         }finally{
//             setLoading(false);
//         }
//     };


//     return(
//         <div className="login">
//             <div className="item">
//                 <h2>welcome back</h2>
//                 <form onSubmit={handleLogin}>
//                     <input type="text" placeholder="email" name="email"/>
//                     <input type="password" placeholder="password" name="password"/>
//                     <button disabled={loading}>{loading ? "Loading" :"Signin"}</button>
//                 </form>
//             </div>
//             <div className="separator"></div>
//             <div className="item">
//                 <h2>create an account</h2>
//                 <form onSubmit={handleRegister}>
//                     <label htmlFor="file">
//                         <img src={avatar.url || "./avatar.png"} alt=""/>Upload an image
//                     </label>
//                     <input type="file" id="file" style={{display:"none"}} onChange={handleAvatar}/>
//                     <input type="text" placeholder="username" name="username"/>
//                     <input type="email" placeholder="email" name="email"/>
//                     <input type="password" placeholder="password" name="password"/>
//                     <button disabled={loading}>{loading ? "Loading" :"Signup"}</button>
//                 </form>
//                 </div>
//             </div>
        
//     )
// }

// export default Login


import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/uploads";

const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    });

    const [loading, setLoading] = useState(false);

    const handleAvatar = e => {
        setAvatar({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        });
    };

    const handleLogin = async e => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Successfully logged in!");
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async e => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const { username, email, password } = Object.fromEntries(formData);

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            let imageUrl = "";
            if (avatar.file) {
                imageUrl = await upload(avatar.file);
            }

            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email,
                avatar: imageUrl,
                id: res.user.uid,
                blocked: []
            });

            await setDoc(doc(db, "userchats", res.user.uid), {
                chats: []
            });

            toast.success("Account created successfully! You can log in now.");
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login">
            <div className="item">
                <h2>Welcome back</h2>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" name="email" required />
                    <input type="password" placeholder="Password" name="password" required />
                    <button type="submit" disabled={loading}>
                        {loading ? "Loading" : "Sign In"}
                    </button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Create an account</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatar.url || "./avatar.png"} alt="Avatar" /> Upload an image
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
                    <input type="text" placeholder="Username" name="username" required />
                    <input type="email" placeholder="Email" name="email" required />
                    <input type="password" placeholder="Password" name="password" required />
                    <button type="submit" disabled={loading}>
                        {loading ? "Loading" : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
