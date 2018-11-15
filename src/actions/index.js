import axios from 'axios';

import { 
    FETCH_RENTAL_BY_ID_SUCCESS, 
    FETCH_RENTAL_BY_ID_INIT,
    FETCH_RENTAL_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from './types';

// ACTION CREATORS
export const fetchRentals = () => {
    return dispatch => {
        axios.get(`/api/v1/rentals`)
        .then(response => response.data)
        .then(rentals =>  dispatch(fetchRentalsSuccess(rentals)));
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

        axios.get(`/api/v1/rentals/${rentalId}`).then(response => response.data)
        .then(rental => dispatch(fetchRentalByIdSuccess(rental)))
    }
}

// AUTH ACTIONS

export const register = (userData) => {
    return axios.post('/api/v1/users/register',userData).then(
        (res) => {
            return res.data;
        },
        (error) => {
            return Promise.reject(error.response.data.errors);
        }
    )
}

export const login = (userData) => {
    return dispatch => {
        return axios.post('/api/v1/users/auth', userData)
            .then(res => res.data)
            .then(token => {
                localStorage.setItem('auth_token', token);
                dispatch(loginSuccess(token));
            }).catch((response) => {
                dispatch(loginFailure(response.data.errors));
            })
    }
}

const loginSuccess = (token) => {
    return {
        type: LOGIN_SUCCESS,
        token
    }
}

const loginFailure = (errors) => {
    return {
        type: LOGIN_FAILURE,
        errors
    }
}