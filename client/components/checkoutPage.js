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
        this.props.handlePost({email})
        this.setState({newEmailEntry: '',
                       newAddressEntry: ''})
    }

    /*

    IF USER EXIST:
    create new order and use his userid
    IMPLEMENTATION:
    - get user info as props (set statetoProps)
    - filter that user with email written in form, if there is a match, extract that id
    - dispatch(newOrder and use user id)

    IF GUEST:
    create a new user with guest access and use that new user id for orders
    IMPLEMENTATION:
    -dispatch(newuser)
    -dispatch(newOrder and use that newuser id)

    */

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
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}


const mapStateToProps = function (state, ownProps) {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = function (dispatch, ownProps) {
    return ({
        handlePost(email) {

            // check if user exist through email
            // create new guest user in db, use userid for order

            // *** FOR GUESTS ***

            dispatch(postGuest(email));

            
            // AFTER DISPATCH TO DB

            ownProps.history.push('/');

        }
    })
}



const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout)
export default CheckoutContainer

