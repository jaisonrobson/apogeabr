import React, { useState, Fragment } from "react"
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

import {
    Button,
    Span,
    Card,
    ListGroup,
    Image,
    AffiliatedSubscriptionButton,    
} from 'components'

const AffiliatedSubscriptionCard = (props) => {
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
                background="linear-gradient(-45deg, #B97A57, #8F5E43, #DE9268)"
                backgroundSize="400% 400%"
                color='white'
                borderRadius='5px'
                border="1px solid #B97A5770"
                animation={{
                    property: 'subscriptionCardAnimation 5s ease infinite',
                    corpse: `@keyframes subscriptionCardAnimation {
                        0% { background-position: 0% 25%; }
                        50% { background-position: 100% 100%; }
                        100% { background-position: 0% 25%; }
                    }`
                }}
                style={{ transform: "translateZ(-50px)", transformStyle: "preserve-3d" }}
            >
                {/* <Image /> */}

                <Card.Body>
                    <Card.Title tag="h5">
                        Titulo do card
                    </Card.Title>
                    <Card.Text>
                        Descricao do card
                    </Card.Text>
                </Card.Body>
                <ListGroup flush style={{ backgroundColor: '#B97A5770', borderTop: '1px solid #D18A62', borderBottom: '1px solid #D18A62', borderLeft:"0px", borderRight: '0px' }}>
                    <ListGroup.Item style={{ backgroundColor: '#B97A5740', color:'white', borderBottom: '1px solid #D18A62' }}>
                        Item 1
                    </ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor: '#B97A5720', color:'white', borderBottom: '1px solid #D18A62' }}>
                        Item 2
                    </ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor: '#B97A5740', color:'white' }}>
                        Item 3
                    </ListGroup.Item>
                </ListGroup>
                <Card.Footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '2rem', paddingBottom: '1rem' }}>
                    <AffiliatedSubscriptionButton />
                </Card.Footer>
            </Card>
        </motion.div>
    )
}

export default AffiliatedSubscriptionCard
