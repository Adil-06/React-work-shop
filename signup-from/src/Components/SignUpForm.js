import React ,{useRef}from 'react'
import axios from 'axios'
import style from './SignupForm.module.css'

function SignUpForm(props) {
    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');

    const formHandler = (event) => {
        event.preventDefault();
        const userData = {
            name : nameRef.current.value,
            email : emailRef.current.value,
            password : passwordRef.current.value
        }
        console.log('user data ',userData);      

        axios.post("http://localhost:4000/user/signup", userData) 
        .then(res => { console.log("response of signup form", res)})
        .catch( err => { console.log('error in posting user data', err)})

        // clearing the inputs
        nameRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';
    }
    return (
        <div className={style.AddSignUpForm}>
            <form onSubmit={formHandler}>
                <div className={style.control}>
                    <label htmlFor='name'>Name</label>
                    <input type="text" id="name"
                     ref={nameRef} required  placeholder="Enter Your Name"/>
                </div>              
                <div className={style.control}>
                    <label htmlFor='email'>Email</label>
                    <input type="email" id="email"
                     ref={emailRef} required placeholder="Enter Your Email"/>
                </div>
                <div className={style.control}>
                    <label htmlFor='password'>Password</label>
                    <input type="password" id="password"
                     ref={passwordRef} required placeholder="Enter Your Password"/>
                </div>                
                <div>
                   <button type="submit" className={style.formbtn}> Submit</button>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm