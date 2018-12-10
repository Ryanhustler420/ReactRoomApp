import React, { Component } from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { toast, ToastContainer } from 'react-toastify';
import { getRangeOfDates } from './../../helpers/index';
import * as moment from 'moment';
import BookingModal from './BookingModal';

import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Booking extends Component {

    constructor() {
        super();
        this.dateRef = React.createRef();
        this.state = {
            proposedBooking: {
                startAt: '',
                endAt: '',
                guests: ''
            },
            modal: {
                open: false
            },
            errors: []
        }

        this.bookedOutDates = [];
        this.checkInalidDates = this.checkInalidDates.bind(this);
        this.handleApply = this.handleApply.bind(this);
        this.cancelConfirmation = this.cancelConfirmation.bind(this);
        this.reserveRental = this.reserveRental.bind(this);
    }

    componentWillMount() {
        this.getBookedOutDate();
    }

    getBookedOutDate() {
        const { bookings } = this.props.rental;
        
        if(bookings && bookings.length > 0){
            bookings.forEach(booking => {
                const dateRange = getRangeOfDates(booking.startAt, booking.endAt, 'YYYY-MM-DD');
                this.bookedOutDates.push(...dateRange);
            });
        }
    }

    // this function getting date from calandar event
    checkInalidDates(date){
        return this.bookedOutDates.includes(date.format('YYYY-MM-DD')) || date.diff(moment(), 'days') < 0;
    }

    handleApply(event,picker){
        const startAt = picker.startDate.format('YYYY-MM-DD');
        const endAt = picker.endDate.format('YYYY-MM-DD');

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
        const totalGuests = parseInt(event.target.value,10);
        this.setState({
            proposedBooking: {
                ...this.state.proposedBooking,
                guests: totalGuests
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
        this.setState({errors:[]}); 

        this.setState({
            proposedBooking:{
                ...this.state.proposedBooking,
                days: days === 0 ? 1 : days,
                totalPrice: (days * rental.dailyRate) === 0 ? rental.dailyRate : (days * rental.dailyRate),
                rental
            },
            modal: {
                open: true
            },
            processing: false
        })
    }

    reserveRental() {
        this.setState({processing: true});
        actions.createBooking(this.state.proposedBooking).then(
            (booking) => { 
                this.addNewBookedOutDates(booking);
                this.cancelConfirmation();
                this.resetdata();
                toast.success('Booking has been successfuly created! Enjoy.')
            },
            (errors) => {
                this.setState({errors}); 
            }
        )


    }

    addNewBookedOutDates(booking) {
        const dateaRange = getRangeOfDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...dateaRange);
    }

    resetdata() {
        this.dateRef.current.value = '';
        this.setState({proposedBooking: {guests: ''}});
    }

    render() {

        const { rental, auth: { isAuth } } = this.props;
        const { startAt, endAt, guests } = this.state.proposedBooking;

        return (
        <div className='booking'>
            <ToastContainer />
            <h3 className='booking-price'>$ {rental.dailyRate} <span className='booking-per-night'>per night</span></h3>
            <hr/>
            {
                !isAuth && 
                <Link className='btn btn-bwm btn-confirm btn-block' to={{pathname: '/login'}}>
                    Login to book place.
                </Link>
            }
            {   isAuth &&
                <React.Fragment>
                    <div className='form-group'>
                        <label htmlFor='dates'>Dates </label>
                        <DateRangePicker onApply={this.handleApply} isInvalidDate={this.checkInalidDates} opens='left' containerStyles={{display: 'block'}}>
                            <input ref={this.dateRef} id='dates' type='text' className='form-control'></input>
                        </DateRangePicker>
                    </div>
                    <div className='form-group'>
                        <label className='guests'>Guests</label>
                        <input value={guests} type='number' onChange={(event) => {this.selectGuests(event)}} className='form-control' id='guests' aria-describedby='guests' placeholder='' />
                    </div>
                    <button disabled={!startAt || !endAt || !guests} onClick={() => this.confirmPropseData()} className='btn btn-bwm btn-confirm btn-block'>Reserve place now</button>
                </React.Fragment>
            }
            <hr />
            <p className='booking-note-title'>People are interested into this house</p>
            <p className='booking-note-text'>
                More than 500 people checked this rental in last month.
            </p>
            <BookingModal rentalPrice={rental.dailyRate} errors={this.state.errors} processing={this.state.processing} confirmModal={this.reserveRental} booking={this.state.proposedBooking} open={this.state.modal.open} closeModal={this.cancelConfirmation} />
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Booking);