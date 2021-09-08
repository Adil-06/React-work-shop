import React, { useState, useEffect } from 'react'
import SignUpApiServices from '../Api/ApiServices'
import DeleteUser from './DeleteUser'
import EditUserList from './EditUserList'
import style from './AllSignUpUser.module.css'

const AllSignUpUser = () => {

  const [users, setUsers] = useState([])
  const [showUser, setShowUser] = useState(false);
  const [showEditFeild, setEditFeild] = useState(false);

  useEffect(() => {
    GetUserHandler();
  }, [])
  const GetUserHandler = async () => {
    setShowUser(true)
    await SignUpApiServices.getAPI()
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
  const deleteHandler = async (id) => {
    //console.log('id:', id)
    await SignUpApiServices.deleteAPI(id)
      .then(res => { console.log('delete api response') })
      .catch(err => { console.log("error in delete", err) })
    GetUserHandler();
  }
  const HideEmailHandler = (id) => {
    console.log(id)
    setEditFeild(true) }

  const EditEmailHandler = async (id, editedEmail) => {
    //console.log(id)
    //console.log("email is", editedEmail)
    const updatedEmail = {
      email : editedEmail
    }     
      await SignUpApiServices.putAPI(id, updatedEmail)
        .then(res => { console.log('updated email', res) })
        .catch(err => { console.log('error in updating email', err) })  
      GetUserHandler();
      setEditFeild(false);     
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
          {!showUser && <ul>
            {users.map((user) => (
              <li key={user.id}> Name : {user.name} {'\n'}
                ---- Email: {user.email}
                <DeleteUser id={user.id} onRemove={deleteHandler} />
                <span className={style.editbtn} onClick={() => HideEmailHandler(user.id)}>Edit </span>
                {showEditFeild &&
                  <EditUserList editUserID={user.id} onEditEmail={EditEmailHandler} />
                }
              </li>
            ))}
          </ul>
          }
          {users.length === 0 && <h5 style={{ color: "indigo" }}> No User Yet to show</h5>}
        </div>
      </div>

    </React.Fragment>
  )
}

export default AllSignUpUser
