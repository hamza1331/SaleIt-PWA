import React, { Component } from 'react'
import { connect } from "react-redux";
class Ads extends Component {
    render() {
        return (
            <div className='container' style={{height:800,overflowY:'auto',overflowX:'hidden'}}>
                <div className="card container">
                    <div className="card-body row">
                        <img src={require('./1.jpg')} alt="Image not found" height="250px" className="col-md-3" />
                        <div className="col-md-7">
                            <h4>Samsung Galaxy S9</h4>
                            <p>4GB RAM - 64GB ROM - Fingerprint Sensor - Midnight Black</p>
                            <h6>Key Features</h6>
                            <ul>
                                <li>Front 8 MP & Back 12 MP Camera</li>
                                <li>4GB RAM - 64GB ROM</li>
                                <li>Octa-core (4x2.7 GHz Mongoose M3 & 4x1.8 GHz Cortex-A55)</li>
                                <li>Octa-core (4x2.7 GHz Mongoose M3 & 4x1.8 GHz Cortex-A55)</li>
                            </ul>
                            <button className="btn btn-info">Click Me</button>
                        </div>

                    </div>
                </div>
                
            </div>
        )
    }
}
function mapStateToProps(state){
    return({
    })
  }
  
  function mapActionsToProps(dispatch){
    return({
        // updateTime:(time)=>{
        //     dispatch(updateTime(time))
        // }
    })
  }
  export default connect(mapStateToProps,mapActionsToProps)(Ads)