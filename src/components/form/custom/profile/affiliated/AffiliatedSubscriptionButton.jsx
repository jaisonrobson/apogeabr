import React, { useState, Fragment } from "react"
import axios from "axios"
import _ from 'lodash'

import { Button, Span, Row, Col } from 'components'

const AffiliatedSubscriptionButton = ({
  level="level_one",
  color="#543728",
  backgroundColor="#FFFFFF20",
  hoverBackgroundColor="#FCA67750",
  border="2px solid #B97A5740",
  buttonText="Assinar"
}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubscription = async () => {
    setLoading(true)

    try {
        const response = await axios.get(`${[process.env.REACT_APP_BACKEND_HOST]}/subscriptions/${level}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })

        if (response.data.subscription_url) {
            window.location.href = response.data.subscription_url // Redireciona para o Mercado Pago
        } else {
            alert("Erro ao criar assinatura.")
        }
    } catch (error) {
        setError("Erro ao realizar assinatura.")

        console.error("Erro:", error)
    } finally {
        setLoading(false)
    }
  }

  return (
    <Fragment>
      <Row>
        <Col>
          <Button
            onClick={handleSubscription} disabled={loading}
            width="200px"
            color={color}
            backgroundColor={backgroundColor}
            border={border}
            onHover={{
                animation: {
                    property: `loginButtonAnimation_${level} 0.5s linear 0s infinite alternate`,
                    corpse: `@keyframes loginButtonAnimation_${level} {
                        0%  {transform: scale3d(1,1,1);}
                        100%  {transform: scale3d(1.03,1.03,1.03); background-color: ${hoverBackgroundColor}; border-radius: 8px}
                    }`
                }
            }}
          >
            {loading ? "Processando..." : buttonText}
          </Button>
        </Col>
      </Row>

      <Row>
        <Col textAlign="center">
          { !_.isEmpty(error) ? <Span>{error}</Span> : null }
        </Col>
      </Row>
    </Fragment>
  )
}

export default AffiliatedSubscriptionButton
