import React, { useState, Fragment } from "react"
import _ from 'lodash'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

import {
    Button,
    Span,
    Card,
    ListGroup,
    Image,
    Div,
    AffiliatedSubscriptionButton,
    Row,
    Col,
    Container,
} from 'components'

const defaultButtonOnClick = () => {}

const AnimatedMotionCard = ({
    name="animated_motion_card_one",
    cardItems=["Item 1", "Item 2", "Item 3"],
    cardTitle="Titulo",
    cardSubtitle="Subtitulo",
    cardImageBackground="linear-gradient(-45deg, #B97A5750, #8F5E4350, #DE926850)",
    cardBackground="linear-gradient(-45deg, #B97A57, #8F5E43, #DE9268)",
    cardColor="white",
    cardBorder="1px solid #B97A5770",
    listGroupBorderColor="#D18A62",
    listGroupBackgroundColor="#B97A5770",
    listGroupColorVariantOne="#B97A5740",
    listGroupColorVariantTwo="#B97A5720",
    buttonColor="#543728",
    buttonBackgroundColor="#FFFFFF20",
    buttonHoverBackgroundColor="#FCA67750",
    buttonBorder="2px solid #B97A5740",
    buttonOnClick=defaultButtonOnClick,
    buttonDescription="Enviar",
    loading=false,    
    image=null,
    footer=undefined,
    complementaryFooter=undefined,
}) => {
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["-7deg", "7deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["7deg", "-7deg"])

    const handleMouseMove = (e) => {
        const rect = e.target.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5

        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }
    
    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
        >
            <Card
                width='18rem'
                background={cardBackground}
                backgroundSize="400% 400%"
                color={cardColor}
                borderRadius='5px'
                border={cardBorder}
                animation={{
                    property: `animatedMotionCardAnimation_${name} 5s ease infinite`,
                    corpse: `@keyframes animatedMotionCardAnimation_${name} {
                        0% { background-position: 0% 25%; }
                        50% { background-position: 100% 100%; }
                        100% { background-position: 0% 25%; }
                    }`
                }}
                style={{ transform: "translateZ(-50px)", transformStyle: "preserve-3d" }}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                {image ? (
                    <Div
                        width="200px"
                        height="200px"
                        backgroundImage={`${cardImageBackground}, url(${image})`}
                        backgroundSize="400%, 100%"
                        backgroundRepeat="none, none"
                        backgroundPosition="center, center"
                        maskImage={`url(${image})`}
                        maskSize="100%"
                        animation={{
                            property: `animatedMotionCardInternalAnimation_${name} 4s ease infinite`,
                            corpse: `@keyframes animatedMotionCardInternalAnimation_${name} {
                                0% { background-position: 0% 25%; }
                                50% { background-position: 100% 100%; }
                                100% { background-position: 0% 25%; }
                            }`
                        }}
                        style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
                    />
                ): null}

                <Card.Body>
                    <Card.Title tag="h5" style={{ textAlign: "center" }}>
                        <Span>{cardTitle}</Span>
                    </Card.Title>

                    <Card.Text style={{ textAlign: "center" }}>
                        <Span>{cardSubtitle}</Span>
                    </Card.Text>
                </Card.Body>

                <ListGroup flush style={{ backgroundColor: listGroupBackgroundColor, borderTop: `1px solid ${listGroupBorderColor}`, borderBottom: `1px solid ${listGroupBorderColor}`, borderLeft:"0px", borderRight: '0px', width: "100%" }}>
                    {_.map(cardItems, (item, idx) => (
                        <ListGroup.Item key={item} style={{ backgroundColor: idx % 2 === 0 ? listGroupColorVariantOne : listGroupColorVariantTwo, color:'white', borderBottom: idx !== cardItems.length-1 ? `1px solid ${listGroupBorderColor}` : '0px' }}>
                            {item}
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <Card.Footer style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '2rem', paddingBottom: '1rem', gap: '1rem' }}>
                    <Row>
                        <Col>
                            {complementaryFooter}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            {footer || (
                                <Button
                                    onClick={buttonOnClick}
                                    disabled={loading}
                                    width="200px"
                                    color={buttonColor}
                                    backgroundColor={buttonBackgroundColor}
                                    border={buttonBorder}
                                    onHover={{
                                        animation: {
                                            property: `animatedMotionCardButtonAnimation_${name} 0.5s linear 0s infinite alternate`,
                                            corpse: `@keyframes animatedMotionCardButtonAnimation_${name} {
                                                0%  {transform: scale3d(1,1,1);}
                                                100%  {transform: scale3d(1.03,1.03,1.03); background-color: ${buttonHoverBackgroundColor}; border-radius: 8px}
                                            }`
                                        }
                                    }}
                                >
                                    {loading ? "Processando..." : buttonDescription}
                                </Button>
                            )}
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </motion.div>
    )
}

export default AnimatedMotionCard
