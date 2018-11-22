import React, { Component } from 'react'
import { connect } from 'react-redux';

import * as actions from '../../../actions';
import  RentalList  from './RentalList';

import { toUpperCase } from '../../../helpers';


class RentalSearchListing extends Component {

    constructor() {
        super();
        this.state = {
            searchedCity: ''
        }
    }

    componentWillMount() {
        this.searchRentalsByCity();
    }

    componentDidUpdate(prevProps){
        const currentUrlParam = this.props.match.params.city; 
        const prevUrlParam = prevProps.match.params.city;

        if(currentUrlParam !== prevUrlParam){
            this.searchRentalsByCity();
        }
    }

    searchRentalsByCity() {        
        const cityName = this.props.match.params.city;
        this.setState({searchedCity:cityName});
        this.props.dispatch(actions.fetchRentals(cityName));
    }

    rendarTitle() {
        const { errors, data } = this.props.rentals;
        const { searchedCity } = this.state;
        let title = ''

        // had problem in async call we had two blank array because of wrong spelling in lenght
        // or check in action promise chain
        if(errors && errors.length > 0){
            title = errors[0].detail
        }
        
        if(data.length > 0){
            title = `Your home in ${toUpperCase(searchedCity)}`
        }
        return <h1 className='page-title'>{title}</h1>

    }

    render() {
        return (
            <div>
                <section id="rentalListing">
                    { this.rendarTitle() }
                    <RentalList rentals={this.props.rentals.data}/>
                </section>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        rentals: state.rentals
    }
}


export default connect(mapStateToProps)(RentalSearchListing);
