import React, { Component } from 'react'

import { connect } from 'react-redux';
import { RentalDetailInfo } from './RentalDetailParts/RentalDetailInfo';
import { MapWithAMarker } from './../../map/googleMap';

import * as actions from '../../../actions';

class RentalDetail extends Component {

    componentWillMount() {
        // Dispatch action
        const RentalId = this.props.match.params.id;
        this.props.dispatch(actions.fetchRentalById(RentalId));
    }

    render() {
        const rental = this.props.rental;
        if(rental._id){
            return (
                <section id='rentalDetails'>
                    <div className='upper-section'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <img src={rental.image} alt=''/>
                            </div>
                            <div className='col-md-6'>
                            <MapWithAMarker
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB4d96CgxFTsNF-DQpXmvECp4jSB_6ypzc&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `360px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            />
                            </div>
                        </div>
                    </div>

                    <div className='details-section'>
                        <div className='row'>
                            <div className='col-md-8'>
                                <RentalDetailInfo rental={rental}/>
                            </div>
                            <div className='col-md-4'>BOOKING</div>
                        </div>
                    </div>
                </section>
            )
        }else{
            return <h1>Loading...</h1>
        }
    }
}

function mapStateToProps(state) {
    return {
        rental: state.rental.data
    }
}

export default connect(mapStateToProps)(RentalDetail);
