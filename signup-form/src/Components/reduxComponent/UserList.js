import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllUserAsync, deleteUserAsync, updateUserAsync } from '../../store/userSlice'
import EditModel from '../Ant-design-Component/EditModel';
import 'antd/dist/antd.css';
import { Button, List, Typography, Popconfirm } from 'antd';
const { Text } = Typography;


const UserList = () => {
  const users = useSelector(state => state.user.userList);
  const [showModel, setShowModel] = useState(false);
  const [editUserData, setEditUserData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserAsync());
  }, [dispatch]);

  const onDeleteHandler = async(id) => {
   await dispatch(deleteUserAsync(id))
  }
  const onEditHandler = async (item) => {
    setShowModel(true)
    setEditUserData(item)
  }
  const EditedEmailHandler = (id, updatedUser) => {
    dispatch(updateUserAsync(id, updatedUser))
  }
  const onCancelDelete = (e) => {}

  return (
    <div>
      <Text strong mark>All Users List </Text>
      <Text strong >  Total : {users.length} </Text>
      <List style={{ margin: '10px auto', width: '50%' }}
        bordered
        dataSource={users}
        renderItem={(user, index) =>
          <List.Item key={index}>
            <Text strong keyboard style={{padding:'5px'}} > Name: {user.name} _____ Email: {user.email} </Text>
            <span style={{ display:'inline-flex' }}>
              <Popconfirm
                title="Are you sure to delete this User?"
                onConfirm={() => onDeleteHandler(user._id)}
                onCancel={onCancelDelete}
                okText="Yes" cancelText="No">
                <Button type='default' size='small'>Delete</Button>
              </Popconfirm>
              <Button type='primary' size='small' onClick={() => onEditHandler(user)}>Edit</Button>
            </span>
          </List.Item>
        } />
      {showModel && <EditModel editUserData={editUserData} setShowModel={setShowModel}
        onEditEmail={EditedEmailHandler} />}
    </div>
  )
}

export default UserList
