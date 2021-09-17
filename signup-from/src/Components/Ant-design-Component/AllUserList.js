import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Pagination, List, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, UserOutlined, UnorderedListOutlined } from '@ant-design/icons';
import EditEmailCard from './EditEmailCard';
import style from './AllUserList.module.css'
import SignUpApiServices from '../../Api/ApiServices'
// import {formValidation} from '../../Validations/FormValidation'

const AllUserList = () => {
 
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [showEditFeild, setEditFeild] = useState(false);
  const [current, setCurrent] = useState(1)
  const [limit] = useState(10);
  const [pageCount, setPageCount] = useState(1)
  const [skip, setSkip] = useState(1);

  useEffect(() => {
    GetUserHandler(limit, skip);
  }, [skip,pageCount])
  
  // const UpdatedUsersList =  async() => {
  //   const fetchUserData = [];
  //   await SignUpApiServices.getAPI()
  //   .then(res => {        
  //       const resData = res.data;
  //       for (const key in resData) {
  //           fetchUserData.push({
  //               id: resData[key]._id,
  //               name: resData[key].name,
  //               email: resData[key].email
  //           })
  //       }
  //       setUsers([...fetchUserData]);
  //       console.log('updated users: ', fetchUserData, pageCount)
  //   })
  //   .catch(err => {
  //       console.log('updation error', err)
  //   })
  // }

  const GetUserHandler = async (limit, skip) => {
    console.log("limit and skip", limit, skip)
    if (skip > 0) {

      await SignUpApiServices.getUsers(limit, skip)
        .then(res => {
          const fetchUserData = [];
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
  }
  const pageHandler = (page) => {
    //console.log('selected page is:',page);
    setCurrent(page);
    setSkip(page);
  }
  const deleteHandler = async (id) => {
    await SignUpApiServices.deleteAPI(id)
      .then(res => { console.log('delete api response', res) })
      .catch(err => { console.log("error in delete", err) })
    setSkip(1)
    setCurrent(1); 
    getAllUser(); 
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
      setSkip(1)
      setCurrent(1); 
      getAllUser();
    setEditFeild(false)
  }
  const getAllUser = () => {
    GetUserHandler(limit,skip);
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
          <List dataSource={users}
            bordered
            renderItem={
              (item, index) => (
                <List.Item>
                  <Typography.Text keyboard strong>  Name: {item.name.toUpperCase()}
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
        </Col>
        {/* for edit email */}
        <Col span={4} offset={2}>
          {showEditFeild &&
            <EditEmailCard editId={userId} onEditEmail={EditedEmailHandler} />
          }
        </Col>
        {/* for pagination */}
        <Col span={16} offset={2} >
          <Pagination current={current}  onChange={pageHandler} total={pageCount *10} />
        </Col>
      </Row>

    </div>
  )
}

export default AllUserList
