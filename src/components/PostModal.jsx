import React from 'react';
import Modal from 'react-responsive-modal';
import { connect } from "react-redux";
import './LoginModal.css'
import Compress from 'compress.js'
import firebase from 'firebase'
import { 
    closePostModalAction,
    addPostAction
 } from "../store/actions/actions";
class PostModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageLinks:[],
            showImages:false,
            adTitle:'',
            adCategory:'Uncategorized',
            price:'',
            address:'',
            location:'',
            description:'',
            downlaodUrls:[],
            images:[],
            contact:'',
            email:'',
            name:'',
            randomAdId:'ad'+Math.round(Math.random()*100000),
            showLoading:false
        }
        this.baseState = this.state
    this.onCloseModal = this.onCloseModal.bind(this)
    this.handlePhotos = this.handlePhotos.bind(this)
    this.clearState = this.clearState.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.removePhoto = this.removePhoto.bind(this)
    this.handleAdSubmission = this.handleAdSubmission.bind(this)
    this.pictureUpload = this.pictureUpload.bind(this)
    }
    handlePhotos(e){
        for(let i = 0;i<e.target.files.length;i++){
            let photos = this.state.images
            photos.push(e.target.files[i])
            this.setState({
                images:photos
            })
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
    clearState(){
        this.setState(this.baseState)
    }
    pictureUpload(e){
        e.preventDefault()
        this.setState({
            showLoading:true
        })
        const files = this.state.images
        let compress = new Compress()
  compress.compress(files, {
    size: 1, // the max size in MB, defaults to 2MB
    quality: .75, // the quality of the image, max is 1,
    maxWidth: 1024, // the max width of the output image, defaults to 1920px
    maxHeight: 768, // the max height of the output image, defaults to 1920px
    resize: true, // defaults to true, set false if you do not want to resize the image width and height
  }).then((data) => {
    data.forEach((img,index)=>{
    const base64str = img.data
    const imgExt = img.ext
    const file = Compress.convertBase64ToFile(base64str, imgExt)
    var storageRef = firebase.storage().ref(`olxPix/${this.state.randomAdId}/${index}`)
    //upload the file
     var task = storageRef.put(file);
    task.on('state_changed', function(snapshot){
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//   console.log('Upload is ' + progress.toFixed(2) + '% done');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
    //   console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
    //   console.log('Upload is running');
      break;
  }
}, function(error) {
    alert(error.message)
}, ()=> {
   task.snapshot.ref.getDownloadURL().then((downloadURL)=> {
    let oldUrls = this.state.downlaodUrls
    oldUrls.push(downloadURL)
    this.setState({
        downlaodUrls:oldUrls
                 })
    if(this.state.downlaodUrls.length===this.state.imageLinks.length){
        this.handleAdSubmission()
    }
                });
             })
         })
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
    removePhoto(e){
        let newData = this.state.imageLinks.filter((imageLink,index)=>index!==parseInt(e.target.id))
        this.setState({
            imageLinks:newData
        })
        let photos = this.state.images.filter((image,index)=>index!==parseInt(e.target.id))
        this.setState({
            images:photos
        })
    }
    handleAdSubmission(){
        let adDataFinal = {
            ...this.state
        }
        delete adDataFinal.imageLinks
        delete adDataFinal.images
        delete adDataFinal.showImages
        delete adDataFinal.showLoading
         let firebaseDataRef = firebase.database().ref('saleitAds')
         firebaseDataRef.push(adDataFinal).then(()=>{
             this.props.addPost(adDataFinal)
                this.clearState()
                this.setState({
                    showLoading:false
                })
                this.props.closePostModal()
        }).catch(err=>alert(err))
    }
    render() {
        if(!this.state.showLoading){  
            return (
                <Modal open={this.props.openPost} onClose={this.onCloseModal} little><br /><br />
                <div style={{height:400,overflowY:'auto',overflowX:'auto'}}>
                    <div className="wrapper">
                        <form className="form-signin">
                            <h2 className="form-signin-heading" style={{textAlign:'center',textDecoration:'underline'}}>ENTER AD DETAILS</h2>
                            <br/>
                        <input value={this.state.adTitle} onChange={this.handleChange} type="text" autoComplete='off' className="form-control inp" name="adTitle" placeholder="Enter Ad Title" required={true} autoFocus={true} /> <br/>
                        <textarea value={this.state.description} onChange={this.handleChange} name="description" style={{resize:'none'}} placeholder='Product Description' cols="30" rows="3" className='form-control inp'></textarea><br/>
                        <select value={this.state.adCategory}  className="form-control inp" onChange={e=>this.setState({
                                adCategory:e.target.value
                            })
                        } name="cat">
                        <option value="Uncategorized">---SELECT A CATEGORY---</option>
                        <option value="Mobile">Mobile Phone</option>
                        <option value="Computer">Computer / Laptops</option>
                        <option value="Camera">Camera</option>
                        </select> <br/> <br/>
                        <span style={{fontWeight:'bolder'}}>PKR: <input value={this.state.price} onChange={this.handleChange} type="number" min='0' autoComplete='off' className="form-control inp" name="price" placeholder="Price" required={true} /></span> <br/>                                                 
                        <input value={this.state.address} onChange={this.handleChange} type="text" autoComplete='off' className="form-control inp" name="address" placeholder="Enter Address" required={true} /> <br/>   
                        <input value={this.state.location} onChange={this.handleChange} type="text" autoComplete='off' className="form-control inp" name="location" placeholder="Enter City" required={true} /> <br/>    
                        <input type='text' placeholder='Contact Name' name='name' value={this.state.name} onChange={this.handleChange} autoComplete='off' required={true} className='form-control inp'/><br/>
                        <input type='text' placeholder='Contact Number (+923XX1234567)' value={this.state.contact} required={true} name='contact' onChange={this.handleChange} autoComplete='off' className='form-control inp'/><br/>
                        <input type="email" name="email" placeholder='Email' value={this.state.email} onChange={this.handleChange} autoComplete='off' className='form-control inp' required={true}/><br/><br/>
                    <div>
                        {this.state.showImages && this.state.imageLinks.map((imageLink,index)=>{
                            return <img onClick={this.removePhoto} id={index} key={index} style={{margin:5}} width={150} height={100} src={imageLink}/>
                        })}

                    </div>
                        <input type="file" accept="image/*" multiple onClick={()=>this.setState({imageLinks:[]})} onChange={this.handlePhotos}/>
                        <br/><br/> 
                        <button onClick={this.pictureUpload} className="btn btn-lg btn-success btn-block" type="submit">SUBMIT ADD</button><br/>
                        </form>
                    </div>
                </div>
            </Modal>
            );
        }
        return(
            <Modal open={this.state.showLoading} little><br/><br/>
            <h2 style={{textAlign:'center',textDecoration:'underline',fontWeight:'bolder'}}>Uploading Data</h2>
            <img style={{width:200}} src='https://loading.io/spinners/hourglass/lg.sandglass-time-loading-gif.gif'/>
            </Modal>
        )
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
        },
        addPost:(ad)=>{
            dispatch(addPostAction(ad))
          }
    })
}
export default connect(mapStateToProps, mapActionToProps)(PostModal)