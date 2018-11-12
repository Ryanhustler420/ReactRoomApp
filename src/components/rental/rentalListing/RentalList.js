import React, { Component } from 'react'
import RentalCard from './RentalCard';

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
                <div className="row">
                    {this.renderRentals()}
                </div>
            </div>
        )
    }
}

export default RentalList;
