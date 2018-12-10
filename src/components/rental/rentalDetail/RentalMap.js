import React, { Component } from 'react'
import { MapWithGeocode } from './../../map/googleMap';
import { connect } from 'react-redux';

import * as actions from './../../../actions';

class RentalMap extends Component {


    reloadMapFinishe() {
        this.props.dispatch(actions.reloadMapFinish());
    }


    render() {
        const { location, map: {isReloading} } = this.props;
        return (
            <MapWithGeocode
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB4d96CgxFTsNF-DQpXmvECp4jSB_6ypzc&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `360px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                location={location}
                isReloading={isReloading}
                reloadFinishedCB={() => this.reloadMapFinishe()}
            />
        )
    }
}

function mapStateToProps (state) {
    return {
        map: state.mapRefresher
    }
}

export default connect(mapStateToProps)(RentalMap);