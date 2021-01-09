import { categoryConstants } from "../actions/constants"

const initialState = {
    categories:[],
    loading:false,
    error:null
}

// after adding category we want to show categories without refreshing page 
const buildNewCategories = (parentId,categories,category) => {
    let myCategories = [];
    for(let cat of categories){
        if(cat._id == parentId){
            myCategories.push({
                ...cat,
                children: cat.children && cat.children.length > 0 ? buildNewCategories(parentId,[...cat.children,{
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children
                }],category) : []
            }) ;
        }else{
        myCategories.push({
            ...cat,
            children: cat.children && cat.children.length > 0 ? buildNewCategories(parentId,cat.children,category) : []
        })}
    }
    return myCategories;
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
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
        // after adding category we want to show categories without refreshing page
            const categories = action.payload.category;
            const updatedCategories =  buildNewCategories(categories.parentId,state.categories,categories)
            console.log('Updated Categories',updatedCategories)
            state = {
                ...state,
                categories: updatedCategories,
                loading:false,
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
        state = {
          ...initialState
            }
        break;
    }
    return state;
}