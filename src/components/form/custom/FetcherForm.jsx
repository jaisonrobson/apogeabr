import React from 'react'
import _ from 'lodash'
import { useFetcher, useSearchParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, Row, Col } from 'components'

const SubmissionInfo = ({ fetcher }) => (
    <Row>
        {fetcher.state === "submitting" && <p>Enviando dados...</p>}
        {fetcher.state === "loading" && <p>Carregando próxima página...</p>}
    </Row>
)

const FetcherForm = ({
    onSubmit : onSubmitParam = () => {},
    allowedProperties = [],
    validationSchema,
    action,
    children,
    parentContainerProps = {},
    defaultForm = true,
    onlyTouchedFields = false,
    defaultValues = {},
    ...props
}) => {
    const fetcher = useFetcher()
    const [ searchParams ] = useSearchParams()
    const { register, handleSubmit, formState: { errors, touchedFields }, trigger, getValues, setValue } = useForm({ resolver: zodResolver(validationSchema), mode: "onChange", defaultValues: defaultValues })

    const backendErrors = JSON.parse(searchParams.get("errors") || "{}")
    
    const onSubmit = async (dataParam) => {
        let dataToValidate = dataParam

        // Filtrar apenas os campos tocados, se `onlyTouchedFields` estiver habilitado
        if (onlyTouchedFields) {
            const touchedKeys = Object.keys(touchedFields)

            // Valida apenas os campos tocados e armazena os valores válidos
            const validData = {}
            for (const field of touchedKeys) {
                const isValid = await trigger(field) // Valida o campo individualmente
                if (isValid) {
                    validData[field] = getValues(field) // Coleta o valor válido
                }
            }

            dataToValidate = validData
        }

        // Permitir manipulação adicional dos dados através do `onSubmitParam`
        let mutatedData = onSubmitParam(dataToValidate)

        if (!mutatedData) {
            mutatedData = dataToValidate
        }

        // Restrição às propriedades permitidas, se configurado
        let result = {}
        if (!_.isEmpty(allowedProperties)) {
            allowedProperties.forEach((property) => {
                if (mutatedData[property] !== undefined) {
                    result[property] = mutatedData[property]
                }
            })
        } else {
            result = mutatedData
        }

        // Enviar os dados filtrados e validados ao backend
        return fetcher.submit(result, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            action: action,
        })
    }

    return (
        <Row {...parentContainerProps}>
            <Row>
                <Col>
                    <Form {...props} onSubmit={handleSubmit(onSubmit)} method="POST">
                        {children(register, errors, backendErrors, fetcher, setValue)}
                    </Form>
                </Col>
            </Row>

            {
                defaultForm
                    ? (
                        <SubmissionInfo fetcher={fetcher} />
                    )
                    : null
            }
        </Row>
    )
}

FetcherForm.SubmissionInfo = SubmissionInfo

export default FetcherForm