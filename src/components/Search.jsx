import React, { Component } from 'react'
import './Search.css'
import { searchAction,resetSearchAction } from "../store/actions/actions";
import { connect } from "react-redux";
class Search extends Component {
    constructor(props){
        super(props)
        this.state={
            searchText:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }
    handleSearch(e){
        e.preventDefault()
        if(this.state.searchText.length>=2){
            this.props.search(this.state.searchText)
            this.setState({
                searchText:''
            })
        }
    }
    handleChange(e){
        this.setState({
            searchText:e.target.value
        })
    }
    handleReset(e){
        e.preventDefault()
        this.props.resetSearch()
    }
    render() {
        return (
            <div className="sticky-top">
                <div className="row ">
                    <div className="col-md-12 ">
                        <form className="card container">
                            <div className="card-body ">
                                <br />
                                <div className="input-group">
                                    <input value={this.state.searchText} onChange={this.handleChange} type="search" className="form-control" placeholder="Search Something you want to buy" />
                                    {this.props.searched && <div className="input-group-btn">
                                        <button onClick={this.handleReset} className="btn btn-danger btn-sm"><i className="fa fa-times-circle" aria-hidden="true"></i></button>        
                                    </div>}
                                    <div className="input-group-btn">
                                        <button onClick={this.handleSearch} className="btn btn-info"><i className="fa fa-search" aria-hidden="true"></i></button>        
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
        searched:state.rootReducer.searched
    })
  }
  
  function mapActionsToProps(dispatch){
    return({
        search:(text)=>{
            dispatch(searchAction(text))
        },
        resetSearch:()=>{
            dispatch(resetSearchAction())
        }
        // updateTime:(time)=>{
        //     dispatch(updateTime(time))
        // }
    })
  }
  export default connect(mapStateToProps,mapActionsToProps)(Search)