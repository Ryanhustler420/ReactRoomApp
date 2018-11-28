import React, { Component } from 'react'
import * as actions from '../../actions';
import { Link } from 'react-router-dom';
import RentalManageCard from './RentalManageCard';
import RentalManageModal from './RentalManageModal';
import { ToastContainer, toast } from 'react-toastify';

export default class RentalManage extends Component {

    constructor() {
        super();

        this.state = {
            userRental: [],
            errors: [],
            isFetching: false
        }

        this.deleteRental = this.deleteRental.bind(this);
    }

    componentWillMount() {
        this.setState({isFetching:true});
        actions.getUserRentals().then(
            result => this.setState({userRental: result, isFetching: false}),
            errors => this.setState({errors, isFetching: false})
        )
    }

    removeRentalFromArray(index){
        const userRental= this.state.userRental.slice();
        userRental.splice(index,1);
        this.setState({userRental});
    }

    deleteRental(id, index){
        actions.deleteRental(id).then(
            (success) => this.removeRentalFromArray(index),
            (errors) => toast.error(errors[0].detail)
        )
    }

    renderData(userRental) {
        return userRental.map((rental, index) => <RentalManageCard callback={this.deleteRental} rentalIndex={index} modal={<RentalManageModal bookings={rental.bookings} />} key={index} rental={rental} />)
    }

    renderError(isFetching, userRental) {
        return (
            !isFetching && userRental.length === 0 &&
            <div className='alert alert-warning'>
                You dont have any rentals currently created. If you want advertis your property
                Please follow this link.
                <Link className='btn btn-bwm' style={{'marginLeft': '10px'}} to={'/rentals/new'}>Register Rental</Link>
            </div>
        )
    }

    render() {
        const {userRental, isFetching} = this.state;
        return (
            <section id='userRentals'>
            <ToastContainer />
                <h1 className='page-title'>My Rentals</h1>
                <div className='row'>
                    {this.renderData(userRental)}
                </div>
                    {this.renderError(isFetching, userRental)}
            </section>
        )
    }
}
