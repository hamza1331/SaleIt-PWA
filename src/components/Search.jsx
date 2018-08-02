import React, { Component } from 'react'
import './Search.css'
import { connect } from "react-redux";
class Search extends Component {
    render() {
        return (
            <div className="sticky-top">
                <div className="row ">
                    <div className="col-md-12 ">
                        <form className="card container">
                            <div className="card-body ">
                                <br />
                                <div className="input-group">
                                    <input type="search" className="form-control" placeholder="Search Something you want to buy" />
                                    <div className="input-group-btn">
                                        <button className="btn btn-info"><i className="fa fa-search" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </div>
                        </form></div>
                </div>
                <br />  <ul className="breadcrumb">
                    <li><a onClick={e=>e.preventDefault()} href="Mobiles">Mobile</a></li>
                    <li><a onClick={e=>e.preventDefault()} href="Laptops">Laptops</a></li>
                    <li><a onClick={e=>e.preventDefault()} href="Tablets">Tablets</a></li>

                </ul>
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
  export default connect(mapStateToProps,mapActionsToProps)(Search)