import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postGuest, removeCart, postUserCheckout} from '../store'


// *** SMART COMPONENT ***

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            newAddressEntry: '',
            newEmailEntry: '',
            dirtyAddress: false, 
            dirtyEmail: false,
        }
    }

    handleChange(e) {
        
        let name = e.target.name;
        name === 'emailName' ?
            this.setState({ 
                newEmailEntry: e.target.value,
                dirtyEmail: true
             }) :
            this.setState({ 
                newAddressEntry: e.target.value,
                dirtyAddress: true
            })
    }

    handleSubmit(e) {
        e.preventDefault()
        let email = this.state.newEmailEntry
        let address = this.state.newAddressEntry
        
        email === this.props.user.email ?
        this.props.handleUserPost([this.props.user.id, {address}]) :
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
                    <input name="emailName" 
                           value={this.state.newEmailEntry} 
                           onChange={handleChange} 
                           type="email" 
                           className="form-control" 
                           aria-describedby="nameHelp" 
                           placeholder="Enter your Email" />
                    {this.state.dirtyEmail && !this.state.newEmailEntry.length ? 
                        <p className="errorEmail alert alert-danger" >please enter your email</p> :
                        <p></p>
                    }
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" 
                           value={this.state.newAddressEntry} 
                           onChange={handleChange} 
                           name="orderAddress" 
                           className="form-control" 
                           aria-describedby="emailHelp" 
                           placeholder="Enter your Address" />
                    {this.state.dirtyAddress && !this.state.newAddressEntry.length ? 
                        <p className="dirtyAddress alert alert-danger" >please enter your address</p> :
                        <p></p>
                        
                    }
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
                <button type="submit" className="btn btn-primary" disabled={!this.state.newAddressEntry || !this.state.newEmailEntry}>Submit</button>
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

            dispatch(postGuest(info));
            // AFTER DISPATCH TO DB
            ownProps.history.push('/');
            
        },

        handleUserPost(info) {
            console.log('user post hit')
            dispatch(postUserCheckout(info))
            ownProps.history.push('/')
        },

        handleRemoveCart() {
            dispatch(removeCart())
        }
    })
}



const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout)
export default CheckoutContainer