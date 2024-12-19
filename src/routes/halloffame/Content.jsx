import React, { useContext } from 'react'
import styled from 'styled-components'

import HallOfFameTop from 'images/layout/halloffame/hall_of_fame_top.png'
import HallOfFameContent from 'images/layout/halloffame/hall_of_fame_content.png'
import StoneWall from 'images/layout/halloffame/stone_wall.png'

import AdornedStoneWallBoard from 'components/custom/AdornedStoneWallBoard'

import { ReducerContext } from 'contexts/withReducerContext'

import VideoCarousel from 'components/custom/VideoCarousel'
import ImageCarousel from 'components/custom/ImageCarousel'

import Particles from 'components/layout/Particles'
import Container from 'components/layout/Container'
import OrderedList from 'components/layout/OrderedList'
import Col from 'components/layout/Col'
import Row from 'components/layout/Row'

const StyledRow = styled((props) => <Row {...props} />)`
    box-shadow: 0 -10px 15px rgba(0,0,0,.1) inset;
`

const StyledCol = styled((props) => <Col {...props} />)`
    padding: 0px;
`

const StyledContainer = styled((props) => <Container {...props} />)`
    margin-top: 2rem;
`

const Content = () => {
    const { movies } = useContext(ReducerContext)

    return (
        <Container fluid>
            <StyledRow
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.5), rgba(0,0,0,1)), url(${HallOfFameTop})`,
                    backgroundRepeat: 'repeat-x, repeat-x',
                    backgroundPosition: 'center, 50% 20%',
                    backgroundSize: 'contain, 40%'
                }}
            >
                <Particles id='halloffame_top_particles' style={{ width: '99%', height: '15rem' }}>
                    <h2 className='text-gray-100 unselectable'>Hall da Fama</h2>
                </Particles>
            </StyledRow>

            <StyledRow
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,.5), rgba(0,0,0,.5) 90%, rgba(0,0,0,1)), url(${HallOfFameContent})`,
                    backgroundPosition: "center, center",
                    backgroundSize: 'contain, cover',
                }}
            >
                <StyledCol>
                    <StyledContainer style={{ padding: '2rem', paddingBottom: '0' }} fluid>
                        <Row>
                            <VideoCarousel
                                height={"700px"}
                                itemProps={{
                                    divProps: { style: { padding: '0' } },
                                    iframeProps: { height: '700px' }                                    
                                }}
                            />
                        </Row>
                    </StyledContainer>

                    <StyledContainer style={{ padding: '2rem', paddingTop: '0' }} fluid>
                        <Row>
                            <ImageCarousel
                                height={"800px"}
                                itemProps={{
                                    divProps: { style: { padding: '0' } },
                                    imgProps: { height: '800px' }                                    
                                }}
                                items={movies}
                            />
                        </Row>
                    </StyledContainer>
                </StyledCol>

                <StyledCol
                    style={{
                        maxWidth: '425px',
                        backgroundImage: `url(${StoneWall})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        padding: '1rem',
                        paddingLeft: '1.5rem',
                        paddingRight: '1.5rem',
                        marginTop: '2rem'
                    }}
                >
                    <StyledContainer
                        fluid
                        style={{
                            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.4), rgba(0,0,0,.4) 90%, rgba(0,0,0,0) 99%)`,
                            marginTop: '10px',
                            padding: '2rem'
                        }}
                    >
                        <Row>
                            <AdornedStoneWallBoard>
                                <h5 className='text-white unselectable' style={{ marginTop: '-25px', textShadow: '0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000'  }}>Prestigiados</h5>
                                
                                <OrderedList className="text-gray-300 unselectable" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', height: '500px' }}>
                                    <OrderedList.Item style={{ marginTop: '30px', textShadow: '0px 0px 5px #faed7d, 0px 0px 10px #000' }}>
                                        Teste
                                    </OrderedList.Item>

                                    <OrderedList.Item style={{ textShadow: '0px 0px 5px #faed7d, 0px 0px 10px #000' }}>
                                        Teste
                                    </OrderedList.Item>

                                    <OrderedList.Item style={{ textShadow: '0px 0px 5px #faed7d, 0px 0px 10px #000' }}>
                                        Teste
                                    </OrderedList.Item>

                                    <OrderedList.Item style={{ textShadow: '0px 0px 5px #faed7d, 0px 0px 10px #000' }}>
                                        Teste
                                    </OrderedList.Item>

                                    <OrderedList.Item style={{ textShadow: '0px 0px 5px #faed7d, 0px 0px 10px #000' }}>
                                        Teste
                                    </OrderedList.Item>

                                    <OrderedList.Item style={{ textShadow: '0px 0px 5px #faed7d, 0px 0px 10px #000' }}>
                                        Teste
                                    </OrderedList.Item>

                                    <OrderedList.Item style={{ textShadow: '0px 0px 5px #faed7d, 0px 0px 10px #000' }}>
                                        Teste
                                    </OrderedList.Item>

                                    <OrderedList.Item style={{ textShadow: '0px 0px 5px #faed7d, 0px 0px 10px #000' }}>
                                        Teste
                                    </OrderedList.Item>

                                    <OrderedList.Item style={{ textShadow: '0px 0px 5px #faed7d, 0px 0px 10px #000' }}>
                                        Teste
                                    </OrderedList.Item>

                                    <OrderedList.Item style={{ textShadow: '0px 0px 5px #faed7d, 0px 0px 10px #000' }}>
                                        Teste
                                    </OrderedList.Item>
                                </OrderedList>

                            </AdornedStoneWallBoard>
                        </Row>
                    </StyledContainer>

                    <StyledContainer
                        fluid
                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', height: '500px' }}
                    >
                        <Row>
                            <h5
                                className='text-white unselectable'
                                style={{
                                    marginTop: '-25px',
                                    textShadow: '0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000',
                                    textAlign: 'center',
                                    paddingBottom: '25px'
                                }}
                            >
                                Quer aparecer aqui?
                            </h5>
                            
                            <p className='text-gray-400'>
                                <p>Faça uma doação de R$ 10,00 reais para deixar seu video de até 2 minutos na seção de videos.</p>
                                <p>Uma doação de R$ 5,00 reais para deixar sua foto na seção de screenshots.</p>
                                <p>Os maiores doadores aparecem no top 10 prestigiados.</p>
                            </p>
                        </Row>
                    </StyledContainer>
                </StyledCol>
            </StyledRow>
        </Container>
    )
}

export default Content
