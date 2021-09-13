// import React, { useState, useEffect } from 'react'
// import {Pagination} from 'antd'
// import SignUpApiServices from '../../Api/ApiServices'

// const UserPagination = () => {
//     const [users, setUsers] = useState([]);
//     const [current , setCurrent] = useState(1)
//     const [limit] = useState(5);
//     const [perPage] = useState(5)
//     const [pageCount, setPageCount] = useState(1)
//     const [skip, setSkip] = useState(1);

//     const nextPage = () => { 
//         if(users.length > 1) {
//             setSkip(skip + limit) 
//         }
//     console.log('length',users.length)
//     }
//   const previousPage = () => {
//     if (skip > 0) {
//       setSkip(skip - limit)
//     }
//   }

//     useEffect(() => {
//         fetchUsers();
//     }, [skip]);
//     const pageHandler = (page) => {
//         console.log(page);
//         setCurrent(page);
//         setSkip (page + 1);
//     }

//     const fetchUsers = async () => {
//         const fetchUserData = [];

//         await SignUpApiServices.getAPI()        
//             .then(res => {
//                 const resData = res.data;
//                 for (const key in resData) {
//                     fetchUserData.push({
//                         id: resData[key]._id,
//                         name: resData[key].name,
//                         email: resData[key].email
//                     })
//                 }
//                 const sliceData = fetchUserData.slice(skip-1 , (skip-1) + limit);
//                 setUsers(sliceData);
//                 setPageCount(Math.ceil(fetchUserData.length * perPage ))
//                 console.log(pageCount, fetchUserData.length)
//                 console.log('pagination  users: ', fetchUserData)
//             })
//             .catch(err => {
//                 console.log('pagination error', err)
//             })
//     }
//     return (
//         <>
//             <h2> pagination list</h2>
//             <div>
//                 <div>
//                     {users.map((user, index) => (
//                         <li key={index}> {user.name} --- {user.email} </li>
//                     ))}
//                 </div>
//                 {/* <button onClick={previousPage}>{'<'} previous</button>
//                 <button onClick={nextPage}> {'>'}next </button> */}
//                 <Pagination current={current} onChange={pageHandler}    total={pageCount}/>
//             </div>

//         </>
//     )
// }

// export default UserPagination
