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
    putAd,
    search,
    resetSearch
} from "../actions/actionNames";
const initialState = {
    isLoggedIn:false,
    openLogin:false,
    openPost:false,
    ads:[],
    loadingAds:true,
    showAd:false,
    renderAd:{},
    oldAds:[],
    searched:false
}

export default (state = initialState,action)=>{
    switch(action.type){
        case login:
        return {...state,isLoggedIn:true}
        case addPost:
        return {...state,
            ads:[...state.ads,action.payload]
        }
        case search:
        let olds = state.ads
        let updatedAds = state.ads.filter(ad=>{
            return ad.adTitle.toLowerCase().indexOf(action.payload.toLowerCase())>=0
        })
        return{...state,oldAds:olds,ads:updatedAds,searched:true}
        case resetSearch:
        return{...state,ads:state.oldAds,searched:false}
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