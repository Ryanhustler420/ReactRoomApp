import React from 'react';
import Modal from 'react-responsive-modal';

const BookingModal = (props) => {

    const { open, closeModal } = props;
    
    return (
        <div>
            <Modal open={open} onClose={closeModal} center>
                <h2>Simple centered modal</h2>
            </Modal>
        </div>
    )
}

export default BookingModal;