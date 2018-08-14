import { 
    login,
    logout,
    closeUserLogin,
    openUserLogin,
    openPostModal,
    closePostModal,
    addPost,
    doneLoadingAds,
    showAdModal,
    hideAdModal,
    putAd,
    search,
    resetSearch
} from "./actionNames";

export function searchAction(text){
    return dispatch=>{
        dispatch({
            type:search,
            payload:text
        })
    }
}

export function resetSearchAction(){
    return dispatch=>{
        dispatch({
            type:resetSearch
        })
    }
}

export function addPostAction(ad){
    return dispatch=>{
        dispatch({
            type:addPost,
            payload:ad
        })
    }
}

export function putAdAction(index){
    return dispatch=>{
        dispatch({
            type:putAd,
            payload:index
        })
    }
}

export function showAdModalAction(){
    return dispatch=>{
        dispatch({
            type:showAdModal
        })
    }
}
export function hideAdModalAction(){
    return dispatch=>{
        dispatch({
            type:hideAdModal
        })
    }
}
export function doneLoadingAdsAction(){
    return dispatch=>{
        dispatch({
            type:doneLoadingAds
        })
    }
}

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