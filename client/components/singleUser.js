import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';

function SingleUser (props) {
    const {users} = props;
    let filteredUsers = users.filter((user) => {
        if(user.id === Number(props.match.params.userId)){
            return user;
        }
    })
    console.log(props);
    console.log(filteredUsers)

    // return (
    //     <div>
    //
    //         {
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

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUser() {
            dispatch(getUserPage());
        }
    }
};

const SingleUserContainer = connect(mapStateToProps)(SingleUser);

export default SingleUserContainer;
