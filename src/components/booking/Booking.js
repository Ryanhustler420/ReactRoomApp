import React, { Component } from 'react'

class Booking extends Component {
    render() {

        const { rental } = this.props;

        return (
        <div className='booking'>
            <h3 className='booking-price'>$ {rental.dailyRate} <span className='booking-per-night'>per night</span></h3>
            <hr/>
            <div className='form-group'>
                <label htmlFor='dates'>Dates </label>
                
            </div>
            <div className='form-group'>
                <label className='guests'>Guests</label>
                <input type='number' className='form-control' id='guests' aria-describedby='emailHelp' placeholder='' />
            </div>
            <button className='btn btn-bwm btn-confirm btn-block'>Reserve place now</button>
            <hr />
            <p className='booking-note-title'>People are interested into this house</p>
            <p className='booking-note-text'>
                More than 500 people checked this rental in last month.
            </p>
        </div>
        )
    }
}

export default Booking;