// import React, { useState, useEffect, useCallback } from 'react'
// import {Pagination} from 'antd'
// import SignUpApiServices from '../../Api/ApiServices'


// const AntPagination = () => {   
    
//     const [offset , setOffSet] = useState(0);
//     const [currentPageElements , setCurrentPgElement] = useState([]);
//     const [elementPerPage ] = useState(3);
//     const [PageCount, setPageCount] = useState(1);
//     const [AllElement , setAllElement] = useState([]);
//     const [totalElementcount , setTotalElementCount] = useState(0);
  
    
//     const fetchUsers = async () => {     
//       const fetchUserData = [];
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
//                  setAllElement(fetchUserData);
//                 setTotalElementCount(fetchUserData.length);
//                 setPaginationState();
//              console.log('allements and length: ', AllElement , totalElementcount);
//             })           
//             .catch(err => { console.log('pagination error', err)  })
//     }
//     const setPaginationState = async () => {
//      await setPageCount(Math.ceil(totalElementcount/elementPerPage));
//       console.log('page count', PageCount);
//      await setElementsForCurrentPage();
//     }
//     const setElementsForCurrentPage = async () => {
//       const currentPageElements = AllElement.slice(offset, offset + elementPerPage);
//      await setCurrentPgElement(currentPageElements)
//       console.log('current element', currentPageElements)
//     }
//     const handlePageClick = useCallback( async(pageNumber) => {
//       const currentPage = pageNumber - 1;
//       const offset = currentPage * elementPerPage;
//     await  setOffSet(offset, () => {
//         setElementsForCurrentPage()
//       })
//     } ,[offset] );

//     useEffect(() => {
//       fetchUsers();
//   }, [offset]);

//     return (
//         <>
//             <button onClick={fetchUsers}>get user</button>
//             <h2> pagination list</h2>
//             <div>
//                 <div>
//                     {currentPageElements.map((user, index) => (
//                         <li key={index} style={{listStyle:'none'}}> {user.name} --- {user.email} </li>
//                     ))}
//                 </div>
//                 <Pagination
//                         defaultCurrent={1}
//                         onChange={handlePageClick}
//                         size="small"
//                         total={totalElementcount}
//                         pageSize={elementPerPage}
//                         showSizeChanger={false}
//                     />
//             </div>

//         </>
//     )
// }

// export default AntPagination
