import React from 'react';
import { Cacher } from './../../services/cacher';

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Circle,
    InfoWindow
} from "react-google-maps";

function MapComponent(props) {

    const { coordinates, isError, isLocationLoaded } = props;

    return (
        <GoogleMap
        defaultZoom={30}
        defaultCenter={coordinates}
        >
        { isLocationLoaded && !isError && <Circle center={coordinates} radius={500} />}
        { isLocationLoaded && isError && <InfoWindow 
                                            position={coordinates}
                                            options={{maxWidth: 300}}>
                <div>
                    Opps, there is problem to find location on the map, we are trying to resolve problem as fast 
                    as possible. contact host for additional information if you are still interested in booking this place
                    .we are sorry for incoviniance.
                </div>
            </InfoWindow>
        }    
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
                },
                isError: false,
                isLocationLoaded: false
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
                this.setState({coordinates: this.cacher.getCacheValue(location), isLocationLoaded: true});
            }else{  
                this.geoodeLocation(location)
                .then((coordinates) => {
                    this.setState({
                        coordinates,
                        isLocationLoaded:true
                    });
                },(error) => {
                    this.setState({isError: true, isLocationLoaded:true});
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