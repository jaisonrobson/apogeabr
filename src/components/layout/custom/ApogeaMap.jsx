import React from 'react'

import { Map } from 'components'

import ApogeaMapImage from 'images/layout/map/apogeamap.png'
import ApogeaMapOceanImage from 'images/layout/map/apogeamapocean.png'

const ApogeaMap = (props) => (
    <Map
        mapImage={ApogeaMapImage}
        mapBackgroundImage={ApogeaMapOceanImage}
        {...props}
    />
)

export default ApogeaMap