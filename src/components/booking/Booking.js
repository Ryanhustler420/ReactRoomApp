import React, { Component } from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { getRangeOfDates } from './../../helpers/index';
import * as moment from 'moment';
import BookingModal from './BookingModal';

class Booking extends Component {

    constructor() {
        super();
        this.dateRef = React.createRef();
        this.state = {
            proposedBooking: {
                startAt: '',
                endAt: '',
                guests: 0,
                rental:{}
            },
            modal: {
                open: false
            }
        }

        this.bookedOutDates = [];
        this.checkInalidDates = this.checkInalidDates.bind(this);
        this.handleApply = this.handleApply.bind(this);
        this.cancelConfirmation = this.cancelConfirmation.bind(this);
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
            proposedBooking: {
                ...this.state.proposedBooking,
                startAt,
                endAt
            }
        });
    }

    selectGuests(event){
        this.setState({
            proposedBooking: {
                ...this.state.proposedBooking,
                guests: parseInt(event.target.value)
            }
        });
    }

    cancelConfirmation() {
        this.setState({
            modal: {
                open: false
            }
        })
    }

    confirmPropseData() {

        const { startAt, endAt } = this.state.proposedBooking;
        const { rental } = this.props;
        const days = getRangeOfDates(startAt, endAt).length - 1;

        this.setState({
            proposedBooking:{
                ...this.state.proposedBooking,
                days,
                totalPrice: days * rental.dailyRate,
                rental
            },
            modal: {
                open: true
            }
        })
    }

    render() {

        const { rental } = this.props;
        const { startAt, endAt, guests } = this.state.proposedBooking;

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
            <button disabled={!startAt || !endAt || !guests} onClick={() => this.confirmPropseData()} className='btn btn-bwm btn-confirm btn-block'>Reserve place now</button>
            <hr />
            <p className='booking-note-title'>People are interested into this house</p>
            <p className='booking-note-text'>
                More than 500 people checked this rental in last month.
            </p>
            <BookingModal booking={this.state.proposedBooking} open={this.state.modal.open} closeModal={this.cancelConfirmation} />
        </div>
        )
    }
}

export default Booking;