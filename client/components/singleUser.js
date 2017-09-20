import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';
import {me, getUserPageThunk} from '../store';
import SingleReview from './singleReview';

class SingleUser extends Component {
    constructor(props) {
        super(props);
        this.loadUser = this.props.loadUser.bind(this);
    }
    componentDidMount() {
        this.props.loadUser(this.props.match.params.userId);
    }
    componentWillMount() {
        this.props.loadUser(this.props.match.params.userId);
    }
    render() {
        let user = this.props.user;
        let info = user.user;
        let reviews = user.reviews;
        let orders = user.orders;
        console.log(orders);

        return (
            <div>
                <div className="temp"></div>
                {
                    info 
                    ? <h2 id="user-email" >{info.email}</h2>
                    : <div></div>
                }
                <hr />
                <div id="user-reviews" className="col-xs-5">
                    {user.reviews
                    ? <div>
                        <h3><strong>My Reviews</strong></h3>
                        <hr />
                        {   reviews.length
                            ? reviews.map(review => {
                                return (
                                    <div key={review.id}>
                                        <SingleReview review={review} />
                                    </div>
                                )
                            })
                            : <div className="alert alert-info" role="alert">
                                There Are No Reviews For This Product
                            </div>
                        })
                    </div>
                    : <div></div>
                    }
                </div>
                <div className="col-xs-1">
                </div>
                <div className="col-xs-5">
                {user.orders
                    ? <div>
                        <h3><strong>My Orders</strong></h3>
                        <hr />
                        {   orders.length
                            ? orders.map(order => {
                                return (
                                    <div key={order.id} className="card">
                                        <div className="card-block">
                                            <h4 className="card-title"><i>Order #{order.id}</i></h4>
                                            <h5><strong>Shipping Address: </strong>{order.address}</h5>
                                            <h5><strong>Status: </strong>{order.status}</h5>
                                            <h5><strong>Checkout Date: </strong>{order.checkoutDate.split('T')[0].toString()}</h5>
                                        </div>
                                        <hr />
                                    </div>
                                )
                            })
                            : <div className="alert alert-info" role="alert">
                                There Are No Reviews For This Product
                            </div>
                        }
                    </div>
                    : <div></div>
                    }
                </div>
            </div>
            )
        
        //             filteredUsers.map(user => {
        //             return (
        //                 <div>
        //                   <tr key={user.id}>
        //                     <th scope="row">{user.id}</th>
        //                     <td>{user.email}</td>
        //                     <td>{user.isAdmin}</td>
        //                     <td>
        //                       <NavLink to={`users/${user.id}`} >
        //                         <button type="button" className="btn btn-outline-danger">Update</button>
        //                       </NavLink>
        //                     </td>
        //                   </tr>
        //                 </div>
        //             )
        //         })}
        //     </div>
        // );

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUser(userId) {
            dispatch(getUserPageThunk(userId));
        }
    }
};

const SingleUserContainer = connect(mapStateToProps, mapDispatchToProps)(SingleUser);

export default SingleUserContainer;
