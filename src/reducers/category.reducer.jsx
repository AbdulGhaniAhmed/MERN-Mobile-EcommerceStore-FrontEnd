import { categoryConstants } from "../actions/constants"

const initialState = {
    categories:[],
    loading:false,
    error:null
}

export default (state=initialState,action) => {
    switch(action.type){
        case categoryConstants.GET_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading:false,
                categories: action.payload.categories
            }
            break;
    }
    return state;
}