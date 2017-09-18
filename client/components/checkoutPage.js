import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateAddress, updateEmail, postGuest} from '../store'


        // ***** DUMB COMPONENT ***** 



function Checkout (props) {
    const {postGuest, handleChange, handleSubmit, email, address} = props

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
            <label>Email</label>
            <input name="emailName" value={email} onChange={handleChange} type="email" className="form-control" aria-describedby="nameHelp" placeholder="Enter your Email" />
            </div>
            <div className="form-group">
                <label>Address</label>
                <input type="text" value={address} onChange={handleChange} name="orderAddress" className="form-control" aria-describedby="emailHelp" placeholder="Enter your Address" />
            </div>
            <div className="form-group">
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        email: state.email,
        address: state.address,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleChange (e) {
            let name = e.target.name
            name === 'emailName' ?
            dispatch(updateEmail(e.target.value)) :
            dispatch(updateAddress(e.target.value))
            
        },

        handleSubmit (e) {
            e.preventDefault()

            let email = e.target.emailName.value
            let address = e.target.orderAddress.value

            // *** GUESTS ONLY ***
            dispatch(postGuest({email}))
            


            //AFTER DISPATCHING TO DB

            dispatch(updateEmail(''))
            dispatch(updateAddress(''))
            ownProps.history.push('/')

        }

    }
}

const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout)
export default CheckoutContainer







// class Checkout extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleChange = this.handleChange.bind(this)
//         this.handleSubmit = this.handleSubmit.bind(this)
//         this.state = {
//             newAddressEntry: '',
//             newEmailEntry: '',
//         }
//     }

//         handleChange(e) {
            
//             let name = e.target.name;
//             name === 'emailName' ?
//             this.setState({newEmailEntry: e.target.value}) :
//             this.setState({newAddressEntry: e.target.value})
//         }

//         handleSubmit(e) {
//             e.preventDefault()
//             let email = this.state.newEmailEntry
//             let address = this.state.newAddressEntry
//             console.log('handleSubmit was clicked')
//             console.log('email', email)
//             console.log('address', address)

//             dispatch(postGuest(email))
//         }

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

        // render() {
            
        //     const handleSubmit = this.handleSubmit

        //     return (
        //         <form onSubmit={handleSubmit} className="checkout-form">
        //         <div className="form-group">
        //             <label>Email</label>
        //             <input name="emailName" value={this.state.newEmailEntry} onChange={this.handleChange} type="email" className="form-control" aria-describedby="nameHelp" placeholder="Enter your Email" />
        //             </div>
        //             <div className="form-group">
        //                 <label>Address</label>
        //                 <input type="text" value={this.state.newAddressEntry} onChange={this.handleChange} name="orderAddress" className="form-control" aria-describedby="emailHelp" placeholder="Enter your Address" />
        //             </div>
        //             <div className="form-group">
        //         </div>
        //         <button type="submit" className="btn btn-primary">Submit</button>
        //     </form>
        //     );
        //   }
        // }


        // const mapStateToProps = function (state, ownProps) {
        //     return {
        //         user: state.user,
        //     }
        // }
        
        // const mapDispatchToProps = function (dispatch, ownProps) {
        //     return ({ 
        //         handlePost (e) {
        //             e.preventDefault();
                    
                    // console.log('ownProps', ownProps)
                    // console.log('this.state.newEmailEntry', this.state.newEmailEntry)
                    
                    //check if user exist through email
                    //create new guest user in db, use userid for order
                    
                    // *** FOR GUESTS ***

                    // let email = this.state.newEmailEntry
                    // let address = this.state.newAddressEntry

                    //dispatch(postGuest(email));
                    //dispatch(postOrder(address));
                    // ownProps.history.push('/');
                          
                    // dispatch(editStudent({id, name, email, campusId}))
                    // dispatch(writeStudent(''));
                    // dispatch(writeEmail(''));
                    // ownProps.history.push('/students')
        //         }
        // })
        // }









