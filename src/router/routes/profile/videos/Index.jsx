import React, { Fragment, useContext } from 'react'
import _ from 'lodash'
import axios from "axios"

import { getYouTubeThumbnail } from 'util/string'

import { I18nContext } from 'contexts'

import {
    Row,
    Col,
    StoneTabletTwoBoard,
    Container,
    TitleH2,
    ConnectedPaginatedCardsDisplay,
    ExpandableVideoModal,
    UserVideoForm,
    ImageInput,
    FormattedInput,
    Span,
} from 'components'

import noImage from 'images/layout/generic/noImage.png'

const Videos = () => {
    const { formatDateTime, translate } = useContext(I18nContext)

    return (
        <Row>
            <Col display="flex" flexDirection="column" gap="2rem">
                <Row className="row-cols-2" justifyContent="center" alignItems="center" gap="2rem">
                    <Col
                        xs="12"
                        sm="12"
                        md="8"
                        lg="6"
                        xl="6"
                        xxl="6"
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
                                <UserVideoForm
                                    defaultValues={{
                                        image: null,
                                    }}
                                >
                                    {({ register, errors, backendErrors, fetcher, setValue, backendSuccess }) => (
                                        <Row>
                                            <Col>
                                                <Row>
                                                    <Col
                                                        display="flex"
                                                        justifyContent="center"
                                                    >
                                                        <Span>Link: </Span>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col>
                                                        <FormattedInput
                                                            marginLeft="15px"
                                                            minWidth="300px"
                                                            register={register}
                                                            name="link"
                                                            errorMessage={errors?.name?.message}
                                                            fontFamily="arial"
                                                            inputContainerProps={{
                                                                width: '100%',
                                                                marginLeft:"15px",
                                                                padding: "0",
                                                            }}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col
                                                        display="flex"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                    >
                                                        <UserVideoForm.SubmitButton width="200px" />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    )}
                                </UserVideoForm>
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
                                        <TitleH2 className="text-gray-800">Videos</TitleH2>
                                    </Col>
                                </Row>

                                <Row width="100%" gap="2rem">
                                    <Col
                                        display="flex"
                                        alignItems='center'
                                        justifyContent='center'
                                    >
                                        <ConnectedPaginatedCardsDisplay endpoint={`${[process.env.REACT_APP_BACKEND_HOST]}/videos`}>
                                            {({ payload, isLoading }) => (
                                                <Row
                                                    display="flex"
                                                    alignItems='center'
                                                    justifyContent='center'
                                                    gap="2rem"
                                                    marginBottom="1rem"
                                                >
                                                    {_.map(payload, (video, index) => (
                                                        <Col key={index}>
                                                            <ExpandableVideoModal
                                                                width="300px"
                                                                height="200px"
                                                                border="none"
                                                                image={getYouTubeThumbnail(video.link)}
                                                                url={video.link}
                                                                videoProps={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    border:"none",
                                                                }}
                                                                modalProps={{
                                                                    borderRadius: "20px",
                                                                }}
                                                            />
                                                        </Col>
                                                    ))}
                                                </Row>
                                            )}
                                        </ConnectedPaginatedCardsDisplay>
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

export default Videos
