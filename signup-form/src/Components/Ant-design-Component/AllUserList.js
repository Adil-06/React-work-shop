import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Pagination, List, Typography, Input, Select } from 'antd';
import { DeleteOutlined, EditOutlined, UserOutlined, UnorderedListOutlined } from '@ant-design/icons';
import EditEmailCard from './EditEmailCard';
import style from './AllUserList.module.css'
import SignUpApiServices from '../../Api/ApiServices'
// import {formValidation} from '../../Validations/FormValidation'

const { Option } = Select;

const AllUserList = () => {

  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [showEditFeild, setEditFeild] = useState(false);
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState('');
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [UserName, setUserName] = useState('')
  const limtiSizes = [5, 8, 10];

  useEffect(() => {
    GetUserHandler(limit, skip, UserName);
  }, [skip, limit])

  const GetUserHandler = async (limit, skip, UserName) => {
    //console.log("limit and skip", limit, skip, UserName)
    const fetchUserData = [];
    await SignUpApiServices.getUsers(limit, skip, UserName)
      .then(res => {
        const resData = res.data.data;
        for (const key in resData) {
          fetchUserData.push({
            id: resData[key]._id,
            name: resData[key].name.toUpperCase(),
            email: resData[key].email
          })
        }
        console.log('total user', res.data.total)
        setTotal(res.data.total);
        setUsers(fetchUserData);
        console.log('pagination list users: ', fetchUserData)
      })
      .catch(err => {
        console.log('pagination error', err)
      })

  }
  const UserHandler = (event) => {
    const UserName = event.target.value.trim()
    setUserName(UserName)
  }
  const pageHandler = (page) => {
    //console.log('selected page is:',page);
    setCurrent(page);
    setSkip(page - 1);
  }
  const deleteHandler = async (id) => {
    await SignUpApiServices.deleteAPI(id)
      .then(res => { console.log('delete api response', res) })
      .catch(err => { console.log("error in delete", err) })
    await getAllUser();
    setSkip(0)
    setCurrent(1);
  }
  const EditHandler = async (id) => {
    //console.log("EDIT:", id)
    setUserId(id);
    setEditFeild(true);
  }
  const EditedEmailHandler = async (id, email) => {
    console.log(email)
    const updatedEmail = {
      email: email
    }
    await SignUpApiServices.putAPI(id, updatedEmail)
      .then(res => { console.log('updated email', res) })
      .catch(err => { console.log('error in updating email', err) })
    await getAllUser();
    setEditFeild(false)
  }
  const getAllUser = () => {
    GetUserHandler(limit, skip, UserName);
  }
  const SearchHandler = () => {
    GetUserHandler(limit, skip, UserName);
  }
  const ClearSearchHandler = async() => {
    setUserName('');
    await GetUserHandler(limit, skip, UserName);
    setSkip(0);
    setLimit(5)
    setCurrent(1);
    
  }
  const handleLimitSizeChange = (e) => {
    setLimit(e);
    setCurrent(1);
    setSkip(0)
  }


  return (
    <div className={style.mainContainer}>
      <Row justify='center'>
        <Col span={20}>
          <h2 > <span> <UnorderedListOutlined /> </span> User List</h2>
        </Col>
        <Col>
          <Button type='primary' size='middle' onClick={getAllUser}
            icon={<UserOutlined />} >  Get User List
          </Button>
        </Col>
      </Row>
      <Row justify='start'>
        {/* for user list */}
        <Col span={18}>
          <Input type='text' placeholder=" Find User" style={{ width: '25%' }}
            value={UserName} onChange={UserHandler} />
          <Button style={{ marginLeft: '5px' }} disabled={!UserName.length >= 1}
            onClick={SearchHandler}> Search</Button>
          <Button style={{ marginLeft: '5px' }} disabled={!UserName.length >= 1} type='primary'
            onClick={ClearSearchHandler}>Clear Serach</Button>
          <Select  style={{ width: 60 , marginLeft: 5}} onChange={handleLimitSizeChange} value={limit} >
          {limtiSizes.map((size) => (
              <Option key={size} value={size}>
                {size}
              </Option>
            ))}
          </Select>
          {users.length > 0 ?
            <List dataSource={users}
              bordered
              renderItem={
                (item, index) => (
                  <List.Item>
                    <Typography.Text keyboard strong>  Name: {item.name}
                      {'\n'} ---- Email: {item.email} </Typography.Text>
                    <Col span={2} offset={10} >
                      <Button type='primary' size='small' onClick={() => deleteHandler(item.id)}
                        danger icon={<DeleteOutlined />}>  Delete</Button>
                    </Col>
                    <Col span={2}>
                      <Button type='primary' size='small' onClick={() => EditHandler(item.id)}
                        icon={<EditOutlined />} > Edit</Button>
                    </Col>
                  </List.Item>
                )
              }
            >
            </List>
            : <div> No record found </div>
          }
        </Col>
        {/* for edit email */}
        <Col span={4} offset={2}>
          {showEditFeild &&
            <EditEmailCard editId={userId} onEditEmail={EditedEmailHandler} />
          }
        </Col>
        {/* for pagination */}
        <Col span={16} offset={2} >
          <Pagination current={current} pageSize={limit} onChange={pageHandler} total={total} />
        </Col>
      </Row>

    </div>
  )
}

export default AllUserList
