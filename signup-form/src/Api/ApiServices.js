import axios from "axios";
import dotenv from 'dotenv'

dotenv.config();
console.log(`api  ${ process.env.REACT_APP_URL }`)

//const api = 'http://localhost:4000'
const getAPI = async () =>  {
  return await axios.get(`${process.env.REACT_APP_URL}`);
}
// fetch(`/api/users?limit=${limit}&skip=${skip}`)
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
const deleteManyAPI = async (data) => {
  return await axios.delete(`${process.env.REACT_APP_URL}`, data)
}
const putAPI = async (id, email) => {
    return await axios.put(`${process.env.REACT_APP_URL}/${id}`, email);
  };

export default {
    getAPI ,
    createAPI,
    deleteAPI,
    putAPI,
    getUsers,
    getUserByName,
    deleteManyAPI
};

