import React from 'react'
import _ from 'lodash'
import { useFetcher, useSearchParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import parse from 'html-react-parser'

import { Form, Row, Col } from 'components'

import { enforceJsonNotFalseyValues } from 'util/array'

const SubmissionInfo = ({ fetcher, errors, success }) => (
    <Row>
        {errors?.customError && (
            <Col style={{ color: '#FF0000', backgroundColor: '#FFA5A560', fontFamily: '"arial black"', borderRadius: '8px', margin: '0px 15px', marginTop: '5px' }}>
                { parse(errors?.customError.message) }
            </Col>
        )}

        {success?.message && (
            <Col style={{ color: '#00B114', backgroundColor: '#B6FFC060', fontFamily: '"arial black"', borderRadius: '8px', margin: '0px 15px', marginTop: '5px' }}>
                { parse(success?.message) }
            </Col>
        )}
        {fetcher.state === "submitting" && <p>Enviando dados...</p>}
        {fetcher.state === "loading" && <p>Carregando próxima página...</p>}
    </Row>
)

const FetcherForm = ({
    onSubmit : onSubmitParam = () => {},
    allowedProperties = [],
    enforceProperties = [],
    validationSchema,
    action,
    children,
    parentContainerProps = {},
    defaultForm = true,
    onlyTouchedFields = false,
    defaultValues = {},
    useFormProps = {},
    externalSchema,
    ...props
}) => {
    const fetcher = useFetcher()
    const [ searchParams ] = useSearchParams()
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
        trigger,
        getValues,
        setValue,
        setError,
        clearErrors
    } = useForm({
        resolver: zodResolver(validationSchema),
        mode: "onChange",
        defaultValues: defaultValues,
        ...useFormProps
    })

    const backendErrors = JSON.parse(searchParams.get("errors") || "{}")
    const backendSuccess = JSON.parse(searchParams.get("success") || "{}")
    
    const onSubmit = async (dataParam) => {
        let dataToValidate = dataParam

        // Filtrar apenas os campos tocados, se `onlyTouchedFields` estiver habilitado
        if (onlyTouchedFields) {
            const touchedKeys = Object.keys(touchedFields)

            const touchedValues = {}
            for (const field of touchedKeys) {
                await trigger(field)

                touchedValues[field] = getValues(field)
            }

            if (externalSchema) {
                try {
                    await externalSchema.parseAsync(touchedValues)
                } catch (error) {
                    if (error instanceof z.ZodError) {
                        error.errors.forEach(({ path, message }) => {
                            setError(path[0], { type: "manual", message }, { shouldFocus: true })
                        })

                        return false
                    }
                }
            }

            dataToValidate = touchedValues
        }

        // Permitir manipulação adicional dos dados através do `onSubmitParam`
        let mutatedData = onSubmitParam(dataToValidate)

        if (!mutatedData)
            mutatedData = dataToValidate

        // Restrição às propriedades permitidas, se configurado
        let result = {}
        if (!_.isEmpty(allowedProperties)) {
            allowedProperties.forEach((property) => {
                if (mutatedData[property] !== undefined) {
                    result[property] = mutatedData[property]
                }
            })
        } else
            result = mutatedData

        if (!_.isEmpty(enforceProperties) && !enforceJsonNotFalseyValues(result, enforceProperties)) {
            setError("customError", {
                type: 'manual',
                message: "Falha no envio do formulario, algum valor obrigatório não foi passado."
            })

            return false //algum valor obrigatorio nao foi passado para o payload da requisicao
        }
        else
            clearErrors("customError")

        //Tratamento do resultado para que seja aceito passagem de campos do tipo arquivo
        const formData = new FormData()

        // Adicione todos os campos ao FormData
        for (const key in result) {
            if (result[key] instanceof FileList) {
            // Para campos de arquivo, adicione cada arquivo individualmente
                Array.from(result[key]).forEach((file) => {
                    formData.append(key, file) //Verificar uma abordagem melhor do que essa, pois esta sobreescrevendo a chave toda vez que um novo arquivo e encontrado no vetor
                })
            }
            else {
                formData.append(key, result[key])
            }
        }

        // Enviar os dados filtrados e validados ao backend
        return fetcher.submit(formData, {
            method: "POST",
            encType: 'multipart/form-data',
            headers: {
                "Content-Type": "multipart/form-data",
            },
            action: action,
        })
    }

    return (
        <Row {...parentContainerProps}>
            <Row>
                <Col>
                    <Form {...props} onSubmit={handleSubmit(onSubmit)} method="POST">
                        {children({ register, errors, backendErrors, fetcher, setValue, backendSuccess })}
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