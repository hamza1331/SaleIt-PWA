import {Provider} from 'react-redux'
import store from '../store/index'
import React, { Component } from 'react'
import App from './App'
export default class Saleit extends Component {
  render() {
    return (
        <Provider store={store}>
        <App />
        </Provider>
    )
  }
}
