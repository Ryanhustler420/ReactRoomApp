import React, { Component } from 'react'
import Modal  from 'react-responsive-modal';
import { pretifyDate } from './../../helpers/index';

export default class RentalManageModal extends Component {

    constructor() {
        super();

        this.state ={
            open: false
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }


    openModal() {
        this.setState({open: true});
    }


    closeModal() {
        this.setState({open: false});
    }

    renderBookings(bookings) {
        return bookings.map((booking, index) => {
            return (
                <React.Fragment key={index}>
                    <p><span>Date:</span> {pretifyDate(booking.startAt)} - {pretifyDate(booking.endAt)}</p>
                    <p><span>Guests:</span> {booking.guests}</p>
                    <p><span>Total Price:</span> {booking.totalPrice} $</p>
                    {
                        index !== bookings.length - 1 &&
                        <hr></hr>
                    }
                </React.Fragment>
            )
        })
    }

    render() {

        const { bookings } = this.props;

        return (
            <React.Fragment>
                <button type='button' onClick={this.openModal} className='btn btn-bwm'>Bookings</button>
                <Modal open={this.state.open} onClose={this.closeModal} little className={{modal: 'rental-booking-modal'}}>
                    <h4 className='modal-title title'>Made Bookings</h4>
                    <div className='modal-body booking-inner-container'>
                        {this.renderBookings(bookings)}
                    </div>
                    <div className='modal-footer'>
                        <button type='button' onClick={this.closeModal} className='btn btn-bwm'>Cancle</button>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}
