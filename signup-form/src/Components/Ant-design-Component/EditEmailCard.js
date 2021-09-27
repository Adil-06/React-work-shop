import React, { useState } from 'react'
import { Button, Form, Input, Card } from 'antd';

const EditEmailCard = (props) => {
  const [email, setEmail] = useState('')
  const id = props.editId
  const updateEmail = () => {
    if (email) {
      props.onEditEmail(id, email);
    }
    else alert('update email should not be empty')
  }
  return (
    <>
      <Card title='Edit Your Email' style={{ marginTop: '10px' }}>
        <Form layout='vertical'>
          <Form.Item
            label="Email" name="email"
            rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
          >
            <Input placeholder='Enter Updated Email'
              onChange={(e) => { setEmail(e.target.value) }} />
          </Form.Item>
          <Button type='primary' size='small' style={{ marginTop: '5px' }}
            onClick={updateEmail} >Submitt</Button>
        </Form>
      </Card>
    </>
  )
}

export default EditEmailCard
