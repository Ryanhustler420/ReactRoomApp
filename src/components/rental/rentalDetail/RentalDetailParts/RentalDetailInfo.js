import React from 'react';
import { RentalAssets } from './RentalAssets';
import { toUpperCase, rentalType } from '../../../../helpers';

export const RentalDetailInfo = (props) =>  {
    const rental  = props.rental;
    return (
        <div className='rental'>
            <h2 className={`rental-type ${rental.category}`}>{rentalType(rental.shared)} {rental.category}</h2>
            <h1 className='rental-title'>{rental.title}</h1>
            <h2 className='rental-city'>{toUpperCase(rental.city)}</h2>
                <div className='rental-room-info'>
                    <span><i className='fa fa-building'></i>{rental.bedrooms} bedrooms</span>
                    <span><i className='fa fa-user'></i>{rental.bedrooms + 4} guests</span>
                    <span><i className='fa fa-bed'></i>{rental.bedrooms + 2} beds</span>
                </div>
            <p className='rental-description'>
                {rental.description}
            </p>
            <hr></hr>
                <RentalAssets/>
        </div>
    )
}