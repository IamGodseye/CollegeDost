export const getResourcesReducer = (state={resources:[]},action)=>{
    switch(action.type){
        case 'GET_UNIV_RESOURCES_REQ':
            return {
                ...state,
                loading:true
            }
        case 'GET_UNIV_RESOURCES_SUCCESS':
            return {
                resources:action.payload,
                loading:false
            }
        case 'GET_UNIV_RESOURCES_FAIL':
            return {
                error:action.payload,
                loading:false
            }   
        default: return state     
    }
}

export const addResourcesReducer = (state={},action) =>{
    switch (action.type) {
        case 'ADD_RESOURCES_REQUEST':
            return {
                loading: true
            }
        case 'ADD_RESOURCES_SUCCESS':
            return {
                loading: false,
                success: true
            }
        case 'ADD_RESOURCES_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}