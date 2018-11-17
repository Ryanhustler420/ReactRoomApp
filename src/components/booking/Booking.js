import React, { Component } from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker';

class Booking extends Component {


    componentWillMount() {
        this.getBookedOutDate();
    }

    getBookedOutDate() {
        const { bookings } = this.props.rental;
        
        if(bookings && bookings.length > 0){
            bookings.forEach(booking => {
                //GET RANGE OF DATE HERE
                console.log(booking);
            });
        }
    }

    render() {

        const { rental } = this.props;

        return (
        <div className='booking'>
            <h3 className='booking-price'>$ {rental.dailyRate} <span className='booking-per-night'>per night</span></h3>
            <hr/>
            <div className='form-group'>
                <label htmlFor='dates'>Dates </label>
                <DateRangePicker opens='left' containerStyles={{display: 'block'}}>
                    <input id='dates' type='text' className='form-control'></input>
                </DateRangePicker>
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