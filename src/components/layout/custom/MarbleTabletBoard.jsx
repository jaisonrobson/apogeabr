import React from 'react'

import { Board } from 'components'

import Image_01 from 'images/layout/generic/marble_tablet_divided/images/marble_tablet_01.png'
import Image_03 from 'images/layout/generic/marble_tablet_divided/images/marble_tablet_03.png'
import Image_04 from 'images/layout/generic/marble_tablet_divided/images/marble_tablet_04.png'
import Image_05 from 'images/layout/generic/marble_tablet_divided/images/marble_tablet_05.png'
import Image_02 from 'images/layout/generic/marble_tablet_divided/images/marble_tablet_02.png'
import Image_06 from 'images/layout/generic/marble_tablet_divided/images/marble_tablet_06.png'
import Image_07 from 'images/layout/generic/marble_tablet_divided/images/marble_tablet_07.png'
import Image_08 from 'images/layout/generic/marble_tablet_divided/images/marble_tablet_08.png'
import Image_09 from 'images/layout/generic/marble_tablet_divided/images/marble_tablet_09.png'

const MarbleTabletBoard = (props) => (
    <Board
        sizingPattern="86px"
        contentClassName='text-black'
        images={[
            Image_01,
            Image_02,
            Image_03,
            Image_04,
            Image_05,
            Image_06,
            Image_07,
            Image_08,
            Image_09
        ]}
        styling={[
            {maxWidth: '85px', height: '85px'},
            {height: '85px'},
            {maxWidth: '85px', height: '85px'},
            {maxWidth: '85px'},
            {width: '86px'},
            {maxWidth: '85px'},
            {maxWidth: '85px', height: '85px'},
            {height: '85px'},
            {maxWidth: '85px', height: '85px'},
        ]}
        {...props}
    />
)

export default MarbleTabletBoard