import React, { Component } from 'react'
import * as actions from '../../actions';
import { Link } from 'react-router-dom';
import RentalManageCard from './RentalManageCard';

export default class RentalManage extends Component {

    constructor() {
        super();

        this.state = {
            userRental: [],
            errors: [],
            isFetching: false
        }
    }

    componentWillMount() {
        this.setState({isFetching:true});
        actions.getUserRentals().then(
            result => this.setState({userRental: result, isFetching: false}),
            errors => this.setState({errors, isFetching: false})
        )
    }

    renderData(userRental) {
        return userRental.map((rental, index) => <RentalManageCard key={index} rental={rental} />)
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
                <h1 className='page-title'>My Rentals</h1>
                <div className='row'>
                    {this.renderData(userRental)}
                </div>
                    {this.renderError(isFetching, userRental)}
            </section>
        )
    }
}
