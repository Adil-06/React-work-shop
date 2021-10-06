import { createSlice} from '@reduxjs/toolkit';
import SignUpApiServices from '../Api/ApiServices'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userList: []
  },
  reducers: {
    setUsers(state, action) {
          state.userList = state.userList.concat(action.payload.fetchUser)
    },
    setRemoveUser (state, action) {
        let index = state.userList.findIndex((id) => id._id === action.payload.removeId);
      state.userList.splice(index, 1);
    },
    setUpdatedUsers (state, action) {
      let index = state.userList.findIndex((id) => id._id === action.payload.updateId);
      state.userList[index] = action.payload.updatedUsers
    }
  }  
});


export const getAllUserAsync = () => {
  return async (dispatch) => {
    const fetchAllUser = async () => {
      const response = await SignUpApiServices.getAPI()
      const data = response.data;
      console.log('get users', data.length)
      return data;
    }
    try {
      const fetchUser = await fetchAllUser();
      dispatch(userActions.setUsers({ fetchUser }))
    }
    catch (err) { console.log("error in get call", err.message) }
  }
}
export const postNewUserAsync = (userData) => {
  //console.log('posted user',userData)
  const postdata = userData
  return async(dispatch) => {
    const createNewUser = async () => {
      const respone = await SignUpApiServices.createAPI(postdata);
      const postResData = respone.data;
      return postResData;
    }
    try{
       const fetchUser = await createNewUser()
       dispatch(userActions.setUsers({fetchUser}))
    }
    catch (err) { console.log('error in postcall', err.message)  }

  }
}

export const deleteUserAsync = (id) => {
  const delID = id
  //console.log('del id', delID)
  return async(dispatch) => {
    const removeUser = async () => {
      await SignUpApiServices.deleteAPI(delID)
      return delID;
    }
    try {
    const removeId = await removeUser();
     dispatch(userActions.setRemoveUser({removeId}));
    }
    catch(err) { console.log('error in delete call', err)}
  }  

}
export const updateUserAsync = (id, data) => {
  const updateId = id;
  const updateData = data
  //console.log(updateId, updateData.name , updateData.email)

  return async(dispatch) => {
    const putUser = async () => {
      const response = await SignUpApiServices.putAPI(updateId,updateData)
      const updateResponse = response.data;
      return updateResponse;
    }
    try {
     const updatedUsers = await putUser();
     dispatch(userActions.setUpdatedUsers({updatedUsers, updateId}))     
    }
    catch(err) { console.log('error in update call')}
  }
}

export const userActions = userSlice.actions;
export default userSlice