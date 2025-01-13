import React from 'react'

import { Board } from 'components'

import Image_01 from 'images/layout/generic/stone_tablet_3_divided/stone_tablet_3_01.png'
import Image_02 from 'images/layout/generic/stone_tablet_3_divided/stone_tablet_3_02.png'
import Image_03 from 'images/layout/generic/stone_tablet_3_divided/stone_tablet_3_03.png'
import Image_04 from 'images/layout/generic/stone_tablet_3_divided/stone_tablet_3_04.png'
import Image_05 from 'images/layout/generic/stone_tablet_3_divided/stone_tablet_3_05.png'
import Image_06 from 'images/layout/generic/stone_tablet_3_divided/stone_tablet_3_06.png'
import Image_07 from 'images/layout/generic/stone_tablet_3_divided/stone_tablet_3_07.png'
import Image_08 from 'images/layout/generic/stone_tablet_3_divided/stone_tablet_3_08.png'
import Image_09 from 'images/layout/generic/stone_tablet_3_divided/stone_tablet_3_09.png'

const StoneTabletThreeBoard = (props) => (
    <Board
        sizingPattern="21px"
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
            {maxWidth: '21px', height: '21px', margin: '0px', padding: '0px'},
            {height: '21px', margin: '0px', padding: '0px'},
            {maxWidth: '21px', height: '21px', margin: '0px', padding: '0px'},
            {maxWidth: '21px', margin: '0px', padding: '0px'},
            {width: '21px', margin: '0px', padding: '0px'},
            {maxWidth: '21px', margin: '0px', padding: '0px'},
            {maxWidth: '21px', height: '21px', margin: '0px', padding: '0px'},
            {height: '21px', margin: '0px', padding: '0px'},
            {maxWidth: '21px', height: '21px', margin: '0px', padding: '0px'},
        ]}
        {...props}
    />
)

export default StoneTabletThreeBoard