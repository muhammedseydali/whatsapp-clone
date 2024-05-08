import "./addUser.css"

const addUser = () => {
    return(
        <div classname="addUser">add user 
        <form>
            <input type="text" placeholder="username" name='username' />
            <button >search</button>
        </form>
        <div className="user">
            <div className="detail">
                <img src="./avatar.png"/>
                <span>jhon doe</span>
            </div>
            <button>add user</button>
        </div>
        </div>
    )
}

export default addUser