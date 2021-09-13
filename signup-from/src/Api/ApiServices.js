import axios from "axios";
import dotenv from 'dotenv'

dotenv.config();
console.log(`api  ${ process.env.REACT_APP_URL }`)

const api = 'http://localhost:4000'
const getAPI = async () =>  {
  return await axios.get(`${api}`);
}
// fetch(`/api/users?limit=${limit}&skip=${skip}`)
 const getUsers = async (limit , skip) => {
   return await axios.get(`${api}/users?limit=${limit}&skip=${skip}`);
 }


const createAPI = async(userData) => {
    return await axios.post(`${api}`, userData)
}
const deleteAPI = async (id) => {
    return await axios.delete(`${api}/${id}`)
}
const putAPI = async (id, email) => {
    return await axios.put(`${api}/${id}`, email);
  };

export default {
    getAPI ,
    createAPI,
    deleteAPI,
    putAPI,
    getUsers
};

