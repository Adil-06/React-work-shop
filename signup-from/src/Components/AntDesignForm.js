import React ,{useState}from 'react'
import { Button, Checkbox, Form, Input, DatePicker } from 'antd';
import 'antd/dist/antd.css';

function AntDesignForm() {
    const [date, setDate] = useState(null)
    const handleChange = (value) => {
        setDate(value)
    }
    return (
        <React.Fragment>
            <Form   labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
                <Form.Item
                    label="User Name" name="username"
                    rules={[{  required: true, message: 'Please input your username!' }]} >
                   <Input size='large' style={{width: 300, marginTop : '5px' }} />                    
                </Form.Item>
                <Form.Item
                    label="User Email" name="email"
                    rules={[{  required: true, message: 'Please input your Email!' }]} >
                   <Input htmlType='email' size='large' style={{width: 300, marginTop : '5px' }} />                    
                </Form.Item>
                <Form.Item
                    label="Password" name="password"
                    rules={[{  required: true, message: 'Please input your password!' }]} >
                   <Input.Password size='large' style={{width: 300, marginTop : '5px' }} />                    
                </Form.Item>
                <Button type='primary' htmlType='submit'>Click</Button>

                <div style={{ width: 350, margin: '10px auto' , paddingBottom:'10px' }}>
                <DatePicker onChange={handleChange} />
                <div style={{  color: 'indigo' }}>
                    Selected Date: {date ? date.format('YYYY-MM-DD') : 'None'}
                </div>
            </div>
            </Form>
            

        </React.Fragment>
    )
}

export default AntDesignForm
