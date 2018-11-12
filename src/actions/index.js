import Data from '../components/rental/RentalDataStore';
import { FETCH_RENTALS } from './types';

const rentals = Data['Rentals'];

// ACTION CREATORS
export const fetchRentals = () => {
    return {
        type:FETCH_RENTALS,
        rentals: rentals
    }
}