import { 
    FETCH_RENTAL_SUCCESS, 
    FETCH_RENTAL_BY_ID_SUCCESS,
    FETCH_RENTAL_BY_ID_INIT,
    UPDATE_RENTAL_SUCCESS,
    UPDATE_RENTAL_FAIL,
    RESET_RENTAL_ERRORS,
    FETCH_RENTAL_INIT,
    FETCH_RENTAL_FAIL
} from './../actions/types';

const INITIAL_STATE = {
    data: [],
    rentals: {
        data:[],
        errors: []
    },
    rental: {
        data:{},
        errors: []
    }
}

export const rentalReducer = (state = INITIAL_STATE.rentals, action) => {
    switch(action.type){
        case FETCH_RENTAL_INIT:
            return {...state, data: [], errors: []}
        case FETCH_RENTAL_SUCCESS:
            return {...state, data: action.rentals}
        case FETCH_RENTAL_FAIL:
            return Object.assign({}, state, {errors: action.errors, data: []});    
        default:
            return state;
    }
}

export const selectedRentalReducer = (state = INITIAL_STATE.rental, action) => {
    switch(action.type){
        case FETCH_RENTAL_BY_ID_INIT:
            return {...state,data:{}}
        case FETCH_RENTAL_BY_ID_SUCCESS : 
            return {...state, data: action.rental}
        case UPDATE_RENTAL_SUCCESS:
            return {...state, data: action.Rental}
        case UPDATE_RENTAL_FAIL:
            return {...state, errors: action.errors, data:[]}
        case RESET_RENTAL_ERRORS:
            return {...state, errors: []};
        default:
            return state;
    }
}