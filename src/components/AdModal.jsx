import React, { Component } from 'react'
import { connect } from "react-redux";
import { hideAdModalAction } from "../store/actions/actions";
import Modal from 'react-responsive-modal';
import { Carousel } from "react-bootstrap";
class AdModal extends Component {
    constructor(props){
        super(props)
        this.onCloseModal = this.onCloseModal.bind(this)
    }
    onCloseModal(){
        this.props.hideAdModal()
    }
  render() {
      console.log(this.props.renderAd)
    return (
        <Modal open={this.props.showAd} onClose={this.onCloseModal} little><br /><br />
        <div className='log' style={{height:400,overflowY:'auto',overflowX:'auto'}}>
            {this.props.showAd && <div className="wrapper">
                <h2 style={{textAlign:'center',textDecoration:'underline'}}>{this.props.renderAd.adTitle}</h2>
                <Carousel autoPlay={true}>
  {this.props.renderAd.downlaodUrls.map((image,index)=>{
      return <Carousel.Item key={index}>
      <a href={image} target='_blank'> <img className='img-responsive' height={200} alt="900x500" src={image} /></a>
      </Carousel.Item>
  })}
</Carousel>
<br/><br/><br/><br/>
  <h3>Category: {this.props.renderAd.adCategory}</h3>
  <h3>Product Desciption {this.props.renderAd.description}</h3>
  <h3>City: {this.props.renderAd.location}</h3>
  <h3>Price: Rs.{this.props.renderAd.price}</h3>
  <h2 style={{textAlign:'center',textDecoration:'underline'}}>Contact Details</h2><br/>
  <h3>Contact Name: {this.props.renderAd.name}</h3>
  <h3>Address: {this.props.renderAd.address}</h3>
  <h3>Contact# {this.props.renderAd.contact}</h3>
  <h3>Email: {this.props.renderAd.email}</h3>

            </div>}
      </div>
        </Modal>
    )
  }
}
function mapStateToProps(state){
    return({
        showAd:state.rootReducer.showAd,
        renderAd:state.rootReducer.renderAd
    })
  }
  
  function mapActionsToProps(dispatch){
    return({
        hideAdModal:()=>{
            dispatch(hideAdModalAction())
        }
    })
  }
  export default connect(mapStateToProps,mapActionsToProps)(AdModal)
