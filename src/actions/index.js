import Data from '../components/rental/RentalDataStore';
import { FETCH_RENTALS, FETCH_RENTAL_BY_ID_SUCCESS } from './types';

const rentals = Data['Rentals'];

// ACTION CREATORS
export const fetchRentals = () => {
    return {
        type:FETCH_RENTALS,
        rentals: rentals
    }
}


export const fetchRentalById = (rentalId) => {
    return function(dispatch){
        //Simulate server call
        setTimeout(() => {
            const rental = rentals[rentalId - 1];
            dispatch(fetchRentalByIdSuccess(rental))
        },1000);
    }
}

const fetchRentalByIdSuccess = (rental) => {
    return {
        type: FETCH_RENTAL_BY_ID_SUCCESS,
        rental
    }
}