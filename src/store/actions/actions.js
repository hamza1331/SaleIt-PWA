import { 
    login,
    logout,
    closeUserLogin,
    openUserLogin,
    openPostModal,
    closePostModal
} from "./actionNames";

export function openPostModalAction(){
    return dispatch=>{
        dispatch({
            type:openPostModal
        })
    }
}
export function closePostModalAction(){
    return dispatch=>{
        dispatch({
            type:closePostModal
        })
    }
}

export function closeUserLoginAction(){
    return dispatch=>{
        dispatch({
            type:closeUserLogin
        })
    }
}
export function openUserLoginAction(){
    return dispatch=>{
        dispatch({
            type:openUserLogin
        })
    }
}

export function LoginAction(){
    return dispatch=>{
        dispatch({
            type:login
        })
    }
}
export function LogoutAction(){
    return dispatch=>{
        dispatch({
            type:logout
        })
    }
}