import React, { useEffect, useState, useContext, Fragment } from 'react'
import _ from 'lodash'
import { useLocation, useRouteLoaderData } from 'react-router'
import axios from "axios"
import { faGear, faXmark } from '@fortawesome/free-solid-svg-icons'

import { compareDates } from 'util/intl'
import { subscriptionTypeAsDescription } from 'util/string'

import { I18nContext } from 'contexts'

import {
    StoneTabletTwoBoard,
    Container,
    AffiliatedSubscriptionCard,
    Row,
    Col,
    Span,
    TitleH2,
    TitleH4,
    Table,
    ConnectedPaginatedTable,
    Icon,
    HoverableButton,
} from 'components'

import TowerImage from 'images/layout/profile/subscriptions/tower_1.png'
import BeggarImage from 'images/layout/profile/subscriptions/beggar.png'
import BishopImage from 'images/layout/profile/subscriptions/bishop.png'
import KingImage from 'images/layout/profile/subscriptions/king.png'

const SubscribedCardActionButtons = ({ level }) => {
    
    return (
        <Row>
            <Col display="flex" gap="1rem">
                <HoverableButton
                    width="50px"
                    height="50px"
                    onHover={{
                        animation: {
                            property: `subscribeConfigurationActionButtonAnimation_${level} 0.5s linear 0s infinite alternate`,
                            corpse: `@keyframes subscribeConfigurationActionButtonAnimation_${level} {
                                0%  {transform: scale3d(1,1,1);}
                                100%  {transform: scale3d(1.03,1.03,1.03); background-color: #FFFA85; border-radius: 8px}
                            }`
                        }
                    }}
                >
                    <Icon icon={faGear} color="#FFFFFF" />
                </HoverableButton>

                <HoverableButton
                    width="50px"
                    height="50px"
                    onHover={{
                        animation: {
                            property: `subscribeCancelActionButtonAnimation_${level} 0.5s linear 0s infinite alternate`,
                            corpse: `@keyframes subscribeCancelActionButtonAnimation_${level} {
                                0%  {transform: scale3d(1,1,1);}
                                100%  {transform: scale3d(1.03,1.03,1.03); background-color: #ED8C8E; border-radius: 8px}
                            }`
                        }
                    }}
                >
                    <Icon icon={faXmark} color="#FFFFFF" />
                </HoverableButton>
            </Col>
        </Row>
    )
}

const AlreadySubscribedCard = () => {
    const { user } = useRouteLoaderData("root")

    switch (user?.current_subscription?.level) {
        case 1:
            return (
                <Row justifyContent="center" alignItems="center">
                    <LevelOneCardPlan
                        cardFooterChildren={<SubscribedCardActionButtons level={user?.current_subscription?.level} />}
                        tabletHeaderChildren={<TitleH4 textAlign="center" lineHeight="1.5" className="text-gray-800">Assinatura ativa</TitleH4>}
                    />
                </Row>
            )
        case 2:
            return (
                <Row justifyContent="center" alignItems="center">
                    <LevelTwoCardPlan
                        cardFooterChildren={<SubscribedCardActionButtons level={user?.current_subscription?.level} />}
                        tabletHeaderChildren={<TitleH4 textAlign="center" lineHeight="1.5" className="text-gray-800">Assinatura ativa</TitleH4>}
                    />
                </Row>
            )
        case 3:
            return (
                <Row justifyContent="center" alignItems="center">
                    <LevelThreeCardPlan
                        cardFooterChildren={<SubscribedCardActionButtons level={user?.current_subscription?.level} />}
                        tabletHeaderChildren={<TitleH4 textAlign="center" lineHeight="1.5" className="text-gray-800">Assinatura ativa</TitleH4>}
                    />
                </Row>
            )
        default:
            return null
    }
}

const CardPlan = ({
    level,
    title,
    subtitle,
    items,
    background,
    imageBackground,
    color,
    border,
    listGroupBorderColor,
    listGroupBackgroundColor,
    listGroupColorVariantOne,
    listGroupColorVariantTwo,
    buttonColor,
    buttonBackgroundColor,
    buttonHoverBackgroundColor,
    buttonBorder,
    image,
    cardFooterChildren,
    tabletHeaderChildren=null,
}) => (
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
                {tabletHeaderChildren ? tabletHeaderChildren : null}
                <Row width="100%" gap="2rem">
                    <Col
                        display="flex"
                        alignItems='center'
                        justifyContent='center' 
                    >
                        <AffiliatedSubscriptionCard
                            level={level}
                            cardTitle={title}
                            cardSubtitle={subtitle}
                            cardItems={items}
                            cardBackground={background}
                            cardImageBackground={imageBackground}
                            cardColor={color}
                            cardBorder={border}
                            listGroupBorderColor={listGroupBorderColor}
                            listGroupBackgroundColor={listGroupBackgroundColor}
                            listGroupColorVariantOne={listGroupColorVariantOne}
                            listGroupColorVariantTwo={listGroupColorVariantTwo}
                            buttonColor={buttonColor}
                            buttonBackgroundColor={buttonBackgroundColor}
                            buttonHoverBackgroundColor={buttonHoverBackgroundColor}
                            buttonBorder={buttonBorder}
                            image={image}
                            cardFooterChildren={cardFooterChildren}
                        />
                    </Col>
                </Row>
            </Container>
        </StoneTabletTwoBoard>
    </Col>
)

const LevelThreeCardPlan = (props) => (
    <CardPlan 
        level="level_three"
        title="Rei"
        subtitle="R$ 15,00"
        items={["Prioridade na revisão", "Suporte prioritário", "3000 Créditos mensais"]}
        background="linear-gradient(-45deg, #b16c69, #af9494, #5a6c78)"
        imageBackground="linear-gradient(45deg, #b16c6960, #af949460, #5a6c7860)"
        color="white"
        border="1px solid #5a6c78"
        listGroupBorderColor="#5a6c78"
        listGroupBackgroundColor="#af949470"
        listGroupColorVariantOne="#3c536340"
        listGroupColorVariantTwo="#3c536320"
        buttonColor="#3c5363"
        buttonBackgroundColor="#FFFFFF20"
        buttonHoverBackgroundColor="#6d889a50"
        buttonBorder="2px solid #5a6c7840"
        image={KingImage}
        {...props}
    />
)

const LevelTwoCardPlan = (props) => (
    <CardPlan
        level="level_two"
        title="Bispo"
        subtitle="R$ 10,00"
        items={["Prioridade na revisão", "Suporte prioritário", "1000 Créditos mensais"]}
        background="linear-gradient(-45deg, #ede1b5, #cba370, #e8e8de)"
        imageBackground="linear-gradient(45deg, #ede1b560, #cba37060, #e8e8de60)"
        color="white"
        border="1px solid #e8e8de"
        listGroupBorderColor="#e8e8de"
        listGroupBackgroundColor="#cba37070"
        listGroupColorVariantOne="#3c536340"
        listGroupColorVariantTwo="#3c536320"
        buttonColor="#665a3c"
        buttonBackgroundColor="#FFFFFF20"
        buttonHoverBackgroundColor="#5f502d50"
        buttonBorder="2px solid #e8e8de40"
        image={BishopImage}
        {...props}
    />
)

const LevelOneCardPlan = (props) => (
    <CardPlan
        level="level_one"
        title="Novato"
        subtitle="R$ 5,00"
        items={["Prioridade na revisão", "Suporte prioritário", "500 Créditos mensais"]}
        background="linear-gradient(-45deg, #726f67, #aba296, #685a52)"
        imageBackground="linear-gradient(45deg, #726f6760, #aba29660, #685a5260)"
        color="white"
        border="1px solid #685a52"
        listGroupBorderColor="#685a52"
        listGroupBackgroundColor="#aba29670"
        listGroupColorVariantOne="#e1937c40"
        listGroupColorVariantTwo="#e1937c20"
        buttonColor="#32170f"
        buttonBackgroundColor="#FFFFFF20"
        buttonHoverBackgroundColor="#4f4e4e50"
        buttonBorder="2px solid #685a5240"
        image={BeggarImage}
        {...props}
    />
)

const PlansCardsPresentation = () => {
    const { user } = useRouteLoaderData("root")

    return (
        <Row className="row-cols-2" justifyContent="center" alignItems="center" gap="2rem">
            {user?.current_subscription?.level === 1 ? null : <LevelOneCardPlan />}

            {user?.current_subscription?.level === 2 ? null : <LevelTwoCardPlan />}

            {user?.current_subscription?.level === 3 ? null : <LevelThreeCardPlan />}
        </Row>
    )
}

const SubscriptionsTablePresentation = () => {
    const { user } = useRouteLoaderData("root")
    const { formatDateTime, translate } = useContext(I18nContext)

    return (
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
                                    Assinaturas
                                </TitleH2>
                            </Col>
                        </Row>

                        <Row width="100%" gap="2rem">
                            <Col
                                display="flex"
                                alignItems='center'
                                justifyContent='center'
                            >
                                <ConnectedPaginatedTable endpoint={`${[process.env.REACT_APP_BACKEND_HOST]}/subscriptions`}>
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
                                                        Tipo
                                                    </Table.CellHeader>
                                                    
                                                    <Table.CellHeader>
                                                        Ultimo pagamento bem sucedido
                                                    </Table.CellHeader>
                                                </Table.Row>
                                            </Table.Header>

                                            <Table.Body>
                                                {_.map(payload, (subscription, index) => (
                                                    <Table.Row key={subscription.id}>
                                                        <Table.CellHeader>
                                                            {subscription.id}
                                                        </Table.CellHeader>

                                                        <Table.Cell>
                                                            {formatDateTime(subscription.created_at)}
                                                        </Table.Cell>

                                                        <Table.Cell>
                                                            {formatDateTime(subscription.updated_at)}
                                                        </Table.Cell>

                                                        <Table.Cell>
                                                            {formatDateTime(subscription.last_external_update_date)}
                                                        </Table.Cell>

                                                        <Table.Cell>
                                                            {translate(subscription.status)}
                                                        </Table.Cell>

                                                        <Table.Cell>
                                                            {translate(subscriptionTypeAsDescription(subscription.level))}
                                                        </Table.Cell>

                                                        <Table.Cell>
                                                            {compareDates(subscription.last_successful_payment_date, "1970-01-01T00:00:00.000Z", (one, two) => one <= two) ? translate("never") : formatDateTime(subscription.last_successful_payment_date)}
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
    )
}

const Affiliated = () => {
    const { user } = useRouteLoaderData("root")
    
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
        <Row>
            <Col display="flex" flexDirection="column" gap="2rem">
                {user.current_subscription ? (
                    <AlreadySubscribedCard />
                ) : (
                    <PlansCardsPresentation />
                )}

                <SubscriptionsTablePresentation />
            </Col>
        </Row>        
    )
}

export default Affiliated
