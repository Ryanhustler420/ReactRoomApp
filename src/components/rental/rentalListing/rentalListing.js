import React, { Component } from 'react'
import { connect } from 'react-redux';

import * as actions from '../../../actions';
import  RentalList  from './RentalList';

class RentalListing extends Component {

    componentWillMount() {
        this.props.dispatch(actions.fetchRentals());
    }

    render() {
        return (
            <div>
                <section id="rentalListing">
                    <h1 className="page-title"> Your Home All Around the World</h1>
                    {
                        this.props.rentals ? 
                            <RentalList rentals={this.props.rentals}/> 
                        : 
                            "Loading.."
                    }
                    <div className="footer">
                        <p>Build by GauravGupta</p>
                    </div>
                </section>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        rentals: state.rentals.data
    }
}


export default connect(mapStateToProps)(RentalListing);
