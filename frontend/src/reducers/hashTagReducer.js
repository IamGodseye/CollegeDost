export const getAllHashtagsReducer = (state = { hashTags: [] }, action) => {
    switch (action.type) {
        case 'GET_ALL_HASHTAG_REQ':
            return {
                ...state,
                loading: true
            }
        case 'GET_ALL_HASHTAG_SUCCESS':
            return {
                posts: action.payload,
                loading: false
            }
        case 'GET_ALL_HASHTAG_FAIL':
            return {
                error: action.payload,
                loading: false
            }
        default: return state
    }
}



export const getCollegeHashTagsReducer = (state = { hashTags: [] }, action) => {
    switch (action.type) {
        case 'GET_ALL_HASHTAG_REQ':
            return {
                ...state,
                loading: true
            }
        case 'GET_ALL_HASHTAG_SUCCESS':
            return {
                posts: action.payload,
                loading: false
            }
        case 'GET_ALL_HASHTAG_FAIL':
            return {
                error: action.payload,
                loading: false
            }
        default: return state
    }
}
