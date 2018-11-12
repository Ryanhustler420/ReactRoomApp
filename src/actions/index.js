import Data from '../components/rental/RentalDataStore';
import { FETCH_RENTALS, FETCH_RENTAL_BY_ID_SUCCESS, FETCH_RENTAL_BY_ID_INIT } from './types';

const rentals = Data['Rentals'];

// ACTION CREATORS
export const fetchRentals = () => {
    return {
        type:FETCH_RENTALS,
        rentals: rentals
    }
}

const fetchRentalByIdInit = () => {
    return {
        type: FETCH_RENTAL_BY_ID_INIT
    }
}

const fetchRentalByIdSuccess = (rental) => {
    return {
        type: FETCH_RENTAL_BY_ID_SUCCESS,
        rental
    }
}

export const fetchRentalById = (rentalId) => {
    return function(dispatch){
        dispatch(fetchRentalByIdInit());
        //Simulate server call
        setTimeout(() => {
            const rental = rentals[rentalId - 1];
            dispatch(fetchRentalByIdSuccess(rental))
        },1000);
    }
}