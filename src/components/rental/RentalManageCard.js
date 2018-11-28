import  React  from 'react';
import { Link } from 'react-router-dom';
import RentalManageModal from './RentalManageModal';

const RentalManageCard = (props) => {

    const { rental } = props;

    return (
        <div className='col-md-4'>
            <div className='card text-center'>
                <div className='card-block'>
                    <h4 className='card-title'>{rental.title} - {rental.city}</h4>
                    <Link className='btn btn-bwm' to={`/rentals/${rental._id}`}>Go to Rental</Link>
                    {
                        rental.bookings && rental.bookings.length > 0 &&
                        <RentalManageModal bookings={rental.bookings}/>
                    }
                </div>
                <div className='card-footer text-muted'>
                    Created at {rental.createdAt}
                </div>
            </div>
        </div>
    )
}

export default RentalManageCard;
