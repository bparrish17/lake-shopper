import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';

export default class EditProduct extends Component {

  constructor(props){
    super(props)
    this.state = {
      newName: '',
      newPrice: '',
      newDescription: '',
      newImage: '',
      newQuantity: '',
      categoryId: 0
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

    const handleChange = this.handleChange;
    // const handleSubmit = this.handleSubmit;

    // const productId = this.props.match.params.id


    return (
      <div>
          <form>
            <div>
              <label>Edit Product: </label>
                <br></br>
                <input
                  type="text"
                  name="newName"
                  value= {this.state.newName}
                  placeholder="Enter new product name"
                  onChange={handleChange} />
                <br></br>
                <input
                  type="text"
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
                {/* <select onChange={(e) => this.setState({categoryId : Number(e.target.value)})}>
                  <option defaultValue>Select a Category</option>
                  {
                    categories.map(category => {
                      return (
                        <option key={category.id}
                                name="categoryId"
                                value={category.id}
                                > {category.name} </option>
                      )
                    })
                  }
                </select> */}
            </div>
            <div className="form-group">
              <button type="submit" className="button" >Edit Product</button>
            </div>
          </form>
        </div>
    )

  }
}

// const mapStateToProps = (state, ownProps) => {
//     return {
//         products: state.products,
//         newProductName: state.newProductName,
//         newPrice: state.newPrice,
//         newDescription: state.newDescription,
//         newImage: state.newImage,
//         newQuantity: state.newQuantity
//     }
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//       addToCart(id) {
//         dispatch(addToCartThunk(id))
//       }
//     }
// }

// const EditProductContainer = connect(mapStateToProps, mapDispatchToProps)(EditProduct);

// export default EditProductContainer;


    // let filteredArr = props.studentsList.filter((student) => {
    //     if(student.id === Number(props.match.params.studentId)){
    //         return student;
    //     }
    // })

    //get student's campus
    //let studentCampus = campusList.filter(campus => campus.id === filteredArr[0].campusId)[0].name;

    // console.log('studentCampus', studentCampus)
    // console.log('***filteredArr', filteredArr);
    // console.log('campuslist', campusList)
