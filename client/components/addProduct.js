import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';

class AddProduct extends Component {

  constructor(props){
    super(props)
    this.state = {
      newName: '',
      newPrice: '',
      newDescription: '',
      newImage: '',
      newQuantity: '',
      categoryId: 0,
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
          <form>
            <div>
              <label>Add a Product: </label>
                <br></br>
                <input
                  type="text"
                  name="newName"
                  value= {this.state.newName}
                  placeholder="Enter new product name"
                  onChange={handleChange} />
                <br></br>
                <input
                  type="number"
                  name="newPrice"
                  value= {this.state.newPrice}
                  placeholder="Enter new price"
                  onChange={handleChange} />
                <br></br>
                <input
                  type="text"
                  name="newImage"
                  value= {this.state.newImage}
                  placeholder="Enter new image URL"
                  onChange={handleChange} />
                <br></br>
                <input
                  type="text"
                  name="newDescription"
                  value= {this.state.newDescription}
                  placeholder="Enter new description"
                  onChange={handleChange} />
                <br></br>
                { <select onChange={(e) => this.setState({categoryId : Number(e.target.value)})}>
                  <option defaultValue>Select a Category</option>
                  {
                    this.props.categories.map(category => {
                      return (
                        <option key={category.id}
                                name="categoryId"
                                value={category.id}
                                > {category.name} </option>
                      )
                    })
                  }
                </select>}
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
    categories: state.categories,
    products: state.products
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(fetchOrders())
      dispatch(fetchUsers())
    }
  }
}

export default connect(mapStateToProps)(AddProduct)
