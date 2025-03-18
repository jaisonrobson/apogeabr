import React, { useState, useEffect, Fragment } from "react"
import axios from 'axios'

import {
    Input,
    Div,
    Row,
    Col,
} from 'components'

const ElasticSearchInput = ({
    children,
    searchEndpoint,
    inputProps = {},
    containersStyles = [{}, {}, {}, {}],
    ...props
}) => {
  const [query, setQuery] = useState("")
  const [finalEndpointUrl, setFinalEndpointUrl] = useState("")

  useEffect(() => {
    if (query.length < 2) {
        setFinalEndpointUrl("")

        return
    }

    const updateFinalEndpointUrl = async () => {
        if (query.length < 2)
            return

        setFinalEndpointUrl(`${searchEndpoint}?query=${query}`)
    }

    const delayDebounce = setTimeout(() => {
        if (query) {
            updateFinalEndpointUrl()
        }
    }, 1000)

    return () => clearTimeout(delayDebounce)
  }, [query])

    return (
        <Fragment>
            <Row {...containersStyles[0]}>
                <Col {...containersStyles[1]}>
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Realizar busca..."
                        {...inputProps}
                    />
                </Col>
            </Row>

            <Row {...containersStyles[2]}>
                <Col {...containersStyles[3]}>
                    {children({ query, finalEndpointUrl })}
                </Col>
            </Row>
        </Fragment>
    )
}

export default ElasticSearchInput
