import React, {useState, useEffect} from 'react'
import axios from 'axios'
import DeleteUser from './DeleteUser'
import style from './AllSignUpUser.module.css'

function AllSignUpUser() {

    const [users , setUsers] = useState([])
    const [showUser, setShowUser] = useState(false)
    useEffect(() => {
        GetUserHandler();
    },[])
    const GetUserHandler = async () => {
        setShowUser(true)
        await axios.get("http://localhost:4000/user/signup")
            .then(res => {
                const fetchUserData = [];
                const resData = res.data;
                for (const key in resData) {
                    fetchUserData.push({
                        id: resData[key]._id,
                        name: resData[key].name,
                        email: resData[key].email
                    })
                }
                setUsers(fetchUserData);
                setShowUser(false);
                console.log('users are: ', fetchUserData)
            })
            .catch(err => { console.log('error in getting user', err) })
    }
    return (
        <React.Fragment>
            <div className={style.allUserDiv}>
                <h2> All Signed In Users </h2>
                <div>
                   <button onClick={GetUserHandler} className={style.getUserbtn}>
                        Get User
                    </button>
                </div>
                <div className={style.UserList}>
                { !showUser &&   <ul>
                        { users.map((user) => (
                            <li key={user.id}> Name : {user.name.toUpperCase()} {'\n'}
                                ---- Email: {user.email}
                                <DeleteUser id={user.id}/>
                            </li>
                        )) }
                    </ul>
                 }
                 { users.length === 0 && <h5 style={{color:"indigo"}}> No User Yet to show</h5>}
                </div>
            </div>

        </React.Fragment>
    )
}

export default AllSignUpUser
