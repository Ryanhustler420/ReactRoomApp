import React, { Component } from 'react'

import { connect } from 'react-redux';

import * as actions from '../../../actions';

class RentalDetail extends Component {

    componentWillMount() {
        // Dispatch action
        const RentalId = this.props.match.params.id;
        this.props.dispatch(actions.fetchRentalById(RentalId));
    }

    render() {
        const rental = this.props.rental;
        if(rental._id){
            return (
                <div>
                    <h1>{rental.title}</h1>
                    <h1>{rental.city}</h1>
                    <h1>{rental.description}</h1>
                    <h1>{rental.dailyRate} $</h1>
                </div>
            )
        }else{
            return <h1>Loading...</h1>
        }
    }
}

function mapStateToProps(state) {
    return {
        rental: state.rental.data
    }
}

export default connect(mapStateToProps)(RentalDetail);
