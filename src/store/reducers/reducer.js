import { 
    login,
    logout,
    openUserLogin,
    closeUserLogin,
    openPostModal,
    closePostModal
} from "../actions/actionNames";
const initialState = {
    isLoggedIn:true,
    openLogin:false,
    openPost:false
}

export default (state = initialState,action)=>{
    switch(action.type){
        case login:
        return Object.assign({},state,{
            isLoggedIn:true
        })
        case logout:
        return Object.assign({},state,{
            isLoggedIn:false
        })
        case openPostModal:
        console.log('inside reducer..')
        return Object.assign({},state,{
            openPost:true
        })
        case closePostModal:
        return Object.assign({},state,{
            openPost:false
        })
        case openUserLogin:
        return Object.assign({},state,{
            openLogin:true
        })
        case closeUserLogin:
        return Object.assign({},state,{
                openLogin:false
        })

        default:
        return state
    }
}