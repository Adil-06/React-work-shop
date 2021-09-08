import React, { useRef } from 'react'
import style from './AllSignUpUser.module.css'

const EditUserList = (props) => {
  const id = props.editUserID
  const emailRef = useRef('')

  const changeEmailHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;

    if (email) {
      //console.log(emailRef.current.value);
      props.onEditEmail(id, email)
    }
    else alert("fill the email")
  }

  return (
    <div>
      <div className={style.editEmailArea}>
        <form onSubmit={changeEmailHandler}>
          <input type="email" ref={emailRef}
            required placeholder="Update Your Email" />
          <button >submit</button>
        </form>
      </div>

    </div>
  )
}

export default EditUserList
