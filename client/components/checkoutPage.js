import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postGuest } from '../store'


// *** SMART COMPONENT ***

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            newAddressEntry: '',
            newEmailEntry: '',
        }
    }

    handleChange(e) {

        let name = e.target.name;
        name === 'emailName' ?
            this.setState({ newEmailEntry: e.target.value }) :
            this.setState({ newAddressEntry: e.target.value })

    }

    handleSubmit(e) {
        e.preventDefault()
        let email = this.state.newEmailEntry
        let address = this.state.newAddressEntry
        this.props.handlePost([{email}, {address}])
        this.setState({newEmailEntry: '',
                       newAddressEntry: ''})
    }

    render() {

        const handleSubmit = this.handleSubmit
        const handleChange = this.handleChange
        return (
            <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-group">
                    <label>Email</label>
                    <input name="emailName" value={this.state.newEmailEntry} onChange={handleChange} type="email" className="form-control" aria-describedby="nameHelp" placeholder="Enter your Email" />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" value={this.state.newAddressEntry} onChange={handleChange} name="orderAddress" className="form-control" aria-describedby="emailHelp" placeholder="Enter your Address" />
                </div>
                <div className="form-group">
                </div>
                <div className="cart-details">
                <h3> Your Cart </h3>
                <ul>
                    {
                        this.props.cart.map(cart => {
                            return (
                                <li key={cart.id}>
                                    <span>
                                        <p>Name: {cart.name} Price: {cart.price}</p>
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}


const mapStateToProps = function (state, ownProps) {
    return {
        user: state.user,
        cart: state.cart,
    }
}

const mapDispatchToProps = function (dispatch, ownProps) {
    return ({

        handlePost(info) {

            // check if user exist through email
            // create new guest user in db, use userid for order

            // *** FOR GUESTS ***

            dispatch(postGuest(info));


            
            // AFTER DISPATCH TO DB
        
            //ownProps.history.push('/');

        },

        handleRemoveCart() {
            
        }
    })
}



const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout)
export default CheckoutContainer

