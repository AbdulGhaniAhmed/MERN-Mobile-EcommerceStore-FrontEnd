import axiosInstance from "../helpers/axios";
import { initialDataConstants , categoryConstants , productConstants } from "./constants";

//creating this action to call/render all api's once otherwise we have to use "useEffect" gain and again
//in app.js

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axiosInstance.post("/initialData");
    if (res.status === 200) {
      const { categories, products } = res.data;
      dispatch({
          type: categoryConstants.GET_CATEGORY_SUCCESS,
          payload:{ categories }
      });
      dispatch({
          type: productConstants.GET_PRODUCT_SUCCESS,
          payload:{ products }
      })
    }
    console.log(res)
  };
};
