import axios from 'axios';
import authService from '../services/auth-service';

import { 
    FETCH_RENTAL_BY_ID_SUCCESS, 
    FETCH_RENTAL_BY_ID_INIT,
    FETCH_RENTAL_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
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

export const checkOutState = () => {
    return dispatch => {
        if(authService.isAuthenticated()){
            dispatch(loginSuccess());
        }
    }
}

export const login = (userData) => {
    return dispatch => {
        return axios.post('/api/v1/users/auth', userData)
            .then(res => res.data)
            .then(token => {
                authService.saveToken(token);
                dispatch(loginSuccess());
            }).catch(({response}) => {
                dispatch(loginFailure(response.data.errors));
            })
    }
}

const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS
    }
}

const loginFailure = (errors) => {
    return {
        type: LOGIN_FAILURE,
        errors
    }
}

export const logout = () => {
    authService.invalidateUser();
    
    return {
        type: LOGOUT
    }
}