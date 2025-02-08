import React, { useState, Fragment } from "react"
import axios from "axios"
import _ from 'lodash'

import { Button, Span } from 'components'

const AffiliatedSubscriptionButton = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubscription = async () => {
    setLoading(true)

    try {
        const response = await axios.get(`${[process.env.REACT_APP_BACKEND_HOST]}/subscriptions/level_one`, {
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
      <Button
        onClick={handleSubscription} disabled={loading}
        width="400px"
        color="#543728"
        backgroundColor='#FFFFFF20'
        border='2px solid #B97A5740'
        onHover={{
            animation: {
                property: 'loginButtonAnimation 0.5s linear 0s infinite alternate',
                corpse: `@keyframes loginButtonAnimation {
                    0%  {transform: scale3d(1,1,1);}
                    100%  {transform: scale3d(1.03,1.03,1.03); background-color: #FCA67750; border-radius: 8px}
                }`
            }
        }}
      >
        {loading ? "Processando..." : "Assinar"}
      </Button>

      { !_.isEmpty(error) ? <Span>{error}</Span> : null }
    </Fragment>
  )
}

export default AffiliatedSubscriptionButton
