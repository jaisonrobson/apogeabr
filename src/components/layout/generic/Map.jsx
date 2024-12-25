import React from 'react'
import { CRS } from 'leaflet'
import {
    MapContainer,
    ImageOverlay
} from 'react-leaflet'

const Map = ({ mapBackgroundImage, mapImage, contentProps, ...props }) => (
    <MapContainer
        center={[500, 625]}
        scrollWheelZoom={true}
        style={{
            width:'100%',
            height: '900px',
            backgroundImage: `url(${mapBackgroundImage})`,
            zIndex: 1
        }}
        bounds = {[[0,0], [1,1]]}
        crs={CRS.Simple}
        zoom={1}
        minZoom={1}
        maxZoom={3}
        maxBounds={[[0, 0], [1000,1300]]}
        {...props}
    >
        <ImageOverlay url={mapImage} bounds={[[0,0], [1000,1300]]} {...contentProps} />
    </MapContainer>
)

export default Map