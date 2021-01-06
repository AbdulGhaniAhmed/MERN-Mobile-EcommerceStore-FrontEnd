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
            if(res.status === 400){
                dispatch({
                    type: categoryConstants.GET_CATEGORY_FAILURE,
                    payload:{
                        error: res.data.error
                    }
                })
            }
        }
    }
}