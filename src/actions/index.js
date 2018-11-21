import axios from 'axios';
import authService from '../services/auth-service';
import AxiosService from '../services/axios-service';

import { 
    FETCH_RENTAL_BY_ID_SUCCESS, 
    FETCH_RENTAL_BY_ID_INIT,
    FETCH_RENTAL_SUCCESS,
    FETCH_RENTAL_INIT,
    FETCH_RENTAL_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
} from './types';

// ACTION CREATORS

const axiosInstance = AxiosService.getInstance();

const fetchRentalsInit = () => {
    return {
        type: FETCH_RENTAL_INIT
    }
}

const fetchRentalFail = (errors) => {
    return {
        type: FETCH_RENTAL_FAIL,
        errors
    }
}

export const fetchRentals = (city) => {

    const url = city ? `/rentals?city=${city}` : '/rentals';

    return dispatch => {

        // cleane state before making any renatal request
        dispatch(fetchRentalsInit());

        axiosInstance.get(url)
        .then(response => response.data)
        .then(rentals =>  dispatch(fetchRentalsSuccess(rentals)))
        .catch(({response}) => dispatch(fetchRentalFail(response.data.errors)));
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

export const createBooking = (booking) => {
    return axiosInstance.post('/bookings', booking)
    .then(res => res.data)
    .catch(({response}) => Promise.reject(response.data.errors))
}

export const createRental = (rental) => {
    return axiosInstance.post('/rentals',rental)
    .then(res => res.data)
    .catch(({response}) => Promise.reject(response.data.errors))
}