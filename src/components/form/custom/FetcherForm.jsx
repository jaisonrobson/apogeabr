import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { useFetcher, useSearchParams } from 'react-router-dom'
import { useForm, FormProvider, useWatch } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import parse from 'html-react-parser'

import { Form, Row, Col, Input } from 'components'

import { enforceJsonNotFalseyValues } from 'util/array'

const SubmitButton = ({ animationBackgroundColor = "lightgray", animationName = "defaultFormSubmitAnimation", ...props }) => (
    <Input
        value='Enviar'
        type="submit"
        backgroundColor='#00000060'
        border='2px solid gray'
        onHover={{
            animation: {
                property: `${animationName} 0.5s linear 0s infinite alternate`,
                corpse: `@keyframes ${animationName} {
                    0%  {transform: scale3d(1,1,1);}
                    100%  {transform: scale3d(1.03,1.03,1.03); background-color: ${animationBackgroundColor}; border-radius: 8px}
                }`
            }
        }}
        {...props}
    />
)

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

const defaultLateLoadingValues = () => {}

const FetcherForm = ({
    onBeforeSubmit : onBeforeSubmitParam = () => {},
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
    lateLoadingProps={},
    lateLoadingTriggers=[],
    lateLoadingValues = defaultLateLoadingValues,
    onAfterLateLoadValues = () => {},
    useFormProps = {},
    externalSchema,
    ...props
}) => {
    const fetcher = useFetcher()
    const [searchParams] = useSearchParams()
    
    const [resolvedDefaultValues, setResolvedDefaultValues] = useState(defaultValues)
    const [touchedFields, setTouchedFields] = useState({})
    const [isLoadingLateValues, setIsLoadingLateValues] = useState(!_.isEqual(lateLoadingValues, defaultLateLoadingValues))
    
    const {
        register,
        handleSubmit,
        formState,
        trigger,
        getValues,
        setValue,
        setError,
        clearErrors,
        reset,
        control
    } = useForm({
        resolver: zodResolver(validationSchema),
        mode: "onChange",
        defaultValues: resolvedDefaultValues,
        ...useFormProps
    })
    const currentFieldsValues = useWatch({ control })

    useEffect(() => {
        if (!_.isEmpty(lateLoadingTriggers)) {
            const isMatching = lateLoadingTriggers.every(
                trigger =>
                    Object.entries(trigger).every(
                        ([key, value]) => _.isEqual(lateLoadingProps[key], value)
                    )
            )
    
            if (isMatching) {
                // Função para resolver valores assíncronos dentro de defaultValues
                const resolveAsyncDefaults = async () => {
                    const resolvedValues = { ...lateLoadingValues() }
    
                    const entries = Object.entries(lateLoadingValues())
                    for (const [key, value] of entries) {
                        if (value instanceof Promise) {
                            resolvedValues[key] = await value
                        }
                    }
    
                    setResolvedDefaultValues(resolvedValues)
                    reset(resolvedValues) // Atualiza os valores do formulário
                    
                    onAfterLateLoadValues(reset)
                    setIsLoadingLateValues(false)
                }
    
                resolveAsyncDefaults()
            }
        }
    }, [defaultValues, reset, lateLoadingProps])

    useEffect(() => {
        const changedFieldsKeys = Object.keys(currentFieldsValues).filter(
          (key) => currentFieldsValues[key] !== resolvedDefaultValues[key]
        )

        setTouchedFields(changedFieldsKeys)
      }, [currentFieldsValues])

    const backendErrors = JSON.parse(searchParams.get("errors") || "{}")
    const backendSuccess = JSON.parse(searchParams.get("success") || "{}")
    
    const onSubmit = async (dataParam) => {
        let dataToValidate = dataParam

        // Filtrar apenas os campos tocados, se `onlyTouchedFields` estiver habilitado
        if (onlyTouchedFields) {
            const touchedKeys = touchedFields

            const touchedValues = {}
            for (const field of touchedKeys) {
                await trigger(field)
                touchedValues[field] = getValues(field)
            }

            //Se nenhum campo foi tocado, evitar o envio do formulário
            if (_.isEmpty(touchedValues)) return false

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

        // Permitir manipulação adicional dos dados através do `onBeforeSubmitParam`
        let mutatedData = onBeforeSubmitParam(dataToValidate)
        if (!mutatedData) mutatedData = dataToValidate

        // Restrição às propriedades permitidas, se configurado
        let result = {}
        if (!_.isEmpty(allowedProperties)) {
            allowedProperties.forEach((property) => {
                if (mutatedData[property] !== undefined) {
                    result[property] = mutatedData[property]
                }
            })
        } else result = mutatedData

        if (!_.isEmpty(enforceProperties) && !enforceJsonNotFalseyValues(result, enforceProperties)) {
            setError("customError", {
                type: 'manual',
                message: "Falha no envio do formulário, algum valor obrigatório não foi passado."
            })

            return false
        } else clearErrors("customError")

        //Tratamento do resultado para que seja aceito passagem de campos do tipo arquivo
        const formData = new FormData()

        // Adicione todos os campos ao FormData
        for (const key in result) {
            if (result[key] instanceof FileList) {
                // Para campos de arquivo, adicione cada arquivo individualmente
                Array.from(result[key]).forEach((file) => {
                    formData.append(key, file) //Verificar uma abordagem melhor do que essa, pois esta sobreescrevendo a chave toda vez que um novo arquivo e encontrado no vetor
                })
            } else {
                formData.append(key, result[key])
            }
        }

        onSubmitParam()

        // Enviar os dados filtrados e validados ao backend
        return fetcher.submit(formData, {
            method: "POST",
            encType: 'multipart/form-data',
            action: action,
        })
    }

    return (
        <Row {...parentContainerProps}>
            <Row>
                <Col>
                    <FormProvider value={{ register, handleSubmit, formState, trigger, getValues, setValue, setError, clearErrors, reset }}>
                        <Form {...props} onSubmit={handleSubmit(onSubmit)} method="POST">
                            {children({ register, errors: formState.errors, backendErrors, fetcher, setValue, backendSuccess, isLoadingLateValues })}
                        </Form>
                    </FormProvider>
                </Col>
            </Row>

            {defaultForm ? <SubmissionInfo fetcher={fetcher} success={backendSuccess} /> : null}
        </Row>
    )
}

FetcherForm.SubmitButton = SubmitButton
FetcherForm.SubmissionInfo = SubmissionInfo

export default FetcherForm