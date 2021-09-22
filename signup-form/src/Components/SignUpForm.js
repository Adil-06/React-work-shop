import React ,{useRef}from 'react'
import {formValidation} from '../Validations/FormValidation'
import SignUpApiServices from '../Api/ApiServices'
import style from './SignupForm.module.css'

const SignUpForm = (props) => {
    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');

    const formHandler = async (event) => {
        event.preventDefault();
        const userData = {
            name : nameRef.current.value,
            email : emailRef.current.value,
            password : passwordRef.current.value
        }
        const formIsValid = await formValidation.isValid(userData);
        console.log("form valid :", formIsValid)
        
      if (formIsValid) {
        await SignUpApiServices.createAPI(userData)
          .then(res => { console.log("response of signup form", res) })
          .catch(err => { console.log('error in posting user data', err) })
        // clearing the inputs
        nameRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';
      }
      else {
        alert('please fill all the feild correctly')
      }    
    }
    return (
        <div className={style.AddSignUpForm}>
            <h2 style={{color:'whitesmoke' ,fontWeight : 'bolder' }}>Sign UP Form</h2>
            
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