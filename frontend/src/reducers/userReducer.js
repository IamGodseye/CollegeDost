export const getUser = (state={user:{}},action)=>{
    switch(action.type){
        case 'GET_USER_REQ':
            return {
                ...state,
                loading:true
            }
        case 'GET_USER_SUCCESS':
            return {
                posts:action.payload,
                loading:false
            }
        case 'GET_USER_FAIL':
            return {
                error:action.payload,
                loading:false
            }   
        default: return state     
    }
}