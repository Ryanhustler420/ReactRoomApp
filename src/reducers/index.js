import * as redux from 'redux';
import { rentalReducer, selectedRentalReducer } from './rental.reducer';
import thunk from 'redux-thunk';

export const init = () => {
    const reducer = redux.combineReducers({
        rentals:rentalReducer,
        rental:selectedRentalReducer
    });

    const store = redux.createStore(reducer, redux.applyMiddleware(thunk));

    return store;
}