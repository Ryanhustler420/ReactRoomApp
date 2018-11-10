import React, { Component } from 'react'
import RentalCard from './RentalCard';
import Data from './RentalDataStore';
import { connect } from 'react-redux';

class RentalList extends Component {

    renderRentals() {
        return this.props.rentals.map((rental, index) => {
            return(
                <RentalCard 
                    key={index}
                    rental={rental}
                />
            ) 
        })
    }

    render() {
        return (
            <div>
                <section id="rentalListing">
                    <h1 className="page-title"> Your Home All Around the World</h1>
                    <div className="row">
                        {this.renderRentals()}
                    </div>
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


export default connect(mapStateToProps)(RentalList);
