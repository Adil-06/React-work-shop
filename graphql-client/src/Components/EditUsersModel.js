import React,{useState} from 'react'
import { Formik } from 'formik';
import { Form, Input } from 'formik-antd';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import { UPDATE_USER } from '../Graphql/Mutations';
import { useMutation } from '@apollo/client';
import { editformValidation } from '../Validations/FormValidation';
import { STRING_CONST } from '../Constants/StringConstant';

const EditUsersModel = (props) => {
  const userData = props.editUserData;
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [editName, setEditName] = useState(userData.name);
  const [editEmail, setEditEmail] = useState(userData.email);
  const editID = props.editUserData.id;
  const [updateUser , {error}] = useMutation(UPDATE_USER);
 
 
  const onFormSubmit = async (values) => {
    const formIsValid = await editformValidation.isValid(values);

    if (formIsValid) {
      //console.log(values);
      await updateUser({
        variables: {
          id: editID,
          name: editName,
          email: editEmail
        }
      });
      if (error) {
        console.log("error in update", error);
      }
    }
    props.setShowEditModel(false)
  }

  const handleOk = () => {
    setIsModalVisible(false);
    props.setShowEditModel(false)
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    props.setShowEditModel(false);
  };
  const onNameChange = (e) => {
    setEditName(e.target.value);
  };
  const onEmailChange = (e) => {
    setEditEmail(e.target.value);
  };

  return (
    <>
      <Modal title="Edit User Details Model" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Formik initialValues={{ name: userData.name, email: userData.email }}
          onSubmit={(values) => onFormSubmit(values)}
          validationSchema={editformValidation}
        >
          {(errors, touched) => {
            return (
              <Form style={{ width: '50%', margin: " 10px auto" }} >
                <Form.Item label="Name" name="name"    >
                  <Input name='name' placeholder={STRING_CONST.USER_NAME}
                    value={editName} onChange={onNameChange} />
                  {errors.name && touched.name ? (<span>{errors.name}</span>) : null}
                </Form.Item>

                <Form.Item label="Email" name="email"  >
                  <Input name='email' placeholder={STRING_CONST.USER_EMAIL}
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

export default EditUsersModel
