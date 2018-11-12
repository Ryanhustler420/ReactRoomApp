import * as redux from 'redux';
import { rentalReducer } from './rental.reducer';

export const init = () => {
    const reducer = redux.combineReducers({
        rentals:rentalReducer
    });

    const store = redux.createStore(reducer);

    return store;
}