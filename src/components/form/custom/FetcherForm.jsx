import React from 'react'
import _ from 'lodash'
import { useFetcher, useSearchParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, Row, Col } from 'components'

const FetcherForm = ({ onSubmit : onSubmitParam = () => {}, allowedProperties = [], validationSchema, action, children, ...props }) => {
    const fetcher = useFetcher()
    const [ searchParams ] = useSearchParams()
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(validationSchema) })

    const backendErrors = JSON.parse(searchParams.get("errors") || "{}")
    
    const onSubmit = (data) => {
        let mutatedData = onSubmitParam(data)

        if (!mutatedData)
            mutatedData = data
       
        let result = {}

        if (!_.isEmpty(allowedProperties))
            _.forEach(allowedProperties, (property) => {
                result = { ...result, [property]: mutatedData[property]}
            })


        return fetcher.submit(
            result,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                action: action,
            }
        )
    }

    return (
        <Row>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit(onSubmit)} method="POST">
                        {children(register, errors, backendErrors)}
                    </Form>
                </Col>
            </Row>

            <Row>
                {fetcher.state === "submitting" && <p>Enviando dados...</p>}
                {fetcher.state === "loading" && <p>Carregando próxima página...</p>}
            </Row>
        </Row>
    )
}

export default FetcherForm