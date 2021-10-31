import axios from 'axios';
import {API} from '../Components/Part/API';

export const getAllPosts = () => async(dispatch)=>{
    dispatch({type:'GET_ALL_POST_REQ'});
    try{
        const response = await axios.get(`${API}/globalposts`);
        console.log(response.data.posts);
        dispatch({type:'GET_ALL_POST_SUCCESS',payload:response.data.posts})
    }catch(e){
        dispatch({type:'GET_ALL_POST_FAIL',payload:e})
    }
}


export const addAllPost = () => async(dispatch)=>{
    dispatch({type:'ADD_ALL_POST_REQ'});
    try{
        const response = await axios.post(`${API}/createglobalpost`);
        console.log(response.data.posts);
        dispatch({type:'ADD_ALL_POST_SUCCESS',payload:response.data.posts});
    }catch(e){
        dispatch({type:'ADD_ALL_POST_FAIL',payload:e});
    }
}


export const getRecentAllPosts = () => async(dispatch) =>{
    dispatch({type:'GET_RECENTPOST_ALL_REQ'});
    try{
        const response = await axios.get(`${API}/getRecentUnivPosts`);
        console.log(response.data);
        dispatch({type:'GET_RECENTPOST_ALL_SUCCESS',payload:response.data});
    }catch(e){
        dispatch({type:'GET_RECENTPOST_ALL_FAIL',payload:e});
    }
}