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
        <div className='log'>
        <Modal open={this.props.showAd} onClose={this.onCloseModal} little><br /><br />
            {this.props.showAd && <div className="wrapper">
                <h2 style={{textAlign:'center',textDecoration:'underline'}}>{this.props.renderAd.adTitle}</h2>
                <Carousel autoPlay={true}>
  {this.props.renderAd.downlaodUrls.map((image,index)=>{
      return <Carousel.Item key={index}>
      <a href={image} target='_blank'> <img width={400} height={200} alt="900x500" src={image} /></a>
      </Carousel.Item>
  })}
</Carousel>
<br/><br/><br/><br/><h2>Hello</h2>
            </div>}
        </Modal>
      </div>
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
