import React, { useState, useEffect } from 'react'
import { Pagination, Input, Button, List, Typography, Select , Checkbox , DatePicker} from 'antd'
import SignUpApiServices from '../../Api/ApiServices'

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
            email: resData[key].email
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
  const checkBoxHandler = ( id,e) => {
    if(e.target.checked === true) {
      setDelUserArray([...delUserArray].concat(id))
    }
    console.log(e);
     console.log('checked box',delUserArray)
  }
 
  const onDeleteManyHandler = async () => {
    
    const removeArray =  delUserArray
    console.log("delete users list ", removeArray)

    await SignUpApiServices.deleteManyAPI(removeArray)    
    .then(res => { console.log('response of delete many',res)})
    .catch(err => {console.log('error in delete many', err.message)})
  }
  const onDateChangeHandler = (date, dateString) => {
    console.log('Date', date , dateString)
  }



  return (
    <>
      <h2> pagination list</h2>
      <div>
        <div style={{padding: 5}}>
        <DatePicker onChange={onDateChangeHandler}></DatePicker>
        </div>
        <div >
          <Input type='text' placeholder=" Find User" style={{ width: '25%' }} required={true}
            value={UserName} onChange={UserHandler} />
          <Button style={{ marginLeft: '5px' }} disabled={!UserName.length >= 1}
            onClick={SearchHandler}> Search</Button>
          <Button style={{ marginLeft: '5px' }} disabled={!UserName.length >= 1} type='primary'
            onClick={ClearSearchHandler}>Clear Serach</Button>
          <span > user per page </span>
          <Select  style={{ width: 60 , marginLeft: 5}} onChange={handleLimitSizeChange} value={limit} >
          {limtiSizes.map((size) => (
              <Option key={size} value={size}>
                {size}
              </Option>
            ))}
          </Select>
          {users &&
            <List size='small' style={{ width: "35%", margin: "8px auto" }}
              bordered dataSource={users}
              renderItem={(item, index) => (
                <List.Item>
                 <span>
                    <Checkbox onChange={(e) => checkBoxHandler(item.id , e)} 
                      style={{ float: 'left'}}> User: {index}
                    </Checkbox>

                  </span>
                  <Typography.Text mark>NAME: {item.name}</Typography.Text>  {'\n'} Email: {item.email}
                </List.Item>
              )}
            />}
        </div>
        <Button size='middle' type='primary' disabled={!delUserArray.length >= 1} onClick={onDeleteManyHandler}>Delete Many</Button>
      
        <Pagination current={current} onChange={pageHandler} pageSize={limit} total={total} />
      </div>
    </>
  )
}

export default PageList
