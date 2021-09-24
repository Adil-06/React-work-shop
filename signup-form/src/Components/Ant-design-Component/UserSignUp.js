import React, { useRef} from 'react'
import { Button,  Form, Input , Typography} from 'antd';
import { FormOutlined } from '@ant-design/icons';
import SignUpApiServices from '../../Api/ApiServices'
import {formValidation} from '../../Validations/FormValidation'
import style from './UserSignUp.module.css'
import 'antd/dist/antd.css';
//<FormOutlined />

const UserSignUp = () => {

  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [form] = Form.useForm();
  const { Title } = Typography;
  
    // const onFinish = async(values) => {
    //   console.log('Success:', values);
     
    // };
  const formHandler = async ( values) => {
    const formIsValid = await formValidation.isValid(values);
    if (formIsValid) {
      console.log('Success:', values);
      await SignUpApiServices.createAPI(values)
      .then(res => { console.log("response of signup form", res) })
      .catch(err => { console.log('error in posting user data', err) })
       await form.resetFields();
    }
    else { alert('please enter required data')}
  }
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    return (
        <div className={style.mainContainer}>
          <Title  italic  > <span> <FormOutlined />  SignUp Form  </span> </Title>
            <Form
                name="basic"
                form = {form}
                labelCol={{ span: 3}}
                wrapperCol={{ span: 12}}
                initialValues={{ remember: true, }}
                onFinish={formHandler}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Name"    name="name" 
                    rules={[ {  required: true, message: 'Please input your username!' } ]}
                >
                    <Input size='large' placeholder='User Name' ref={nameRef}/>
                </Form.Item>
                <Form.Item
                    label="Email"    name="email"
                    rules={[ { required: true, type :'email', message:'Please input your email!' } ]}
                >
                    <Input size='large' placeholder='User Email' ref={emailRef} />
                </Form.Item>

                <Form.Item   label="Password"   name="password"
                    rules={[ { required: true, message: 'Please input your password!' } ]}
                >
                    <Input.Password size='large' placeholder='User Password' ref={passwordRef}/>
                </Form.Item>
                <Form.Item  wrapperCol={{ offset: 4,  span: 8,  }}  >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UserSignUp

