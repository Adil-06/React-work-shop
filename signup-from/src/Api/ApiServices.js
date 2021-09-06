import axios from "axios";
import dotenv from 'dotenv'

dotenv.config()

const api = 'http://localhost:4000'
const getAPI = async () =>  {
  return await axios.get(`${api}/user`);
}

const createAPI = async(userData) => {
    return await axios.post(`${api}/user`, userData)
}
const deleteAPI = async (id) => {
    return await axios.delete(`${api}/user/${id}`)
}
const putAPI = async (id, email) => {
    return await axios.put(`${api}/user/${id}`, email);
  };

export default {
    getAPI ,
    createAPI,
    deleteAPI,
    putAPI
};

