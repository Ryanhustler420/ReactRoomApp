import React, { Component } from 'react'
import { connect } from 'react-redux';

import * as actions from '../../../actions';
import  RentalList  from './RentalList';

class RentalSearchListing extends Component {

    constructor() {
        super();

        this.state = {
            searchedCity: ''
        }
    }

    componentWillMount() {
        const cityName = this.props.match.params.city;
        this.setState({searchedCity:cityName});
    }

    render() {
        return (
            <div>
                <section id="rentalListing">
                    <h1>Your home in {this.state.searchedCity}</h1>
                    <RentalList rentals={[]}/>
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


export default connect(mapStateToProps)(RentalSearchListing);
