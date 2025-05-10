import React, { Fragment, useContext } from 'react'
import _ from 'lodash'
import axios from "axios"

import { compareDates } from 'util/intl'

import { I18nContext } from 'contexts'

import {
    Row,
    Col,
    StoneTabletTwoBoard,
    Container,
    TitleH2,
    ConnectedPaginatedCardsDisplay,
    ExpandableImageModal,
    UserImageForm,
    ImageInput,
} from 'components'

import noImage from 'images/layout/generic/noImage.png'

const Images = () => {
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
                                <UserImageForm
                                    defaultValues={{
                                        image: null,
                                    }}
                                >
                                    {({ register, errors, backendErrors, fetcher, setValue, backendSuccess }) => (
                                        <Row>
                                            <Col>
                                                <Row>
                                                    <Col>
                                                        <ImageInput
                                                            register={register}
                                                            setValue={setValue}
                                                            errors={errors}
                                                            backendErrors={backendErrors}
                                                            additiveImageProps={{
                                                                marginLeft: '3rem'
                                                            }}
                                                            defaultImage={noImage}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col>
                                                        <UserImageForm.SubmitButton marginLeft="2.5rem" width="200px" />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    )}
                                </UserImageForm>
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
                                        <TitleH2 className="text-gray-800">Imagens</TitleH2>
                                    </Col>
                                </Row>

                                <Row width="100%" gap="2rem">
                                    <Col
                                        display="flex"
                                        alignItems='center'
                                        justifyContent='center'
                                    >
                                        <ConnectedPaginatedCardsDisplay endpoint={`${[process.env.REACT_APP_BACKEND_HOST]}/images`}>
                                            {({ payload, isLoading }) => (
                                                <Row
                                                    display="flex"
                                                    alignItems='center'
                                                    justifyContent='center'
                                                    gap="2rem"
                                                    marginBottom="1rem"
                                                >
                                                    {_.map(payload, (image, index) => (
                                                        <Col key={index}>
                                                            <ExpandableImageModal
                                                                width="300px"
                                                                height="200px"
                                                                image={image.image}
                                                                imageProps={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    objectFit: 'cover',
                                                                    borderRadius: '50px',
                                                                }}
                                                                modalProps={{
                                                                    borderRadius: '20px',
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

export default Images
