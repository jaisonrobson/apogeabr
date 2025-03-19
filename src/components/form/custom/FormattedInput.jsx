import React, { useState, useRef, Fragment, useEffect } from 'react'
import parse from 'html-react-parser'
import { useFormContext } from "react-hook-form"

import {
    Row,
    Col,
    Input,
    Image,
    DropdownInput,
    RadioButtonsGroupInput,
    ElasticSearchDropdownInput,
    Span,
} from 'components'

const FormattedInput = ({
    register,
    setValue,
    name,
    label,
    errorMessage,
    infoMessage,
    type,
    defaultImage = undefined,
    imageProps = {},
    light=false,
    inputContainerProps = {},
    reloadImage = false,
    ...props
}) => {
    const fieldRef = useRef(null)
    const { value: { getValues, setValue: contextSetValue, formState: { defaultValues } } } = useFormContext()
    const [ selectedImage, setSelectedImage ] = useState(undefined)
    const { ref: registerRef, ...registerRest } = register(name)

    useEffect(() => {
        if (type === "image" && reloadImage)
            onReceiveImage(getValues(name))
    }, [reloadImage, defaultValues])

    const onChange = (event) => {
        const image = event.target.files?.[0]

        setValue(name, image, { shouldDirty: true, shouldTouch: true })

        setSelectedImage(image ? URL.createObjectURL(image) : undefined)
    }

    const onReceiveImage = async (file) => {
        const image = await file

        contextSetValue(name, image, { shouldDirty: true, shouldTouch: true })

        setSelectedImage(image ? URL.createObjectURL(image) : undefined)
    }

    const onClickImage = () => fieldRef?.current && fieldRef.current.click()

    const renderInput = () => {
        switch (type) {
            case "image":
                return (
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
                            onChange={onChange}                                        
                            {...props}
                            height="0"
                            width="0"
                            minWidth="0px"
                        />

                        <Image cursor="pointer" {...imageProps} src={selectedImage || defaultImage} onClick={onClickImage} />
                    </Fragment>
                )
            case "dropdown":
                return (
                    <DropdownInput
                        name={name}
                        validation={errorMessage}
                        containerStyle={{
                            height:"28px",
                            width:"100%",
                            minWidth:"300px",
                        }}
                        setValue={setValue}
                        light={light}
                        {...props}
                    />
                )
            case "elasticdropdown":
                return (
                    <ElasticSearchDropdownInput
                        name={name}
                        validation={errorMessage}
                        containerStyle={{
                            height:"28px",
                            width:"100%",
                            minWidth:"300px",
                        }}
                        setValue={setValue}
                        light={light}
                        {...props}
                    />
                )
            case "radiobuttons":
                return (
                    <RadioButtonsGroupInput
                        validation={errorMessage}
                        setValue={setValue}
                        name={name}
                        light={light}
                        {...props}
                    />
                )
            default:
                return (
                    <Input
                        {...registerRest}
                        name={name}
                        validation={errorMessage}
                        height="28px"
                        width="100%"
                        minWidth="300px"
                        type={type}
                        light={light}                        
                        innerRef={(ref) => {
                            registerRef(ref)
                            fieldRef.current = ref
                        }}
                        {...props}
                    />
                )
        }
    }

    return (
        <Row margin="15px 0px">
            <Row>
                {
                    label !== undefined
                        ? (
                            <Col textAlign="center">
                                <Span textShadow={light ? "0px 0px 5px black" : "0px 0px 5px white"}>
                                    {label}
                                </Span>
                            </Col>
                        )
                        : null
                }

                <Col {...inputContainerProps} display="flex" justifyContent={type === "image" ? "center" : "flex-end"}>
                    {renderInput()}
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