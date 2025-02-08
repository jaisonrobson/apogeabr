import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import axios from "axios"

import {
    StoneTabletTwoBoard,
    Container,
    AffiliatedSubscriptionCard,
    Row,
    Col,
    Span,
} from 'components'

const Affiliated = () => {
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const preApprovalIdParam = searchParams.get('preapproval_id')

    useEffect(() => {
        async function checkLastSubscription() {
            try {
                const response = await axios.post(`${[process.env.REACT_APP_BACKEND_HOST]}/subscriptions/verify_subscription`, { preapproval_id: preApprovalIdParam }, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                })
    
                setMessage(response.data.message)
            } catch (error) {
                setError("Erro ao realizar assinatura.")
        
                console.error("Erro:", error)
            }
        }

        if (preApprovalIdParam)
            checkLastSubscription()
    }, [preApprovalIdParam])

    return (
        <StoneTabletTwoBoard>
            <Container
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                className="unselectable"
            >
                <Row width="100%" gap="2rem">
                    <Col
                        display="flex"
                        alignItems='center'
                        justifyContent='center'
                    >
                        <AffiliatedSubscriptionCard />
                    </Col>
                    <Col
                        display="flex"
                        alignItems='center'
                        justifyContent='center'
                    >
                        <AffiliatedSubscriptionCard />
                    </Col>
                    <Col
                        display="flex"
                        alignItems='center'
                        justifyContent='center'
                    >
                        <AffiliatedSubscriptionCard />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Span>{message}</Span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Span>{error}</Span>
                    </Col>
                </Row>
            </Container>
        </StoneTabletTwoBoard>
    )
}

export default Affiliated
