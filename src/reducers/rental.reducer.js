import Data from '../components/rental/RentalDataStore';

const rentals = Data['Rentals'];

export const rentalReducer = (state = rentals, action) => {
    switch(action.type){
        default:
            return state;
    }
}