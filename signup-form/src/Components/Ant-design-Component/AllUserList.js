import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Pagination, List, Typography, Input, Select, Popconfirm, Checkbox } from 'antd';
import { DeleteOutlined, EditOutlined, UserOutlined, UnorderedListOutlined } from '@ant-design/icons';
import style from './AllUserList.module.css'
import EditModel from './EditModel';
import SignUpApiServices from '../../Api/ApiServices'


const { Option } = Select;

const AllUserList = () => {

  const [users, setUsers] = useState([]);
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState('');
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [UserName, setUserName] = useState('');
  const [showModel, setShowModel] = useState(false);
  const [editUserData, setEditUserData] = useState([]);
  const [isChecked, setChecked] = useState({});
  const [delMultiUser, setDelMultiUser] = useState([]);
  const limtiSizes = [5, 8, 10];

  useEffect(() => {
    GetUserHandler(limit, skip, UserName);
  }, [skip, limit])

  const GetUserHandler = async (limit, skip, UserName) => {
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
       // console.log('total user', res.data.total)
        setTotal(res.data.total);
        setUsers(fetchUserData);
        //console.log('pagination list users: ', fetchUserData)
      })
      .catch(err => { console.log('pagination error', err) })

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
    setDelMultiUser([]);
  }
  const onCancelDelete = (e) => {
    //console.log(e)
  }
  const EditHandler = async (item) => {
    setShowModel(true)
    setEditUserData(item)
  }
  const EditedEmailHandler = async (id, updatedUser) => {
    await SignUpApiServices.putAPI(id, updatedUser)
      .then(res => { console.log('updated email', res) })
      .catch(err => { console.log('error in updating email', err) })
    await getAllUser();
  }
  const getAllUser = () => {
    GetUserHandler(limit, skip, UserName);
  }
  const SearchHandler = () => {
    GetUserHandler(limit, skip, UserName);
  }
  const ClearSearchHandler = async () => {
    setUserName('');
    setSkip(0);
    setLimit(5)
    setCurrent(1);
    await GetUserHandler(limit, skip, UserName);   
  }
  const handleLimitSizeChange = (e) => {
    setLimit(e);
    setCurrent(1);
    setSkip(0)
  }
  const checkBoxHandler = (item, e) => {
    if (e.target.checked === true) {
      let arr = delMultiUser
      arr.push(item.id)
      setDelMultiUser([...arr]);
      setChecked({ ...isChecked, [e.target.name]: e.target.checked });
     // console.log('checked box true', delMultiUser, e.target)
      //console.log('check', isChecked);
    }
    else {
      let removeId = delMultiUser.filter(del => del !== item.id)
      setDelMultiUser(removeId);
      setChecked({ ...isChecked, [e.target.name]: false });
      console.log('checked box false', removeId);
    }
  }
  const onDeleteManyHandler = async () => {
    const removeArray = {
      delmany: delMultiUser
    }
    //console.log("delete users list ", removeArray);
    await SignUpApiServices.deleteManyAPI(removeArray)
      .then(res => { console.log('response of delete many', res) })
      .catch(err => { console.log('error in delete many', err.message) });
    setSkip(0);
    setLimit(5)
    setCurrent(1);
    getAllUser();
    setChecked({});
    setDelMultiUser([]);
  }

  return (
    <div className={style.mainContainer}>
      <Row justify='center'>
        <Col span={20}>
          <h2 > <span> <UnorderedListOutlined /> </span> User List</h2>
        </Col>
        <Col>
          <Button type='primary' size='middle' onClick={getAllUser} icon={<UserOutlined />}> Get User's </Button>
        </Col>
      </Row>
      {/* for search delmany setpage limit */}
      <Row justify='start'>
        <Col span={2}>
          <Popconfirm title="Are you sure to delete Seleted Users?"
            onConfirm={onDeleteManyHandler} onCancel={onCancelDelete}
            okText="Yes" cancelText="No">
            <Button size='middle' type='primary' disabled={!delMultiUser.length >= 1}>Delete Many</Button>
          </Popconfirm>
        </Col>
        <Col span={18}>
          <Input type='text' placeholder=" Find User" style={{ width: '25%' }}
            value={UserName} onChange={UserHandler} />
          <Button style={{ marginLeft: '5px' }} disabled={!UserName.length >= 1}
            onClick={SearchHandler}> Search</Button>
          <Button style={{ marginLeft: '5px' }} disabled={!UserName.length >= 1} type='primary'
            onClick={ClearSearchHandler}>Clear Serach</Button>
          <Select style={{ width: 60, marginLeft: 5 }} onChange={handleLimitSizeChange} value={limit} >
            {limtiSizes.map((size) => (
              <Option key={size} value={size}>
                {size}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
        {/* for user list */}
      <Row justify='start'>
        <Col span={20}>
          {users.length > 0 ?
            <List dataSource={users} 
              bordered
              renderItem={
                (item, index) => (
                  <List.Item>
                    <Checkbox onChange={(e) => checkBoxHandler(item, e)} name={item.id} 
                      checked={isChecked[item.id]} >  {item.name}
                    </Checkbox>
                    <Typography.Text keyboard strong style={{width:'40%', marginLeft:'10px'}}>  Name: {item.name}
                      ---- Email: {item.email} </Typography.Text>
                    <Col span={2} offset={10} >
                      <Popconfirm title="Are you sure to delete this User?"
                        onConfirm={() => deleteHandler(item.id)}
                        onCancel={onCancelDelete} okText="Yes" cancelText="No">
                        <Button type='primary' size='small'
                          danger icon={<DeleteOutlined />}>  Delete</Button>
                      </Popconfirm>
                    </Col>
                    <Col span={2}>
                      <Button type='primary' size='small' onClick={() => EditHandler(item)}
                        icon={<EditOutlined />} > Edit</Button>
                    </Col>
                  </List.Item>
                )
              }
            >
            </List>
            : <div> No record found </div>
          }
          {/* for edit user model */}
          {showModel && <EditModel editUserData={editUserData} setShowModel={setShowModel}
            onEditEmail={EditedEmailHandler} />}
        </Col>
        {/* for pagination */}
        <Col span={16}  >
          <Pagination current={current} pageSize={limit} onChange={pageHandler} total={total} />
        </Col>
      </Row>

    </div>
  )
}

export default AllUserList
