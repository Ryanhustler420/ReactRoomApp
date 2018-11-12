import Data from '../components/rental/RentalDataStore';
import { FETCH_RENTALS, FETCH_RENTAL_BY_ID } from './types';

const rentals = Data['Rentals'];

// ACTION CREATORS
export const fetchRentals = () => {
    return {
        type:FETCH_RENTALS,
        rentals: rentals
    }
}

export const fetchRentalById = (rentalId) => {
    const rental = rentals[rentalId - 1];

    return {
        type: FETCH_RENTAL_BY_ID,
        rental: rental
    }
}