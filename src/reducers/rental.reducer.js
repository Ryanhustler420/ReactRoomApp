import { 
    FETCH_RENTAL_SUCCESS, 
    FETCH_RENTAL_BY_ID_SUCCESS,
    FETCH_RENTAL_BY_ID_INIT
} from './../actions/types';

const INITIAL_STATE = {
    data: [],
    rentals: {
        data:[]
    },
    rental: {
        data:{}
    }
}

export const rentalReducer = (state = INITIAL_STATE.rentals, action) => {
    switch(action.type){
        case FETCH_RENTAL_SUCCESS:
            return {...state, data: action.rentals}
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
        default:
            return state;
    }
}