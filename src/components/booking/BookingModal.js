import React from 'react';
import Modal from 'react-responsive-modal';
import { BwmResError } from './../shared/form/bwmResError';

const BookingModal = (props) => {

    const { open, closeModal, booking, confirmModal, errors, rentalPrice, processing } = props;

    return (
        <Modal open={open} onClose={closeModal} little className='booking-modal'>
            <h4 className='modal-title title'>Confirm Booking</h4>
            <p className='dates'>{booking.startAt} / {booking.endAt}</p>
            <div className='modal-body'>
                <em>{booking.days}</em> nights /
                <em>{rentalPrice}$</em> per Night
                <p>Guests: <em>{booking.guests}</em></p>
                <p>Price: <em>{booking.totalPrice}$ </em></p>
                <p>Do you confirm your booking for selected days?</p>
            </div>
            <BwmResError errors={errors} />
            <div className='modal-footer'>
                <button onClick={confirmModal} disabled={processing} type='button' className='btn btn-bwm'>Confirm</button>
                <button type='button' onClick={closeModal} className='btn btn-bwm'>Cancel</button>
            </div>
        </Modal>
    )
}

export default BookingModal;