
import axiosInstance from "../helpers/axios"
import { authConstants } from "./constants"

export const login = (user) =>{
    console.log(user)
    return async (dispatch)=>{

        dispatch({type: authConstants.LOGIN_REQUEST,});
        //axios call
        const res = await axiosInstance.post('/admin/signin',{
            ...user
        })
        if(res.status === 200){
            const {token,user} = res.data;
            //here we are storing the token in local storage beacause if user reload the page so we can access to token from local-storage 
            localStorage.setItem('token',token);
            localStorage.setItem('user',JSON.stringify(user));
            dispatch({
                type:authConstants.LOGIN_SUCCESS,
                payload:{
                    token,user
                }
            })
        }
        if(res.status === 400){
            dispatch({
                type:authConstants.LOGIN_FAILURE,
                payload:{error:res.data.error}
            })
        }
    }
}

//After login when we again go to provious/signin page our data an dtoken get null so in order to safe our
//token we we making a function and then passing it to useEffect() function in signin component
export const isUserLoggedIn = () =>{
    return async dispatch =>{
        const token = localStorage.getItem('token');
        if(token){
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type:authConstants.LOGIN_SUCCESS,
                payload:{
                    token,user
                }
            });
        }else{
            dispatch({
                payload:{
                    type:authConstants.LOGIN_FAILURE,
                    payload:{error:'Failed to login'}
                }
            })
        }
    }
}