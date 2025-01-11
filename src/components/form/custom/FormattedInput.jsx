import React, { useState, useRef, Fragment } from 'react'
import parse from 'html-react-parser'

import { Row, Col, Input, Image } from 'components'

const FormattedInput = ({ register, setValue, name, label, errorMessage, infoMessage, type, defaultImage = undefined, imageProps = {}, inputContainerProps = {}, ...props }) => {
    const fieldRef = useRef(null)
    const [ selectedImage, setSelectedImage ] = useState(undefined)
    const { ref: registerRef, ...registerRest } = register(name)

    const onReceiveImage = (event) => {
        const image = event.target.files?.[0]

        setValue(name, image, { shouldDirty: true, shouldTouch: true })

        setSelectedImage(image ? URL.createObjectURL(image) : undefined)
    }

    const onClickImage = () => fieldRef?.current && fieldRef.current.click()

    return (
        <Row margin="15px 0px">
            <Row>
                {
                    label !== undefined
                        ? (
                            <Col style={{ textAlign: 'center' }}>
                                {label}
                            </Col>
                        )
                        : null
                }

                <Col {...inputContainerProps}>
                    {
                        type === "image"
                            ? (
                                <Fragment>
                                    <Input
                                        {...registerRest}
                                        innerRef={(e) => {
                                            registerRef(e)
                                            fieldRef.current = e
                                        }}
                                        name={name}
                                        validation={errorMessage}
                                        type="file"
                                        accept="image/*"
                                        onChange={onReceiveImage}                                        
                                        {...props}
                                        height="0"
                                        width="0"
                                        minWidth="0px"
                                    />

                                    <Image {...imageProps} src={selectedImage || defaultImage} onClick={onClickImage} />
                                </Fragment>
                            )
                            : (
                                <Input
                                    {...registerRest}
                                    name={name}
                                    validation={errorMessage}
                                    width="100%"
                                    minWidth="300px"
                                    type={type}
                                    innerRef={(ref) => {
                                        registerRef(ref)
                                        fieldRef.current = ref
                                    }}
                                    {...props}
                                />
                            )
                    }
                </Col>
            </Row>

            <Row>
                {
                    errorMessage
                        ? (
                            <Col style={{ color: '#FF0000', backgroundColor: '#FFA5A560', fontFamily: '"arial black"', borderRadius: '8px', margin: '0px 15px', marginTop: '5px' }}>
                                { parse(errorMessage) }
                            </Col>
                        )
                        : <Col />
                }
            </Row>

            <Row>
                {
                    infoMessage
                        ? (
                            <Col style={{ color: '#0000FF', backgroundColor: '#B1B2FA', fontFamily: '"arial black"', borderRadius: '8px', margin: '0px 15px', marginTop: '5px' }}>
                                { parse(infoMessage) }
                            </Col>
                        )
                        : <Col />
                }
            </Row>
        </Row>
    )
}

export default FormattedInput