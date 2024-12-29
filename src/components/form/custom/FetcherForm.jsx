import React from 'react'
import { useFetcher } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, Row, Col } from 'components'

const FetcherForm = ({ onSubmitParam = () => {}, validationSchema, action, children, ...props }) => {
    const fetcher = useFetcher()
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(validationSchema) })

    const onSubmit = (data) => {
        onSubmitParam(data)

        const formData = new FormData()
        formData.append("login", data.login)
        formData.append("password", data.password)

        return fetcher.submit(
            formData,
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
                        {children(register, errors)}
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