import React, { useState } from 'react'
import { Formik } from 'formik';
import { Form, Input } from 'formik-antd';
import { Modal, Button } from 'antd';
import { STRING_CONST } from '../Constants/StringConstant';
import 'antd/dist/antd.css';
import { formValidation } from '../Validations/FormValidation'
import { CREATE_USER } from '../Graphql/Mutations';
import { useMutation } from '@apollo/client';

const AddNewUser = (props) => {

    const [isModalVisible, setIsModalVisible] = useState(true);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [createUser, {error}] = useMutation(CREATE_USER);

    const onFormSubmit = async (values, {resetForm}) => {
      const formIsValid = await formValidation.isValid(values);  
      if (formIsValid) {
        console.log(values);
       await createUser({
          variables: {
            name: userName,
            email: userEmail,
            password : userPassword
          }
        });
        if(error) {
          console.log('error in creating user',error)
        }
      }
      resetForm();
      props.setShowModel(false);
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
    const handleOk = () => {
        setIsModalVisible(false);
        props.setShowModel(false)
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        props.setShowModel(false);
    };
   

    return (
        <>
            <Modal title="Add New User Model" visible={isModalVisible}
                onOk={handleOk} onCancel={handleCancel}>
                <Formik initialValues={{ name: '', email: '', password: '' }}
                    onSubmit={(values, { resetForm }) => onFormSubmit(values, { resetForm })}
                    validationSchema={formValidation}
                >
                    {(errors, touched) => {
                        return (
                            <Form style={{ width: '60%', margin: " 10px auto" }} >
                                <Form.Item label="Name" name="name"    >
                                    <Input name='name'
                                     placeholder={STRING_CONST.USER_NAME}
                                     value={userName}
                                     onChange={onNameChange} />
                                    {errors.name && touched.name ? (<span>{errors.name}</span>) : null}
                                </Form.Item>

                                <Form.Item label="Email" name="email"  >
                                    <Input name='email'
                                     placeholder={STRING_CONST.USER_EMAIL}
                                     value={userEmail}
                                     onChange={onEmailChange} />
                                    {errors.email && touched.email ? (<span>{errors.email}</span>) : null}
                                </Form.Item>

                                <Form.Item label="Password" name="password" >
                                    <Input.Password name='password'
                                      placeholder={STRING_CONST.USER_PASSWORD}
                                       value={userPassword}
                                       onChange={onPasswordChange} />
                                    {errors.password && touched.password ? (<span>{errors.password}</span>) : null}
                                </Form.Item>
                                <Button type="primary" htmlType="submit"> Submit  </Button>
                            </Form>
                        )
                    }}
                </Formik>
            </Modal>
        </>
    )
}

export default AddNewUser
