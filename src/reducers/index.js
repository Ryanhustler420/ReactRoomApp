import { rentalReducer, selectedRentalReducer } from './rental.reducer';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import { authReducer } from './auth-reducer';
import { mapRefresherReducer } from './mapRefresherReducer';
import { userBookingReducer } from './booking-reducer';
import { reducer as formReducer } from 'redux-form';

export const init = () => {
    const reducer = combineReducers({
        rentals:rentalReducer,
        rental:selectedRentalReducer,
        form: formReducer,
        auth: authReducer,
        manager: userBookingReducer,
        mapRefresher: mapRefresherReducer
    });

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        reducer,
        composeEnhancers(applyMiddleware(thunk)),
    );

    return store;
}