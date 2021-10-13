import axios from "axios";
import dotenv from 'dotenv'

dotenv.config();
console.log(`api  ${ process.env.REACT_APP_URL }`)

const getAPI = async () =>  {
  return await axios.get(`${process.env.REACT_APP_URL}`);
}

 const getUsers = async (limit , skip, name) => {
   return await axios.get(`${process.env.REACT_APP_URL}/users?limit=${limit}&skip=${skip}&name=${name}`);
 }
const getUserByName = async (name) => {
  console.log("get find req" , name)
  return await axios.get(`${process.env.REACT_APP_URL}/api?name=${name}`)
}

const createAPI = async(userData) => {
    return await axios.post(`${process.env.REACT_APP_URL}`, userData)
}
const deleteAPI = async (id) => {
    return await axios.delete(`${process.env.REACT_APP_URL}/${id}`)
}
const deleteManyAPI = async (removeArray) => {
  return await axios.delete(`${process.env.REACT_APP_URL}`, {data: removeArray})
}
const putAPI = async (id, updatedUser) => {
  return await axios.put(`${process.env.REACT_APP_URL}/${id}`, {data: updatedUser});
};
// const putAPI = async (id, email) => {
//     return await axios.put(`${process.env.REACT_APP_URL}/${id}`, email);
//   };

export default {
    getAPI ,
    createAPI,
    deleteAPI,
    putAPI,
    getUsers,
    getUserByName,
    deleteManyAPI
};
