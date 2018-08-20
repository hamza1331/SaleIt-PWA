import React, { Component } from 'react';
import Search from './Search'
import Ads from './Ads'
import AdModal from './AdModal'
import './App.css'
import firebase from 'firebase'
import { 
  openUserLoginAction,
  LogoutAction,
  openPostModalAction,
  addPostAction,
  doneLoadingAdsAction
 } from "../store/actions/actions";
import PostModal from './PostModal'
import LoginModal from './LoginModal'
import { connect } from "react-redux";
class App extends Component {
  constructor(props){
    super(props)
    this.handleSignout = this.handleSignout.bind(this)
    this.grabAdsFromFirebase = this.grabAdsFromFirebase.bind(this)
  }
  componentWillMount(){
      if(!firebase.apps.length){
        var config = {
          apiKey: "AIzaSyDevJziMzAlMpErfarI9Q1DcBGU6JF-EF8",
          authDomain: "explorefirebase-80b58.firebaseapp.com",
          databaseURL: "https://explorefirebase-80b58.firebaseio.com",
          projectId: "explorefirebase-80b58",
          storageBucket: "explorefirebase-80b58.appspot.com",
          messagingSenderId: "994024778201"
        };
        firebase.initializeApp(config);
      }
      const messaging = firebase.messaging()
messaging.requestPermission().then(function(){
    console.log('permission granted...')
    return messaging.getToken()
})
.then(function(token){
  let same = false
  let firebaseNotificationsKeys = firebase.database().ref('saleitNotification')
  firebaseNotificationsKeys.once('value',snap=>{
  snap.forEach(Key=>{
    let dataRef = firebaseNotificationsKeys.child(Key.ref.key).key
    let data = snap.child(dataRef).val()
    if(data===token){
      same = true
    }
  })

  }).then(()=>{
    if(same===false)
    firebaseNotificationsKeys.push(token) 
  })
  console.log(token)
})
.catch(function(err){
    console.log(err)
})

messaging.onMessage(function(payload){
    console.log(payload)
})
      this.grabAdsFromFirebase()
    
  }
  grabAdsFromFirebase(){
      let firebaseRef = firebase.database().ref('saleitAds')
      firebaseRef.once('value',snap=>{
      snap.forEach((Key)=>{
        let dataRef = firebaseRef.child(Key.ref.key).key
        let ad = snap.child(dataRef).val()
        this.props.addPost(ad)
      })
    }).then(()=>{
      this.props.doneLoadingAds()
    })
  }
  handleSignout(){
    firebase.auth().signOut().then(()=>this.props.logout()).catch(err=>alert(err.message))
  }
  render() {
    return (
      <div>
        {!(this.props.openLogin ||this.props.openPost || this.props.showAd) && 
        <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a  className="navbar-brand" style={{fontSize:"28px"}}>SALE !T</a>
          </div>
          {!this.props.isLoggedIn && <p className="navbar-text" style={{fontSize:16,color:'white',marginRight:30}}><marquee scrollamount="12">YOU MUST LOGIN TO POST AN AD</marquee></p>}
          <ul className="nav navbar-nav navbar-right">
          {!this.props.isLoggedIn && <button onClick={()=>this.props.openUserLogin()} className="btn btn-info navbar-btn">LOGIN</button>}
            {this.props.isLoggedIn && <button onClick={this.handleSignout} className="btn btn-danger navbar-btn">LOGOUT</button>}
          </ul>
        </div>
      </nav>}
        
          <br/>
          <br/>
          <br/>
          {this.props.isLoggedIn && 
          <div className='text-center'><button onClick={()=>this.props.openPostModal()} className="btn btn-xlarge btn-warning">POST AN AD</button></div>
        }
          <br/>
          <br/>
          <Search/>
          <h1 style={{textAlign:'center',textDecoration:'underline',marginBottom:20,border:'none'}}>POSTED ADS</h1>
          <Ads/>
          <LoginModal/>
          <PostModal/>
          <AdModal/>
      </div>
    );
  }
}
function mapStateToProps(state){
  return({
    isLoggedIn:state.rootReducer.isLoggedIn,
    openLogin:state.rootReducer.openLogin,
    openPost:state.rootReducer.openPost,
    showAd:state.rootReducer.showAd
  })
}

function mapActionsToProps(dispatch){
  return({
      openUserLogin:()=>{
        dispatch(openUserLoginAction())
      },
      logout:()=>{
        dispatch(LogoutAction())
      },
      openPostModal:()=>{
        dispatch(openPostModalAction())
      },
      addPost:(ad)=>{
        dispatch(addPostAction(ad))
      },
      doneLoadingAds:()=>{
        dispatch(doneLoadingAdsAction())
      }
  })
}

export default connect(mapStateToProps,mapActionsToProps)(App);
