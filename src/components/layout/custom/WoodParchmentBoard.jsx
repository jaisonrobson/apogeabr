import React from 'react'

import { Board } from 'components'

import WoodParchment_01 from 'images/layout/generic/wood_parchment_divided/wood_parchment_01.png'
import WoodParchment_02 from 'images/layout/generic/wood_parchment_divided/wood_parchment_02.png'
import WoodParchment_03 from 'images/layout/generic/wood_parchment_divided/wood_parchment_03.png'
import WoodParchment_04 from 'images/layout/generic/wood_parchment_divided/wood_parchment_04.png'
import WoodParchment_05 from 'images/layout/generic/wood_parchment_divided/wood_parchment_05.png'
import WoodParchment_06 from 'images/layout/generic/wood_parchment_divided/wood_parchment_06.png'
import WoodParchment_07 from 'images/layout/generic/wood_parchment_divided/wood_parchment_07.png'
import WoodParchment_08 from 'images/layout/generic/wood_parchment_divided/wood_parchment_08.png'
import WoodParchment_09 from 'images/layout/generic/wood_parchment_divided/wood_parchment_09.png'

const WoodParchmentBoard = (props) => (
    <Board
        sizingPattern="94px"
        contentClassName='text-black'
        images={[
            WoodParchment_01,
            WoodParchment_02,
            WoodParchment_03,
            WoodParchment_04,
            WoodParchment_05,
            WoodParchment_06,
            WoodParchment_07,
            WoodParchment_08,
            WoodParchment_09
        ]}
        styling={[
            {height: '85px'},
            {height: '85px'},
            {height: '85px'},
            {width: '94px'},
            {width: '68px'},
            {width: '94px'},
            {height: '85px'},
            {height: '85px'},
            {height: '85px'},
        ]}
        {...props}
    />
)

export default WoodParchmentBoard