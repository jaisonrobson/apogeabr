import React, { useContext } from 'react'

import { ReducerContext } from 'contexts'

import HallOfFameTopImage from 'images/layout/halloffame/hall_of_fame_top.png'
import HallOfFameContentImage from 'images/layout/halloffame/hall_of_fame_content.png'
import StoneWallImage from 'images/layout/halloffame/stone_wall.png'

import {
    AdornedStoneWallBoard,
    VideoCarousel,
    ImageCarousel,
    Particles,
    Container,
    OrderedList,
    Col,
    Row,
    SectionBackdrop,
    TitleH2,
    Div,
 } from 'components'

const Content = () => {
    const { movies } = useContext(ReducerContext)

    return (
        <Container fluid>
            <SectionBackdrop                
                backgroundImage={`url(${HallOfFameTopImage})`}
                backgroundSize="40%"
                backgroundRepeat="repeat-x"
                backgroundPosition="50% 20%"
                contentAlignmentProps={{ paddingTop: '2rem' }}
            >
                <Particles id='halloffame_top_particles' style={{ width: '100%', height: '11rem' }}>
                    <TitleH2 light>Hall da Fama</TitleH2>
                </Particles>
            </SectionBackdrop>

            <SectionBackdrop
                gradientBackground="linear-gradient(to bottom, #000000, #00000099 10%, #00000099 90%, #000000);"
                backgroundImage={`url(${HallOfFameContentImage})`}
                backgroundSize="cover"
                backgroundRepeat="repeat"
                backgroundPosition="center"
                contentAlignmentProps={{ paddingTop: '2rem' }}
            >
                <Row>
                    <Col>
                        <Container marginTop="2rem" padding="2rem" paddingBottom="0" fluid>
                            <Row>
                                <VideoCarousel
                                    height={"700px"}
                                    itemProps={{
                                        divProps: { style: { padding: '0' } },
                                        iframeProps: { height: '700px' }                                    
                                    }}
                                />
                            </Row>
                        </Container>

                        <Container marginTop="2rem" padding="2rem" paddingBottom="0" fluid>
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
                        </Container>
                    </Col>

                    <Col
                        maxWidth='425px'
                        padding='0px'
                        margin="0px"                        
                    >
                        <Div
                            backgroundImage={`url(${StoneWallImage})`}
                            backgroundRepeat='no-repeat'
                            backgroundSize='contain'
                            padding='1rem'
                            paddingLeft='1.5rem'
                            paddingRight='1.5rem'
                            marginTop='2rem'
                            height='850px'
                        >
                            <Container
                                fluid
                                backgroundImage="linear-gradient(to bottom, rgba(0,0,0,.4), rgba(0,0,0,.4) 90%, rgba(0,0,0,0) 99%)"
                                marginTop="10px"
                                padding="2rem"
                            >
                                <Row>
                                    <AdornedStoneWallBoard>
                                        <h5
                                            className='text-white unselectable'
                                            style={{
                                                marginTop: '-35px',
                                                textShadow: '0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000',
                                                textAlign: 'center',
                                                lineHeight: '1.5'
                                            }}
                                        >
                                            Prestigiados
                                        </h5>
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
                            </Container>
                        </Div>

                        <Container
                            fluid
                            backgroundImage="linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.5), rgba(0,0,0,.5) 90%, rgba(0,0,0,0))"
                            display='flex'
                            flexDirection='column'
                            justifyContent='space-around'
                            alignItems='center'
                            height='400px'
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
                                
                                <div className='text-gray-400'>
                                    <p>Faça uma doação de R$ 10,00 reais para deixar seu video na seção de videos.</p>
                                    <p>Uma doação de R$ 5,00 reais para deixar sua foto na seção de screenshots.</p>
                                    <p>Os maiores doadores aparecem no top 10 maiores doadores.</p>
                                    <p>Os assinantes mais antigos aparecem no top 10 prestigiados.</p>
                                </div>
                            </Row>
                        </Container>

                        <Div
                            backgroundImage={`url(${StoneWallImage})`}
                            backgroundRepeat='no-repeat'
                            backgroundSize='contain'
                            padding='1rem'
                            paddingLeft='1.5rem'
                            paddingRight='1.5rem'
                            height='850px'
                        >
                            <Container
                                fluid
                                backgroundImage="linear-gradient(to bottom, rgba(0,0,0,.4), rgba(0,0,0,.4) 90%, rgba(0,0,0,0) 99%)"
                                marginTop="10px"
                                padding="2rem"
                            >
                                <Row>
                                    <AdornedStoneWallBoard marginTop="-15px">
                                        <h5
                                            className='text-white unselectable'
                                            style={{
                                                marginTop: '-35px',
                                                textShadow: '0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000',
                                                textAlign: 'center',
                                                lineHeight: '1.5'
                                            }}                                            
                                        >
                                            Maiores Doadores
                                        </h5>
                                        
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
                            </Container>
                        </Div>
                    </Col>
                </Row>
            </SectionBackdrop>
        </Container>
    )
}

export default Content
