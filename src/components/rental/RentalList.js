import React, { Component } from 'react'
import RentalCard from './RentalCard';
import Data from './RentalDataStore';

export default class RentalList extends Component {

    constructor() {
        super();

        this.state = {
            rentals: Data['Rentals']
        }
    }


    renderRentals() {
        return this.state.rentals.map((rental, index) => {
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
