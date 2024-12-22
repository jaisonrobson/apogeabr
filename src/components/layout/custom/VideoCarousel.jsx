import React, { useContext, useRef, useEffect } from 'react'
import _ from 'lodash'
import ReactPlayer from 'react-player/lazy'
import styled from 'styled-components'

import { CarouselMaterialUI, Button } from 'components'

import { withCarouselContext, CarouselContext } from 'contexts'

const initialPayload = [
    {
        url: "https://www.youtube.com/watch?v=sCDltD7pPrQ",
        name: "Apogea Quest Ocultistas"
    },
    {
        url: "https://www.youtube.com/watch?v=wMdU0njXwAI",
        name: "Apogea Sentinels Guild Jebediah CHESTS"
    },
    {
        url: "https://www.youtube.com/watch?v=PhQmse_6gAM",
        name: "Apogea Receitas Culinaria"
    },
    {
        url: "https://www.youtube.com/watch?v=bsysUaRbiUc",
        name: "Apogea NO CUT"
    }
]

const StyledButton = styled((props) => <Button {...props} />)`
    height: 100%;
    width: 100px;
    border-radius: 75%;
    opacity: .7;

    &:hover {
        opacity: 100;
    }
`

const Item = ({
    divProps = { style: { paddingLeft: '150px', paddingRight: '150px' } },
    iframeProps = { height: '500px', style: { objectFit: 'contain' } },
    item,
    itemIndex,
    ...props
}) => {
    const { setIsAutoPlaying, setIsPlayingVideo, setPlayerIndex, isPlayingVideo, playerIndex } = useContext(CarouselContext)
    const playerRef = useRef(null)

    const onPlayResume = () => {
        setPlayerIndex(itemIndex)
        setIsPlayingVideo(true)
        setIsAutoPlaying(false)
    }

    const onPause = () => {
        setPlayerIndex(itemIndex)
        setIsPlayingVideo(false)
        setIsAutoPlaying(true)
    }

    return (
        <div style={{ paddingLeft: divProps?.style?.paddingLeft || '0', paddingRight: divProps?.style?.paddingRight || '0', ...divProps?.style }} {...props}>
            <ReactPlayer
                ref={playerRef}
                width="100%"
                height={iframeProps?.height || '500px'}
                url={item.url}
                onClickPreview={onPlayResume}
                onPlay={onPlayResume}
                onPause={onPause}
                config={{
                    youtube: {
                        playerVars: {
                            controls: 1,
                            fs: 1,
                        },
                    }
                }}
                playing={isPlayingVideo && itemIndex == playerIndex}
            />
        </div>
    )
}

const NavButton = ({onClick, className, style, next, prev}) => {
    const { setIsPlayingVideo } = useContext(CarouselContext)

    return (
        <StyledButton onClick={(props) => { setIsPlayingVideo(false); onClick(props); }} className={className} style={style}>
            {next && <p style={{ textAlign: 'center', fontSize: 50, paddingTop: '15px', color: 'white' }}>{`>`}</p>}
            {prev && <p style={{ textAlign: 'center', fontSize: 50, paddingTop: '15px', color: 'white' }}>{`<`}</p>}
        </StyledButton>
    )
}

const VideoCarousel = (props) => {
    const { isAutoPlaying } = useContext(CarouselContext)

    return (
        <CarouselMaterialUI height={"500px"} item={Item} items={initialPayload} autoPlay={isAutoPlaying} NavButton={NavButton} {...props}/>
    )
}

export default withCarouselContext(VideoCarousel)