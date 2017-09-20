import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postGuest, removeCart } from '../store'


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
        this.props.handleRemoveCart()
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
                                        <p>Name: {cart.name} Price: {cart.price} Quantity: {cart.cartQuantity} Total: ${cart.cartQuantity*cart.price}</p>
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>
                <div>
                    <p>Total Purchase: {this.props.cart.reduce((sum, cart) => {
                        return sum + (cart.cartQuantity*cart.price)
                        }, 0)}</p>
                </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}


const mapStateToProps = function (state, ownProps) {
    console.log('cart***', state.cart)
    console.log('user***', state.user)
    return {
        user: state.user,
        cart: state.cart,
    }
}

const mapDispatchToProps = function (dispatch, ownProps) {
    return ({

        handlePost(info) {

            dispatch(postGuest(info));
            // AFTER DISPATCH TO DB
            ownProps.history.push('/');
            
        },

        handleRemoveCart() {
            dispatch(removeCart())
        }
    })
}



const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout)
export default CheckoutContainer

