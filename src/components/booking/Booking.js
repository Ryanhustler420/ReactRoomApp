import React, { Component } from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { getRangeOfDates } from './../../helpers/index';
import * as moment from 'moment';

class Booking extends Component {

    constructor() {
        super();
        this.dateRef = React.createRef();
        this.state = {
            startAt: '',
            endAt: '',
            guests: 0
        }

        this.bookedOutDates = [];
        this.checkInalidDates = this.checkInalidDates.bind(this);
        this.handleApply = this.handleApply.bind(this);
    }

    componentWillMount() {
        this.getBookedOutDate();
    }

    getBookedOutDate() {
        const { bookings } = this.props.rental;
        
        if(bookings && bookings.length > 0){
            bookings.forEach(booking => {
                const dateRange = getRangeOfDates(booking.startAt, booking.endAt, 'Y/MM/DD');
                this.bookedOutDates.push(...dateRange);
            });
        }
    }

    // this function getting date from calandar event
    checkInalidDates(date){
        return this.bookedOutDates.includes(date.format('Y/MM/DD')) || date.diff(moment(), 'days') < 0;
    }

    handleApply(event,picker){
        const startAt = picker.startDate.format('Y/MM/DD');
        const endAt = picker.endDate.format('Y/MM/DD');

        this.dateRef.current.value = startAt + ' to ' + endAt;

        this.setState({
            startAt,
            endAt
        });
    }

    selectGuests(event){
        this.setState({
            guests: parseInt(event.target.value)
        });
    }

    reserve() {
        console.log(this.state);
    }

    render() {

        const { rental } = this.props;

        return (
        <div className='booking'>
            <h3 className='booking-price'>$ {rental.dailyRate} <span className='booking-per-night'>per night</span></h3>
            <hr/>
            <div className='form-group'>
                <label htmlFor='dates'>Dates </label>
                <DateRangePicker onApply={this.handleApply} isInvalidDate={this.checkInalidDates} opens='left' containerStyles={{display: 'block'}}>
                    <input ref={this.dateRef} id='dates' type='text' className='form-control'></input>
                </DateRangePicker>
            </div>
            <div className='form-group'>
                <label className='guests'>Guests</label>
                <input type='number' onChange={(event) => {this.selectGuests(event)}} className='form-control' id='guests' aria-describedby='guests' placeholder='' />
            </div>
            <button onClick={() => this.reserve()} className='btn btn-bwm btn-confirm btn-block'>Reserve place now</button>
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