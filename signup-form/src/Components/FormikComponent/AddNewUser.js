import React, { useState } from 'react';
import { Formik } from 'formik';
import { Button } from 'antd';
import { Form, Input } from 'formik-antd';
import { formValidation } from '../../Validations/FormValidation'
import { useDispatch } from 'react-redux';
import { postNewUserAsync } from '../../store/userSlice';
import 'antd/dist/antd.css';
import './AddNewForm.css'

const AddNewUser = () => {

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const dispatch = useDispatch()

  const onFormSubmit = async (values, {resetForm}) => {
    const formIsValid = await formValidation.isValid(values);

    if (formIsValid) {      
      dispatch(postNewUserAsync(values));
    }
    resetForm();
    clearState();
  }
  const clearState = () => {
    setUserEmail('');
    setUserName('');
    setUserPassword('');
  }

  const onNameChange = (e) => {
    setUserName(e.target.value);
  }
  const onEmailChange = (e) => {
    setUserEmail(e.target.value);
  }
  const onPasswordChange = (e) => {
    setUserPassword(e.target.value);
  }
  return (
    <div className='addNewUserForm'>

      <Formik initialValues={{ name: '', email: '', password: '' }}
        onSubmit={(values , {resetForm}) => onFormSubmit(values , {resetForm})}
         validationSchema={formValidation} 
         >
        {(errors, touched) => {
          return (
            <Form style={{ width: '50%', margin: " 10px auto" }} >
              <Form.Item label="Name" name="name"    >
                <Input name='name' placeholder='User Name'
                  value={userName} onChange={onNameChange} />
                {errors.name && touched.name ? (<span>{errors.name}</span>) : null}
              </Form.Item>

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

              <Button type="primary" htmlType="submit"> Submit  </Button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default AddNewUser
