import React, { useState } from 'react';
import { Formik } from 'formik';
import { Button } from 'antd';
import { Form, Input } from 'formik-antd';
import 'antd/dist/antd.css';
import { loginFormValidation } from '../../src/Validations/FormValidation';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authStore';
//import SignUpApiServices from '../../Api/ApiServices'

const LoginForm = () => {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const dispatch = useDispatch();

  const onFormSubmit =  (values, {resetForm}) => {
    const formIsValid =  loginFormValidation.isValid(values);

    if (formIsValid) {
      console.log(values);
      const data = values.email
      dispatch(authActions.login(data));
    }
    resetForm();
    clearState();
  }
  const clearState = () => {
    setUserEmail('');
    setUserPassword('');
  }
  const onEmailChange = (e) => {
    setUserEmail(e.target.value);
  }
  const onPasswordChange = (e) => {
    setUserPassword(e.target.value);
  }
  return (
    <>

      <Formik initialValues={{  email: '', password: '' }}
        onSubmit={(values , {resetForm}) => onFormSubmit(values , {resetForm})}
         validationSchema={loginFormValidation} 
         >
        {(errors, touched) => {
          return (
            <Form style={{ width: '30%', margin: " 10px auto", padding:"1rem", backgroundColor: 'lightgray' }}
             layout='vertical' >

              <Form.Item label="Email" name="email"  >
                <Input name='email' placeholder='User Email'
                  value={userEmail} onChange={onEmailChange} />
                {errors.email && touched.email ? (<span>{errors.email}</span>) : null}
              </Form.Item>

              <Form.Item label="Password" name="password" >
                <Input.Password name='password' placeholder='User Password'
                  value={userPassword} onChange={onPasswordChange} />
                {errors.password && touched.password ? (<span>{errors.password}</span>) : null}
              </Form.Item>

              <Button type="primary" htmlType="submit"> Login </Button>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default LoginForm
