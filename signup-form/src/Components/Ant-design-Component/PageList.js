import React, { useState, useEffect } from 'react'
import { Pagination, Input, Button, List, Typography, Select, Checkbox, DatePicker, Popconfirm } from 'antd'
import SignUpApiServices from '../../Api/ApiServices';
import EditModel from './EditModel';

const { Option } = Select;
const PageList = () => {
  const [users, setUsers] = useState([]);
  const [current, setCurrent] = useState(1)
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [UserName, setUserName] = useState('');
  const [total, setTotal] = useState('');
  const limtiSizes = [5, 8, 10];
  const [delUserArray, setDelUserArray] = useState([]);
  const [showModel , setShowModel] = useState(false);
  const [editUserData , setEditUserData] = useState([])
  // const [checked , setChecked] = useState(false);


  useEffect(() => {
    fetchUsers(limit, skip, UserName);
  }, [skip, limit]);
  const pageHandler = (page) => {
    // console.log(page);
    setCurrent(page);
    setSkip(page - 1);
  }
  const handleLimitSizeChange = (e) => {
    setLimit(e);
    setCurrent(1);
    setSkip(0)
  }


  const fetchUsers = async (limit, skip, UserName) => {
    console.log('skip limit', skip, limit, UserName);
    //console.log('username', UserName.length >= 1)
    const fetchUserData = [];
    await SignUpApiServices.getUsers(limit, skip, UserName)
      .then(res => {
        const resData = res.data.data;
        for (const key in resData) {
          fetchUserData.push({
            id: resData[key]._id,
            name: resData[key].name,
            email: resData[key].email,
            showmodel:true
          })
        }
        console.log('total user', res.data.total)
        setTotal(res.data.total);
        setUsers(fetchUserData);
        console.log('users: ', fetchUserData)
      })
      .catch(err => {
        console.log('pagination error', err)
      })
  }
  const UserHandler = (event) => {
    const UserName = event.target.value.trim()
    setUserName(UserName)
    //console.log(UserName)
  }
  const SearchHandler = () => {
    fetchUsers(limit, skip, UserName);
  }
  const ClearSearchHandler = () => {
    setUserName('');
    setCurrent(1);
    setSkip(0);
    setLimit(5)
    fetchUsers(limit, skip, UserName);

  }
  const checkBoxHandler = (item, e) => {
    if (e.target.checked === true) {
      let arr = delUserArray
      arr.push(item.id)
      setDelUserArray([...arr]);
      console.log('checked box true', delUserArray)
    }
    else {
      let removeId = delUserArray.filter(del => del !== item.id)
      setDelUserArray(removeId);
      console.log('checked box false', removeId);
    }
  }

  const onDeleteManyHandler = async () => {

    const removeArray = {
      delmany: delUserArray
    }
    console.log("delete users list ", removeArray);
    await SignUpApiServices.deleteManyAPI(removeArray)
      .then(res => { console.log('response of delete many', res) })
      .catch(err => { console.log('error in delete many', err.message) });
    setCurrent(1);
    setSkip(0);
    setLimit(5)
    fetchUsers(limit, skip, UserName);
  }

  const onDateChangeHandler = (date, dateString) => {
    console.log('Date', date, dateString)
  }
  const onConfirmDelete = (e, id) => {
    console.log('del user id', id)
  }
  const onCancelDelete = (e) => {
    // console.log(e)
  }
  const onEditHandler = (item) => {
    setShowModel(true)
    setEditUserData(item)
  }

  return (
    <>
      <h2> pagination list</h2>
      <div>
        {/* <div style={{ padding: 5 }}>
          <DatePicker onChange={onDateChangeHandler}></DatePicker>
        </div> */}
        <div >
          <Input type='text' placeholder=" Find User" style={{ width: '25%' }} required={true}
            value={UserName} onChange={UserHandler} />
          <Button style={{ marginLeft: '5px' }} disabled={!UserName.length >= 1}
            onClick={SearchHandler}> Search</Button>
          <Button style={{ marginLeft: '5px' }} disabled={!UserName.length >= 1} type='primary'
            onClick={ClearSearchHandler}>Clear Serach</Button>
          <span > user per page </span>
          <Select style={{ width: 60, marginLeft: 5 }} onChange={handleLimitSizeChange} value={limit} >
            {limtiSizes.map((size) => (
              <Option key={size} value={size}>
                {size}
              </Option>
            ))}
          </Select>
          {users &&
            <List size='small' style={{ width:'50%', margin: "8px auto" }}
              bordered dataSource={users}
              renderItem={(item, index) => (
                <List.Item>
                  <span style={{ float: 'left' }} >
                    <Checkbox onChange={(e) => checkBoxHandler(item, e)}> User: {index}
                    </Checkbox>
                    <Popconfirm  title="Are you sure to delete this User?"
                      onConfirm={(e) => onConfirmDelete(e, item.id)} onCancel={onCancelDelete}
                      okText="Yes" cancelText="No">
                      <Button style={{ margin: "auto 5px" }} size='small'
                        type='ghost'>Delete</Button>
                    </Popconfirm>
                    <Button size='small'type='link' onClick={() =>onEditHandler(item)}>Edit</Button>
                  </span>
                  <span style={{ float: 'right' }}>
                    <Typography.Text mark>NAME: {item.name}</Typography.Text>  {'\n'} Email: {item.email}
                  </span>
                </List.Item>
              )}
            />}
            {/* {showModel && <EditModel editUserData={editUserData} />} */}
        </div>
        <Popconfirm title="Are you sure to delete Seleted User?"
          onConfirm={onDeleteManyHandler} onCancel={onCancelDelete}
          okText="Yes" cancelText="No">
          <Button size='middle' type='primary' disabled={!delUserArray.length >= 1}
            >Delete Many</Button>
        </Popconfirm>

        <Pagination current={current} onChange={pageHandler} pageSize={limit} total={total} />
      </div>
    </>
  )
}

export default PageList
