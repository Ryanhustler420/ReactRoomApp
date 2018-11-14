import React from 'react';
import { Cacher } from './../../services/cacher';

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Circle
} from "react-google-maps";

function MapComponent(props) {

    const { coordinates } = props;

    return (
        <GoogleMap
        defaultZoom={30}
        defaultCenter={coordinates}
        >
        <Circle
            center={coordinates}
            radius={500}
        />
        </GoogleMap>
    )
}

function withGeocode(WrappedComponent){
    return class extends React.Component {

        constructor() {
            super();
            this.cacher = new Cacher();
            this.state = {
                coordinates : {
                    lat: 0,
                    lng: 0
                }
            }
        }

        componentWillMount() {
            this.getGeocodeLocation();
        }

        geoodeLocation(location) {
            const geocoder = new window.google.maps.Geocoder();

            return new Promise((resolve, reject) => {
                geocoder.geocode({address: location}, (result, status) => {
                    if(status === 'OK'){
                        const geometry = result[0].geometry.location;
                        const coordinates = { lat: geometry.lat() , lng: geometry.lng()};
    
                        this.cacher.cacheValue(location,coordinates);
                        resolve(coordinates);
                    }else{
                        reject('ERROR!!! in geolocation Method');
                    }
                })
            });
        }

        getGeocodeLocation() {
            const location = this.props.location;
            
            if(this.cacher.isValueCache(location)){
                this.setState({coordinates: this.cacher.getCacheValue(location)});
            }else{  
                this.geoodeLocation(location)
                .then((coordinates) => {
                    this.setState({
                        coordinates
                    });
                },(error) => {
                    console.log(error);
                });
            }
        }

        render() {
            return (
                <WrappedComponent {...this.props} {...this.state} />
            )
        }
    }
}


export const MapWithGeocode = withScriptjs(withGoogleMap(withGeocode(MapComponent)));