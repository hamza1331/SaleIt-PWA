import { 
    login,
    logout,
    openUserLogin,
    closeUserLogin,
    openPostModal,
    closePostModal,
    addPost,
    doneLoadingAds,
    showAdModal,
    hideAdModal,
    putAd
} from "../actions/actionNames";
import { bindActionCreators } from "C:/Users/Waqas/AppData/Local/Microsoft/TypeScript/2.9/node_modules/redux";
const initialState = {
    isLoggedIn:true,
    openLogin:false,
    openPost:false,
    ads:[],
    loadingAds:true,
    showAd:false,
    renderAd:{}
}

export default (state = initialState,action)=>{
    switch(action.type){
        case login:
        return {...state,isLoggedIn:true}
        case addPost:
        return {...state,
            ads:[...state.ads,action.payload]
        }
        case putAd:
        return {...state,renderAd:state.ads[action.payload]}
        case doneLoadingAds:
        return {...state,loadingAds:false}
        case showAdModal:
        return {...state,showAd:true}
        case hideAdModal:
        return {...state,showAd:false}
        case logout:
        return {...state,isLoggedIn:false}
        case openPostModal:
        return {...state,openPost:true}
        case closePostModal:
        return {...state,openPost:false}
        case openUserLogin:
        return {...state,openLogin:true}
        case closeUserLogin:
        return {...state,openLogin:false}
        default:
        return state
    }
}