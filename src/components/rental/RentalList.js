import React, { Component } from 'react'
import RentalCard from './RentalCard';

export default class RentalList extends Component {

    constructor() {
        super();

        this.state = {
            rentals: [1,2,3,4]
        }
    }


    renderRentals() {
        return this.state.rentals.map((rental) => {
            return <RentalCard />
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
