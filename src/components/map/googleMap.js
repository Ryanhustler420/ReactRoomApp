import React from 'react';

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Circle
} from "react-google-maps";

function MapComponent(props) {

    const { coordinates } = props;
    console.log(coordinates);

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
            this.state = {
                coordinates : {
                    lat: 0,
                    lng: 0
                }
            }
        }

        componentWillMount() {
            this.geocodeLocation();
        }

        geocodeLocation() {
            const location = this.props.location;
            const geocoder = new window.google.maps.Geocoder();

            geocoder.geocode({address: location}, (result, status) => {
                if(status === 'OK'){
                    const geometry = result[0].geometry.location;
                    const coordinates = { lat: geometry.lat() , lng: geometry.lng()};

                    this.setState({
                        coordinates
                    })
                }
            })
        }

        render() {
            return (
                <WrappedComponent {...this.props} {...this.state} />
            )
        }
    }
}


export const MapWithGeocode = withScriptjs(withGoogleMap(withGeocode(MapComponent)));