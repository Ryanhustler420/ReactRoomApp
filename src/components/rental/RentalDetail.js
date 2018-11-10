import React, { Component } from 'react'

import Data from './RentalDataStore';

class RentalDetail extends Component {
    render() {

        const id = this.props.match.params.id;
        console.log(Data['Rentals'][id-1]);
        return (
            <div>
                <h1> Detail of Id:  {id} </h1>
            </div>
        )
    }
}

export default RentalDetail;
