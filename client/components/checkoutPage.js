import React, { Component } from 'react';
import {connect} from 'react-redux';
import {postOrder, writeAddress, writeEmail} from '../reducers';

class CheckoutOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newAddressEntry: '',
            newEmailEntry: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handlePost = this.handlePost.bind(this)
    }

        handleChange(e) {
            this.setState((prevState, props) => ({
                newAddressEntry: e.target.value
            }))
        }

        handlePost(e) {
            e.preventDefault();

        }

        render() {
            console.log('checkout component has hit')
            return (
                <form onSubmit={handlePost}>
                <div className="form-group">
                    <label>Email</label>
                    <input value={newEmailEntry} name="emailName" onChange={handleChange} type="text" className="form-control" aria-describedby="nameHelp" placeholder={placeholderUser.email} />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" value={newAddressEntry} onChange={handleChange} name="orderAddress" className="form-control" aria-describedby="emailHelp" placeholder={placeholderOrder.address} />
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
        
        // const mapDispatchToProps = function (dispatch, ownProps) {
        //     return ({ 
        //         handleChange (e) {
        //           const name = e.target.name;
        //           name === "studentName" ? 
        //           dispatch(writeStudent(e.target.value)) : name === "studentEmail" ? 
        //           dispatch(writeEmail(e.target.value)) : dispatch(writeCampusId(e.target.value))
        //           console.log('etrgvalupdate', e.target.value)
        //         },
        //         handlePost (e) {
        //             e.preventDefault();
        //             console.log('etargetvalName', e.target.studentName.value)
        //             console.log('etargetvalEmail', e.target.studentEmail.value)
        //             console.log('etargetvalCampus', e.target.campusId.value)
        
        //             let email= e.target.studentEmail.value;
        //             let name= e.target.studentName.value;
        //             let campusId = Number(e.target.campusId.value);
        //             let id = Number(ownProps.match.params.id);
        //             console.log('idofparams', id)
                          
        //             dispatch(editStudent({id, name, email, campusId}))
        //             dispatch(writeStudent(''));
        //             dispatch(writeEmail(''));
        //             ownProps.history.push('/students')
        //         }
        // })
        // }


export default connect(mapStateToProps)(CheckoutOrder)











// function CheckoutOrder (props) {
//     const {handlePost, handleChange, newEmailEntry, newAddressEntry, user} = props

//     //identify student and make placeholder

//     let placeholderStudent = studentsList.filter(student => student.id === Number(props.match.params.id))[0];
//     console.log('placeholderStudent', placeholderStudent)
    
//     return (
    // <form onSubmit={handleUpdate}>
    //     <div className="form-group">
    //         <label>Name</label>
    //         <input value={newStudentEntry} name="studentName" onChange={handleChange} type="text" className="form-control" aria-describedby="nameHelp" placeholder={placeholderStudent.name} />
    //         </div>
    //         <div className="form-group">
    //             <label>Email address</label>
    //             <input type="email" value={newEmailEntry} onChange={handleChange} name="studentEmail" className="form-control" aria-describedby="emailHelp" placeholder={placeholderStudent.email} />
    //         </div>
    //         <div className="form-group">
    //         <select onChange={handleChange} name="campusId" value={newCampusId} className="custom-select">
    //         {campusList.map(campus => {
    //             return (
    //             <option key={campus.id} value={campus.id}>{campus.name}</option>
    //             )
    //         })}
    //         </select>
    //     </div>
    //     <button type="submit" className="btn btn-primary">Submit</button>
    // </form>
//     ) 
// }