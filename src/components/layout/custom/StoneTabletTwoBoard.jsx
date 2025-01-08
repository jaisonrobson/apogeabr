import React from 'react'

import { Board } from 'components'

import Image_01 from 'images/layout/generic/stone_tablet_2_divided/stone_tablet_2_01.png'
import Image_02 from 'images/layout/generic/stone_tablet_2_divided/stone_tablet_2_02.png'
import Image_03 from 'images/layout/generic/stone_tablet_2_divided/stone_tablet_2_03.png'
import Image_04 from 'images/layout/generic/stone_tablet_2_divided/stone_tablet_2_04.png'
import Image_05 from 'images/layout/generic/stone_tablet_2_divided/stone_tablet_2_05.png'
import Image_06 from 'images/layout/generic/stone_tablet_2_divided/stone_tablet_2_06.png'
import Image_07 from 'images/layout/generic/stone_tablet_2_divided/stone_tablet_2_07.png'
import Image_08 from 'images/layout/generic/stone_tablet_2_divided/stone_tablet_2_08.png'
import Image_09 from 'images/layout/generic/stone_tablet_2_divided/stone_tablet_2_09.png'

const StoneTabletTwoBoard = (props) => (
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

export default StoneTabletTwoBoard