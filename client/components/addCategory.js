import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';
import {postCategory} from '../store'

class AddProduct extends Component {

  constructor(props){
    super(props)
    this.state = {
      newCategory: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    const value = event.target.value;

    this.setState({
      [event.target.name]: value
    })
  }

  render () {

    console.log(this.props)

    const handleChange = this.handleChange;

    const topPadding = {'padding-top': '100px'}
    // const handleSubmit = this.handleSubmit;

    // const productId = this.props.match.params.id


    return (
      <div style={topPadding}>
          <form onSubmit={this.props.handleSubmit}>
            <div>
              <label>Add a Category: </label>
                <br></br>
                <input
                  type="text"
                  name="newCategory"
                  value= {this.state.newName}
                  placeholder="Enter new category"
                  onChange={handleChange} />
            </div>
            <div className="form-group">
              <button type="submit" className="button" >Submit</button>
            </div>
          </form>
        </div>
    )

  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(event){
      event.preventDefault();
      const name = event.target.newCategory.value
      dispatch(postCategory( { name } ))
    }
  }
}
//
export default connect(mapStateToProps, mapDispatch)(AddProduct)
