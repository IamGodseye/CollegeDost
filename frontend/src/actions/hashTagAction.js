import axios from "axios";
import { API } from "../Components/Part/API";

export const getAllHashtags = () => async(dispatch)=>{
    dispatch({type:'GET_ALL_HASHTAG_REQ'});
    try{
        const response = await axios.get(`${API}/globalposts`);
        console.log(response.data);
        dispatch({type:'GET_ALL_HASHTAG_SUCCESS',payload:response.data})
    }catch(e){
        dispatch({type:'GET_ALL_HASHTAG_FAIL',payload:e})
    }
}

export const getCollegeHashTags = () => async(dispatch)=>{
    dispatch({type:'GET_COLLEGE_HASHTAG_REQ'});
    try{
        const response = await axios.get(`${API}/globalposts`);
        console.log(response.data);
        dispatch({type:'GET_COLLEGE_HASHTAG_SUCCESS',payload:response.data})
    }catch(e){
        dispatch({type:'GET_COLLEGE_HASHTAG_FAIL',payload:e})
    }
}

