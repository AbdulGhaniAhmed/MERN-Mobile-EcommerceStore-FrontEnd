import axiosInstance from "../helpers/axios"
import { productConstants } from "./constants";

export const addProduct = (form) =>{
    return async dispatch => {
        const res = await axiosInstance.post('/product/create',form);
        if(res.status === 200){

            const {productList} = res.data;

            dispatch({
                type: productConstants.GET_PRODUCT_SUCCESS ,
                payload:{
                    products: productList
                }
            })
    }
}
}