import axios from 'axios';

import { 
    FETCH_RENTAL_BY_ID_SUCCESS, 
    FETCH_RENTAL_BY_ID_INIT,
    FETCH_RENTAL_SUCCESS 
} from './types';

// ACTION CREATORS
export const fetchRentals = () => {
    return dispatch => {
        axios.get(`/api/v1/rentals`).then((rentals) => {
            dispatch(fetchRentalsSuccess(rentals.data));
        });
    }
}

const fetchRentalsSuccess = (rentals) => {
    return {
        type:FETCH_RENTAL_SUCCESS,
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

        axios.get(`/api/v1/rentals/${rentalId}`).then((rental) => {
            dispatch(fetchRentalByIdSuccess(rental));
        })
    }
}