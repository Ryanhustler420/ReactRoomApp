import React from 'react';

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

export const MapWithAMarker = withScriptjs(withGoogleMap(props =>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: -58.397, lng: 150.644 }}
        >
        <Marker
        position={{ lat: -34.397, lng: 150.644 }}
        />
        </GoogleMap>
));