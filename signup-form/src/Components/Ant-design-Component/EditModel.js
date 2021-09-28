import React, { useState } from 'react'
import { Formik } from 'formik';
import { Form, Input } from 'formik-antd';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import { editformValidation } from '../../Validations/FormValidation'

const EditModel = (props) => {
  const userData = props.editUserData;
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [editName, setEditName] = useState(userData.name);
  const [editEmail, setEditEmail] = useState(userData.email);
  const id = userData.id


  const onFormSubmit = async (values) => {
    const formIsValid = await editformValidation.isValid(values);

    if (formIsValid) {
      console.log(values);
      const updatedUser = {
        name: values.name,
        email: values.email
      }        
     await  props.onEditEmail(id, updatedUser)
    }
    props.setShowModel(false)
  }

  const handleOk = () => {
    setIsModalVisible(false);
    props.setShowModel(false)
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    props.setShowModel(false);
  };
  const onNameChange = (e) => {
    setEditName(e.target.value);
  };
  const onEmailChange = (e) => {
    setEditEmail(e.target.value);
  };

  return (
    <>
      <Modal title="Edit User Detail Model" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

        <Formik initialValues={{ name: userData.name, email: userData.email }}
          onSubmit={(values) => onFormSubmit(values)}
          validationSchema={editformValidation}
        >
          {(errors, touched) => {
            return (
              <Form style={{ width: '50%', margin: " 10px auto" }} >
                <Form.Item label="Name" name="name"    >
                  <Input name='name' placeholder='User Name'
                    value={editName} onChange={onNameChange} />
                  {errors.name && touched.name ? (<span>{errors.name}</span>) : null}
                </Form.Item>

                <Form.Item label="Email" name="email"  >
                  <Input name='email' placeholder='User Email'
                    value={editEmail} onChange={onEmailChange} />
                  {errors.email && touched.email ? (<span>{errors.email}</span>) : null}
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

export default EditModel
