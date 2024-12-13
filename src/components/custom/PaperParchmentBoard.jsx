import React from 'react'

import Board from 'components/layout/Board'

import PaperParchment_01 from 'images/layout/news/paper_parchment_divided/paper_parchment_01.png'
import PaperParchment_02 from 'images/layout/news/paper_parchment_divided/paper_parchment_02.png'
import PaperParchment_03 from 'images/layout/news/paper_parchment_divided/paper_parchment_03.png'
import PaperParchment_04 from 'images/layout/news/paper_parchment_divided/paper_parchment_04.png'
import PaperParchment_05 from 'images/layout/news/paper_parchment_divided/paper_parchment_05.png'
import PaperParchment_06 from 'images/layout/news/paper_parchment_divided/paper_parchment_06.png'
import PaperParchment_07 from 'images/layout/news/paper_parchment_divided/paper_parchment_07.png'
import PaperParchment_08 from 'images/layout/news/paper_parchment_divided/paper_parchment_08.png'
import PaperParchment_09 from 'images/layout/news/paper_parchment_divided/paper_parchment_09.png'

const PaperParchmentBoard = (props) => (
    <Board
        sizingPattern="86px"
        contentClassName='text-black'
        images={[
            PaperParchment_01,
            PaperParchment_02,
            PaperParchment_03,
            PaperParchment_04,
            PaperParchment_05,
            PaperParchment_06,
            PaperParchment_07,
            PaperParchment_08,
            PaperParchment_09
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

export default PaperParchmentBoard