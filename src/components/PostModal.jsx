import React from 'react';
import Modal from 'react-responsive-modal';
import { connect } from "react-redux";
import './LoginModal.css'
import firebase from 'firebase'
import { 
    closePostModalAction
 } from "../store/actions/actions";
class PostModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            pw: '',
            imageLinks:[],
            showImages:false
        }
    this.onCloseModal = this.onCloseModal.bind(this)
    this.handlePhotos = this.handlePhotos.bind(this)
    }
    handlePhotos(e){
        for(let i = 0;i<e.target.files.length;i++){
            let src = URL.createObjectURL(e.target.files[i]);
            let oldData = this.state.imageLinks
            oldData.push(src)
            this.setState({
              imageLinks:oldData
            })
          }
          this.setState({
            showImages:true
          })
    }
    onCloseModal() {
        this.props.closePostModal()
    }
    onCloseModalWithLogin(){
        this.props.closeUserLogin()
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (

                <Modal open={this.props.openPost} onClose={this.onCloseModal} little><br /><br />
                    <div style={{height:400,overflowY:'auto',overflowX:'auto'}}>
                        <div className="wrapper">
                            <form className="form-signin">
                                <h2 className="form-signin-heading">Please login</h2>
                                <input value={this.state.email} onChange={e => this.handleChange(e)} type="email" autoComplete='off' className="form-control inp" name="email" placeholder="Email Address" required={true} autoFocus={true} />
                                <input value={this.state.pw} onChange={e => this.handleChange(e)} type="password" className="form-control inp" name="pw" placeholder="Password" required={true} />
                                <br/>
                                <button onClick={e => this.handleLogin(e)} className="btn btn-lg btn-primary btn-block" type="submit">Login</button><br/>
                            </form>
                        </div>
                        <div className='row'>
            {this.state.showImages && this.state.imageLinks.map(imageLink=>{
              return <div>
                <div className='col-md-2'><img width={150} height={100} src={imageLink}/></div>
                <div className='col-md-2'></div>
              </div>
            })}
          </div>
          <input type="file" accept="image/*" multiple onClick={()=>this.setState({imageLinks:[]})} onChange={this.handlePhotos}/>
                    </div>
                </Modal>
    
        
        );
    }
}
function mapStateToProps(state) {
    return ({
        openPost:state.rootReducer.openPost
    })
}
function mapActionToProps(dispatch) {
    return ({
        closePostModal:()=>{
            dispatch(closePostModalAction())
        }
    })
}
export default connect(mapStateToProps, mapActionToProps)(PostModal)