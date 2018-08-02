import React from 'react';
import Modal from 'react-responsive-modal';
import { connect } from "react-redux";
import './LoginModal.css'
import firebase from 'firebase'
import { 
    closeUserLoginAction,
    LoginAction
 } from "../store/actions/actions";
class LoginModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            pw: ''
        }
        this.onCloseModal = this.onCloseModal.bind(this)
    }


    onCloseModal() {
        this.props.closeUserLogin()
    }
    onCloseModalWithLogin(){
        this.props.closeUserLogin()
        this.props.login()
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRegister(e) {
        e.preventDefault()
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pw).then(() => {
            console.log('user created succesfully')

            this.setState({
                email: '',
                pw: ''
            })
            this.onCloseModalWithLogin()
        }).catch(function (error) {
            // Handle Errors here.
            // var errorCode = error.code;
            // let errorMessage = error.message;
            // ...
            // alert(errorMessage)
        });
    }
    handleLogin(e) {
        e.preventDefault()
        this.setState({
            loading:true
        })
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pw).then(() => {
            this.setState({
                email: '',
                pw: ''
            })
            this.onCloseModalWithLogin()
        }).catch(function (error) {
            alert(error.message)

        });
    }
    render() {
        return (
              <div className='log'>
                <Modal open={this.props.openLogin} onClose={this.onCloseModal} little><br /><br />
                    <div className="wrapper">
                        <form className="form-signin">
                            <h2 className="form-signin-heading">Please login</h2>
                            <input value={this.state.email} onChange={e => this.handleChange(e)} type="email" autoComplete='off' className="form-control inp" name="email" placeholder="Email Address" required={true} autoFocus={true} />
                            <input value={this.state.pw} onChange={e => this.handleChange(e)} type="password" className="form-control inp" name="pw" placeholder="Password" required={true} />
                            <br/>
                            <button onClick={e => this.handleLogin(e)} className="btn btn-lg btn-primary btn-block" type="submit">Login</button><br/>
                            <button onClick={e => this.handleRegister(e)} className="btn btn-lg btn-info btn-block" type="submit">REGISTER</button>
                        </form>
                    </div>
                </Modal>
              </div>
        
        );
    }
}
function mapStateToProps(state) {
    return ({
        // open: state.rootReducer.open,
        openLogin:state.rootReducer.openLogin
    })
}
function mapActionToProps(dispatch) {
    return ({
        closeUserLogin:()=>{
            dispatch(closeUserLoginAction())
        },
        login:()=>{
            dispatch(LoginAction())
        }
    })
}
export default connect(mapStateToProps, mapActionToProps)(LoginModal)