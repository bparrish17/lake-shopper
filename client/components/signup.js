import React, {Component} from 'react'
import {signup} from "../store/user"
import {connect} from 'react-redux'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state ={
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event){
    this.props.signup({email: this.state.email, password: this.state.password})
    event.preventDefault()
  }

  render(){
    <div className="signupdiv">
            <div className="header">
          <a href="#" className="active" id="login-box-link">SignUp</a>
        </div>
        <form className="email-login" onSubmit={this.handleSubmit}>
          <div className="email-input">
            <input type="email" placeholder="Email" onChange={(event) => this.setState({email: event.target.value })}/>
          </div>
          <div className="password-input">
            <input type="password" placeholder="Password" onChange={(event) => this.setState({password: event.target.value })}/>
          </div>
           <div className="cpassword-input">
            <input type="password" placeholder="Confirm password"/>
          </div>
          <div className="signupbutton">
            <button>Sign Up</button>
          </div>
        </form>
    </div>
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  signup: (user) => dispatch(signup(user, ownProps))
})

export default connect(null, mapDispatchToProps)(Signup);