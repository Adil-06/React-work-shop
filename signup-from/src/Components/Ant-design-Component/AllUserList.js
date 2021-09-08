import React, { useState, useEffect } from 'react'
import { Button,  Row, Col, Pagination, List, Typography  } from 'antd';
import { DeleteOutlined, EditOutlined , UserOutlined, UnorderedListOutlined} from '@ant-design/icons';
import EditEmailCard from './EditEmailCard';
import style from './AllUserList.module.css'
 import SignUpApiServices from '../../Api/ApiServices'
// import {formValidation} from '../../Validations/FormValidation'

const AllUserList = () => {

  useEffect(() => {  GetUserHandler()  },[]) 
  const [users, setUsers] = useState([]);
  const [userId , setUserId] = useState('');
  const [showEditFeild, setEditFeild] = useState(false);

  const GetUserHandler = async () => {
    await SignUpApiServices.getAPI()
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
        console.log('users are: ', fetchUserData)
      })
      .catch(err => { console.log('error in getting user', err) })
  }
  const deleteHandler = async (id) => {
    //console.log('delete id', id)
    await SignUpApiServices.deleteAPI(id)
      .then(res => { console.log('delete api response', res) })
      .catch(err => { console.log("error in delete", err) })
    GetUserHandler();
  }
  const EditHandler = async (id) => {
    console.log("EDIT:", id)    
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
    GetUserHandler();
    setEditFeild(false)
  }


  return (
    <div className={style.mainContainer}>
      <Row justify='center'>
        <Col span={20}>
         <h2 > <span> <UnorderedListOutlined /> </span> User List</h2>
         </Col>
         <Col>
           <Button type= 'primary' size='middle' onClick ={GetUserHandler}
              icon={<UserOutlined/>} >  Get User List
           </Button>
         </Col>
      </Row>
      <Row justify= 'start'>
        {/* for user list */}
        <Col span={18}>
          <List dataSource={users}
           bordered 
           renderItem = {
             (item,index) => (
                <List.Item>
                  <Typography.Text keyboard strong> Name: {item.name.toUpperCase()} 
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
         { showEditFeild && 
         <EditEmailCard editId = {userId} onEditEmail={EditedEmailHandler}/>
          }
        </Col>
        {/* for pagination */}
        <Col span={16} offset={2} >
          <Pagination defaultCurrent={1} total={100} ></Pagination>  
        </Col>    
      </Row>

    </div>
  )
}

export default AllUserList
