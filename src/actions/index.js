import axios from 'axios';
import authService from '../services/auth-service';
import AxiosService from '../services/axios-service';

import { 
    FETCH_RENTAL_BY_ID_SUCCESS,
    FETCH_USER_BOOKINGS_INIT,
    FETCH_USER_BOOKINGS_SUCCESS,
    FETCH_USER_BOOKINGS_FAIL,
    UPDATE_RENTAL_SUCCESS,
    UPDATE_RENTAL_FAIL,
    FETCH_RENTAL_BY_ID_INIT,
    FETCH_RENTAL_SUCCESS,
    RESET_RENTAL_ERRORS,
    FETCH_RENTAL_INIT,
    FETCH_RENTAL_FAIL,
    RELOAD_MAP_FINISH,
    RELOAD_MAP,
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

export const createBooking = (booking) => {
    return axiosInstance.post('/bookings', booking)
    .then(res => res.data)
    .catch(({response}) => Promise.reject(response.data.errors))
}

export const createRental = (rental) => {
    return axiosInstance.post('/rentals',rental).then(
        res => res.data,
        err => Promise.reject(err.response.data.errors)
    )
}

// Update Rental Action's

export const resetRentalErrors = () => {
    return {
        type: RESET_RENTAL_ERRORS
    }
}

const updateRentalSuccess = (Rental) => {
    return {
        type: UPDATE_RENTAL_SUCCESS,
        Rental
    }
}

const updateRentalFail = (errors) => {
    return {
        type: UPDATE_RENTAL_FAIL,
        errors
    }
}

export const updateRental = (updatedRental,rentalId) => dispatch => {
        return axiosInstance.patch(`/rentals/${rentalId}`,updatedRental)
            .then(response => response.data)
            .then(rental =>  {
                dispatch(updateRentalSuccess(rental));
                if(updatedRental.city || updatedRental.street){
                    dispatch(reloadMap());
                }
            })
            .catch(({response}) => dispatch(updateRentalFail(response.data.errors)));
}

export const verifyRentalOwner = (rentalId) => {
    return axiosInstance.get(`/rentals/${rentalId}/verify-user`);
}


// Update Rental Map Action's

export const reloadMap = () => {
    return {
        type: RELOAD_MAP
    }
}

export const reloadMapFinish = () => {
    return {
        type: RELOAD_MAP_FINISH
    }
}

// USER BOOKING ACTION's aka Manage Section

// clear state before fetch data from API
const fetchBookingUserInit = () => {
    return {
        type: FETCH_USER_BOOKINGS_INIT
    }
}

const fetchUserBookingsSuccess = (booking) => {
    return {
        type: FETCH_USER_BOOKINGS_SUCCESS,
        booking
    }
}

const fetchUserBookingFail = (errors) => {
    return {
        type: FETCH_USER_BOOKINGS_FAIL,
        errors
    }
}

export const fetchUserBookings = () => {
    return dispatch => {
        dispatch(fetchBookingUserInit());
        return axiosInstance.get('/bookings/manage')
        .then(response => response.data)
        .then(booking =>  dispatch(fetchUserBookingsSuccess(booking)))
        .catch(({response}) => dispatch(fetchUserBookingFail(response.data.errors)));
    }
}

// USER RENTAL ACTION's aka manage section

export const getUserRentals = () => {
    return axiosInstance.get('/rentals/manage')
    .then(
        response => response.data,
        err => Promise.reject(err.response.data.errors)
    )
}

// DELETE RENTAL ACTION's aka manage section

export const deleteRental = (RentalId) => {
    return axiosInstance.delete(`/rentals/${RentalId}`).then(
        (success) => success.data,
        (error) => Promise.reject(error.response.data.errors)
    )
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
    const username = authService.getUsername();
    return {
        type: LOGIN_SUCCESS,
        username
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