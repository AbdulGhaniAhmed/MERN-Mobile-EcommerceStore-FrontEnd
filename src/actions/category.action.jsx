import axiosInstance from "../helpers/axios"
import { categoryConstants } from "./constants";

export const getAllCategory = () =>{

    return async dispatch=>{

        dispatch({
            type: categoryConstants.GET_CATEGORY_REQUEST
        })
        const res = await axiosInstance.get('/category/display');
        console.log(res)

        if(res.status === 200){

            const {categoryList} = res.data;

            dispatch({
                type: categoryConstants.GET_CATEGORY_SUCCESS,
                payload:{
                    categories: categoryList
                }
            })
        }else{
                dispatch({
                    type: categoryConstants.GET_CATEGORY_FAILURE,
                    payload:{
                        error: res.data.error
                    }
                })     
        }
    }
}

export const addCategory = (form) => {
    return async dispatch => {
        dispatch({type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
        const res = await axiosInstance.post(`/category/create`,form);
        if(res.status === 200){
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
    // after adding category we want to show categories without refreshing page so we put payload in object form 
    // further changes in reducer        
                payload:{category: res.data.category}
            })
        }
        else{
            if(res.status === 400)
            {dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                payload: res.data.error
            });}
        }
    }
}