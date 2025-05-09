import React, { useEffect, useState, useContext, Fragment } from 'react'
import _ from 'lodash'
import { useLocation } from 'react-router'
import axios from "axios"

import { compareDates } from 'util/intl'
import { typeAsDescription } from 'util/string'

import { I18nContext } from 'contexts'

import {
    StoneTabletTwoBoard,
    Container,
    Row,
    Col,
    Span,
    TitleH2,
    Table,
    ConnectedPaginatedTable,
    DonationAnimatedMotionCard,
} from 'components'

const Donations = () => {
    const { formatDateTime, translate } = useContext(I18nContext)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const paymentIdParam = searchParams.get('payment_id')

    useEffect(() => {
        async function checkLastPayment() {
            try {
                const response = await axios.post(`${[process.env.REACT_APP_BACKEND_HOST]}/donations/verify_payment`, { preference_id: paymentIdParam }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                })
    
                setMessage(response.data.message)
            } catch (error) {
                setError("Erro ao verificar pagamento.")
        
                console.error("Erro:", error)
            }
        }

        if (paymentIdParam)
            checkLastPayment()
    }, [paymentIdParam])

    return (
        <Row>
            <Col display="flex" flexDirection="column" gap="2rem">
                <Row className="row-cols-1" justifyContent="center" alignItems="center" gap="2rem">
                    <Col
                        xs="12"
                        sm="12"
                        md="8"
                        lg="6"
                        xl="4"
                        xxl="2"
                        minWidth="425px"
                    >
                        <StoneTabletTwoBoard>
                            <Container
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                className="unselectable"
                            >
                                <Row>
                                    <Col
                                        display="flex"
                                        alignItems='center'
                                        justifyContent='center'
                                    >
                                        <DonationAnimatedMotionCard
                                            cardTitle="R$ 2,00"
                                            cardItems={[
                                                "+1 Imagem no hall da fama",
                                                "+50 Créditos"
                                            ]}
                                            defaultAmount={2}
                                            cardBackground="linear-gradient(-45deg, #C9B091, #C99E6B, #544333)"
                                            cardImageBackground="linear-gradient(45deg, #C9B09160, #C99E6B60, #54433360)"
                                            cardBorder="1px solid #544333"
                                            listGroupBorderColor="#544333"
                                            listGroupBackgroundColor="#C99E6B70"
                                            listGroupColorVariantOne="#7f7fa540"
                                            listGroupColorVariantTwo="#7f7fa520"
                                            buttonColor="#0f1132"
                                            buttonBackgroundColor="#FFFFFF20"
                                            buttonHoverBackgroundColor="#4f4e4e50"
                                            buttonBorder="2px solid #54433340"
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </StoneTabletTwoBoard>
                    </Col>

                    <Col
                        xs="12"
                        sm="12"
                        md="8"
                        lg="6"
                        xl="4"
                        xxl="2"
                        minWidth="425px"
                    >
                        <StoneTabletTwoBoard>
                            <Container
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                className="unselectable"
                            >
                                <Row>
                                    <Col
                                        display="flex"
                                        alignItems='center'
                                        justifyContent='center'
                                    >
                                        <DonationAnimatedMotionCard
                                            cardTitle="R$ 10,00"
                                            cardItems={[
                                                "+2 Imagens no hall da fama",
                                                "+1 Video (1 minuto) no hall da fama",
                                                "+100 Créditos"
                                            ]}
                                            defaultAmount={10}
                                            cardBackground="linear-gradient(-45deg, #B6B8C4, #8F8F8F, #424242)"
                                            cardImageBackground="linear-gradient(45deg, #B6B8C460, #8F8F8F60, #42424260)"
                                            cardBorder="1px solid #424242"
                                            listGroupBorderColor="#424242"
                                            listGroupBackgroundColor="#8F8F8F70"
                                            listGroupColorVariantOne="#7f7fa540"
                                            listGroupColorVariantTwo="#7f7fa520"
                                            buttonColor="#0f1132"
                                            buttonBackgroundColor="#FFFFFF20"
                                            buttonHoverBackgroundColor="#4f4e4e50"
                                            buttonBorder="2px solid #42424240"
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </StoneTabletTwoBoard>
                    </Col>

                    <Col
                        xs="12"
                        sm="12"
                        md="8"
                        lg="6"
                        xl="4"
                        xxl="2"
                        minWidth="425px"
                    >
                        <StoneTabletTwoBoard>
                            <Container
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                className="unselectable"
                            >
                                <Row>
                                    <Col
                                        display="flex"
                                        alignItems='center'
                                        justifyContent='center'
                                    >
                                        <DonationAnimatedMotionCard
                                            cardTitle="Personalizado"
                                            cardItems={[
                                                "+1 Imagem a cada R$ 5,00 reais",
                                                "+1 Video (1 minuto) a cada R$ 10,00 reais",
                                                "+50 Créditos a cada R$ 5,00 reais"
                                            ]}
                                            isCustom={true}
                                            defaultAmount={15}
                                            cardBackground="linear-gradient(-45deg, #76ADC5, #3C7587, #1E4452)"
                                            cardImageBackground="linear-gradient(45deg, #76ADC560, #3C758760, #1E445260)"
                                            cardBorder="1px solid #A8D4D6"
                                            listGroupBorderColor="#A8D4D6"
                                            listGroupBackgroundColor="#3C758770"
                                            listGroupColorVariantOne="#35354550"
                                            listGroupColorVariantTwo="#35354525"
                                            buttonColor="#0F2E32"
                                            buttonBackgroundColor="#FFFFFF20"
                                            buttonHoverBackgroundColor="#4f4e4e50"
                                            buttonBorder="2px solid #1E445240"
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </StoneTabletTwoBoard>
                    </Col>
                </Row>

                <Row>
                    <Col>
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
                                        <TitleH2 className="text-gray-800">
                                            Doações
                                        </TitleH2>
                                    </Col>
                                </Row>

                                <Row width="100%" gap="2rem">
                                    <Col
                                        display="flex"
                                        alignItems='center'
                                        justifyContent='center'
                                    >
                                        <ConnectedPaginatedTable endpoint={`${[process.env.REACT_APP_BACKEND_HOST]}/donations`}>
                                            {({ payload, isLoading }) => (
                                                <Fragment>
                                                    <Table.Header>
                                                        <Table.Row>
                                                            <Table.CellHeader>
                                                                #
                                                            </Table.CellHeader>

                                                            <Table.CellHeader>
                                                                Criação
                                                            </Table.CellHeader>

                                                            <Table.CellHeader>
                                                                Última atualização interna
                                                            </Table.CellHeader>

                                                            <Table.CellHeader>
                                                                Última atualização externa
                                                            </Table.CellHeader>

                                                            <Table.CellHeader>
                                                                Status
                                                            </Table.CellHeader>

                                                            <Table.CellHeader>
                                                                Valor
                                                            </Table.CellHeader>
                                                            
                                                            <Table.CellHeader>
                                                                Último pagamento
                                                            </Table.CellHeader>
                                                        </Table.Row>
                                                    </Table.Header>

                                                    <Table.Body>
                                                        {_.map(payload, (donation, index) => (
                                                            <Table.Row key={donation.id}>
                                                                <Table.CellHeader>
                                                                    {donation.id}
                                                                </Table.CellHeader>

                                                                <Table.Cell>
                                                                    {formatDateTime(donation.created_at)}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {formatDateTime(donation.updated_at)}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {formatDateTime(donation.last_external_update_date)}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {translate(donation.status)}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    R$ {donation.transaction_amount}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {compareDates(donation.last_successful_payment_date, "1970-01-01T00:00:00.000Z", (one, two) => one <= two) ? translate("never") : formatDateTime(donation.last_successful_payment_date)}
                                                                </Table.Cell>
                                                            </Table.Row>
                                                        ))}
                                                    </Table.Body>
                                                </Fragment>
                                            )}
                                        </ConnectedPaginatedTable>
                                    </Col>
                                </Row>
                            </Container>
                        </StoneTabletTwoBoard>
                    </Col>
                </Row>
            </Col>
        </Row>        
    )
}

export default Donations 