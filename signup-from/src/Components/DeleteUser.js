import React from 'react'
import axios  from 'axios'
import style from './AllSignUpUser.module.css'


function DeleteUser(props) {
    const id = props.id
    const deleteHandler = async () => {
       console.log('user id is', id);
       await axios.delete(`http://localhost:4000/user/signup/${id}`)
       .then(res => { console.log('delete user' , res)})
       .catch(err => { console.log('error in deleting', err)})
    }
    return (
        <React.Fragment>
            <button className={style.deletebtn} onClick={deleteHandler}>Delete</button>            
        </React.Fragment>
    )
}

export default DeleteUser
