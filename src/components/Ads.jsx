import React, { Component } from 'react'
import { connect } from "react-redux";
import './Ads.css'
import { showAdModalAction,putAdAction } from "../store/actions/actions";
import Loading from './load.gif'
class Ads extends Component {
    constructor(props){
        super(props)
        this.showAd = this.showAd.bind(this)
    }
    showAd(e){
        this.props.putAd(e.target.id)
        this.props.showAdModal()
    }
    render() {
        if(!this.props.loadingAds){
            return(
                <div className='container' style={{height:800,overflowY:'auto',overflowX:'hidden'}}>
                {this.props.ads.length>0 && this.props.ads.map((ad,index)=>{
                    return <div key={index}>
                        <div className="card container">
                                  <div className="card-body row">
                                  <br/>
                                      <img src={ad.downlaodUrls[0]} alt="not found" height="200px" className="col-md-3" />
                                      <div className="col-md-7">
                                          <h2>{ad.adTitle}</h2>
                                          <h3>Category: {ad.adCategory}</h3>
                                          <b><p>Location: {ad.location}</p></b>
                                          <b><p>Posted on {Date.now()}</p></b>
                                          <h3 style={{textAlign:'right',fontWeight:'bolder'}}>Price : Rs. {ad.price}</h3>
                                          <button id={index} className="btn btn-info btn-lg pull-right" onClick={this.showAd}>Show Ad</button>
                                      </div>
                                  </div>
                              </div>
                              <hr className='line'/>
                    </div>
                })}
                {this.props.ads.length===0 && <h2 style={{textAlign:'center',fontWeight:'bolder'}}>No ads to show...</h2>}
            </div>
            )

            
        }
        return (
            <div><center><img src={Loading} alt="NOt found"/></center></div>
            
        )
    }
}

/*
Main Card content
1. adTitle
2. Category
3. Location
4. Time
5. Price
*/

function mapStateToProps(state){
    return({
        ads:state.rootReducer.ads,
        loadingAds:state.rootReducer.loadingAds
    })
  }
  
  function mapActionsToProps(dispatch){
    return({
        // updateTime:(time)=>{
        //     dispatch(updateTime(time))
        // }
        showAdModal:()=>{
            dispatch(showAdModalAction())
        },
        putAd:(index)=>{
            dispatch(putAdAction(index))
        }
    })
  }
  export default connect(mapStateToProps,mapActionsToProps)(Ads)