import React, { Component } from 'react';
import Search from './Search'
import Ads from './Ads'
import './App.css'
import firebase from 'firebase'
import { 
  openUserLoginAction,
  LogoutAction,
  openPostModalAction
 } from "../store/actions/actions";
import PostModal from './PostModal'
import LoginModal from './LoginModal'
import { connect } from "react-redux";
class App extends Component {
  constructor(props){
    super(props)
    this.handleSignout = this.handleSignout.bind(this)
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
  }
  handleSignout(){
    firebase.auth().signOut().then(()=>this.props.logout()).catch(err=>alert(err.message))
  }
  render() {
    return (
      <div>
        {!(this.props.openLogin ||this.props.openPost) && 
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
          
      </div>
    );
  }
}
function mapStateToProps(state){
  return({
    isLoggedIn:state.rootReducer.isLoggedIn,
    openLogin:state.rootReducer.openLogin,
    openPost:state.rootReducer.openPost
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
      }
  })
}

export default connect(mapStateToProps,mapActionsToProps)(App);
