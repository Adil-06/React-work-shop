import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { LOAD_USERS } from '../Graphql/Queries';
import { DELETE_USER } from '../Graphql/Mutations';
import { List, Typography, Spin, Button, Popconfirm } from 'antd'
import 'antd/dist/antd.css';
import AddNewUser from './AddNewUser';
import EditUsersModel from './EditUsersModel';

const GetAllUser = () => {
  const { loading, data } = useQuery(LOAD_USERS);
  const [userList, setUserList] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [editUserData, setEditUserData] = useState([]);
  const [showEditModel, setShowEditModel] = useState(false);
  const [deleteUser, { error }] = useMutation(DELETE_USER);

  useEffect(() => {
    if (data) {
      setUserList(data.getUsers);
    }
  }, [data]);
  const onAddUserHandler = () => {
    setShowModel(true);
  }
  const onDeleteHandler = async (id) => {
    const deleteID = id
    //console.log('user id to delete', id);
    await deleteUser({
      variables: {
        id: deleteID
      }
    })
    if (error) {
      console.log('error in delete', error)
    }
  }
  const onCancelDelete = (e) => {
    //console.log(e)
  }
  const onEditHandler = (user) => {
    setShowEditModel(true);
    setEditUserData(user);
  }

  return (
    <>
      <span> <Button size='middle' onClick={onAddUserHandler}>Add User</Button></span>
      {loading ? <Spin tip="LOADING USERS" size='large' /> :
        <List style={{ width: '50%', margin: " auto", backgroundColor: 'whitesmoke' }}
          bordered
          dataSource={userList}
          renderItem={user => (
            <List.Item>
              <span style={{ float: 'left' }}>
                <Typography.Text mark strong >Name: {user.name.toUpperCase()}</Typography.Text> Email: {user.email}
              </span>
              <span style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Popconfirm title="Are you sure to delete this User?"
                  onConfirm={() => onDeleteHandler(user.id)}
                  onCancel={onCancelDelete}
                  okText="Yes" cancelText="No">
                  <Button style={{ backgroundColor: 'tomato', color: 'white' }} size='small' >  Delete</Button>
                </Popconfirm>
                <Button size='small' type='primary'
                  onClick={() => onEditHandler(user)}>Edit</Button>
              </span>
            </List.Item>
          )}
        />
      }
      {showModel && <AddNewUser setShowModel={setShowModel} />}
      {showEditModel && <EditUsersModel editUserData={editUserData}
        setShowEditModel={setShowEditModel} />}
    </>
  )
}

export default GetAllUser
