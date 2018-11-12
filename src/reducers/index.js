import * as redux from 'redux';
import { rentalReducer, selectedRentalReducer } from './rental.reducer';

export const init = () => {
    const reducer = redux.combineReducers({
        rentals:rentalReducer,
        rental:selectedRentalReducer
    });

    const store = redux.createStore(reducer);

    return store;
}