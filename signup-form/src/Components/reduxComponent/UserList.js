import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {  deleteUserAsync, updateUserAsync, PaginatedUsersAsync } from '../../store/userSlice'
import EditModel from '../Ant-design-Component/EditModel';
import 'antd/dist/antd.css';
import { Button, List, Typography, Popconfirm, Pagination, Spin } from 'antd';
const { Text } = Typography;


const UserList = () => {
  const users = useSelector(state => state.user.userList);
  const totallUsers = useSelector(state => state.user.totallUsers)
  const [showModel, setShowModel] = useState(false);
  const [editUserData, setEditUserData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(6);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(PaginatedUsersAsync(skip, limit));
  }, [skip, limit, dispatch])

  const onDeleteHandler = async (id) => {
    await dispatch(deleteUserAsync(id))
    setSkip(0)
    setCurrent(1)
  }
  const onEditHandler = async (item) => {
    setShowModel(true)
    setEditUserData(item)
  }
  const EditedEmailHandler = (id, updatedUser) => {
    dispatch(updateUserAsync(id, updatedUser))
  }
  const onCancelDelete = (e) => { }
  const onPageHandler = (page) => {
    setCurrent(page);
    setSkip(page - 1);
  }

  return (
    <div>

      <Text strong mark>All Users List </Text>
      <Text strong >  Total : {totallUsers} </Text>

      {users.length > 0 ?
        <List style={{ margin: '10px auto', width: '50%' }}
          bordered
          dataSource={users}
          renderItem={(user, index) =>
            <List.Item key={index}>
              <Text strong keyboard style={{ padding: '5px' }} > Name: {user.name} _____ Email: {user.email} </Text>
              <span style={{ display: 'inline-flex' }}>
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
          } /> : <Spin tip='LOADING....' size='large' />
      }
      <div>
        <Pagination current={current} pageSize={limit} onChange={onPageHandler} total={totallUsers} />
      </div>
      {showModel && <EditModel editUserData={editUserData} setShowModel={setShowModel}
        onEditEmail={EditedEmailHandler} />}
    </div>
  )
}

export default UserList
