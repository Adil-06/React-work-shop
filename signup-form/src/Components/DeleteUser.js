import React from 'react'
import style from './AllSignUpUser.module.css'

const DeleteUser = (props) => {
  const id = props.id
  return (
    <React.Fragment>
      <button className={style.deletebtn} onClick={() => props.onRemove(id)}>Delete</button>
    </React.Fragment>
  )
}
export default DeleteUser
