import React, { useState, useEffect } from 'react'
import { Pagination, Input, Button, List, Typography } from 'antd'
import SignUpApiServices from '../../Api/ApiServices'

const PageList = () => {
  const [users, setUsers] = useState([]);
  const [current, setCurrent] = useState(1)
  const [limit] = useState(10);
  const [pageCount, setPageCount] = useState(1)
  const [skip, setSkip] = useState(1);
  const [filterUser, setFilterUser] = useState([])

  const [UserName, setUserName] = useState('')

  useEffect(() => {
    fetchUsers(limit, skip)
  }, [skip]);
  const pageHandler = (page) => {
    // console.log(page);
    setCurrent(page);
    setSkip(page);
  }

  const fetchUsers = async (limit, skip) => {
    console.log('limit', limit);
    console.log('skip', skip);
    const fetchUserData = [];
    await SignUpApiServices.getUsers(limit, skip)
      .then(res => {
        const resData = res.data;
        for (const key in resData) {
          fetchUserData.push({
            id: resData[key]._id,
            name: resData[key].name,
            email: resData[key].email
          })
        }
        setUsers(fetchUserData);
        console.log('pagination  users: ', fetchUserData, pageCount)
      })
      .catch(err => {
        console.log('pagination error', err)
      })
    await SignUpApiServices.getAPI()
      .then(res => {
        const userLength = res.data.length
        console.log('user lenght', userLength);
        setPageCount(Math.ceil(userLength / limit))
      })
  }
  const UserHandler = (event) => {
    const UserName = event.target.value.trim()
    setUserName(UserName)
    //console.log(UserName)
  }
  const findHandler = async () => {
    const fetchUserData = [];
    //console.log(UserName)
    if (UserName) {
      await SignUpApiServices.getUserByName(UserName)
        .then(res => {
          const resData = res.data;
          for (const key in resData) {
            fetchUserData.push({
              id: resData[key]._id,
              name: resData[key].name,
              email: resData[key].email
            })
          }
          console.log('find  users: ', res.data);
          setFilterUser(fetchUserData);
        })
        .catch(err => {
          console.log('find user name error', err)
        })
      setUserName('')
    }
    else { alert('please enter name to find')}
  }
  return (
    <>
      <h2> pagination list</h2>
      <div>
        <div >
          <Input type='text' placeholder=" find user" style={{ width: '25%' ,}} required={true}
            value={UserName} onChange={UserHandler} />
          <Button  style={{ marginLeft:'5px' }} onClick={findHandler}> Search</Button>
          {filterUser.length > 0 && <List size='small' style={{ width: "25%", margin: "8px auto" }}
            bordered dataSource={filterUser}
            renderItem={item => (
              <List.Item>
                <Typography.Text mark>NAME: {item.name}</Typography.Text>  {'\n'} Email: {item.email}
              </List.Item>
            )}
          />}

          {users.map((user, index) => (
            <li key={index} style={{ listStyle: 'none' }}> <b>{user.name} --- {user.email} </b> </li>
          ))}
        </div>
        <Pagination current={current} onChange={pageHandler} total={pageCount * 10} />
      </div>

    </>
  )
}


export default PageList
