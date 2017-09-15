import React, {Component} from 'react'
import {signup} from "../store/signup"
import {connect} from 'react-redux'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state ={
      email: '',
      password: ''
    }

  }

  handleSubmit(event){
    event.preventDefault()
  }

  render(){

  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(null, mapDispatchToProps)(Signup);