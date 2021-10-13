import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client';
import { LOAD_USERS } from '../Graphql/Queries';
import { List, Typography, Spin,Button} from 'antd'
import 'antd/dist/antd.css';
import AddNewUser from './AddNewUser';

const GetAllUser = () => {
  const { loading, data } = useQuery(LOAD_USERS);
  const [userList, setUserList] = useState([]);
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    if (data) {
      setUserList(data.getUsers);
    }
  }, [data]);
  const onAddUserHandler = () => {
    setShowModel(true);    
  }

  return (
    <>
      <span> <Button size='middle' onClick={onAddUserHandler}>Add User</Button></span>
      {loading ? <Spin tip="LOADING USERS" size='large'/> :
        <List style={{ width: '50%', margin: " auto", backgroundColor: 'whitesmoke' }}
          bordered
          dataSource={userList}
          renderItem={user => (
            <List.Item>
              <Typography.Text mark>Name: {user.name}</Typography.Text> Email: {user.email}
            </List.Item>
          )}
        />
      }
      {showModel && <AddNewUser  setShowModel={setShowModel} />}
    </>
  )
}

export default GetAllUser
