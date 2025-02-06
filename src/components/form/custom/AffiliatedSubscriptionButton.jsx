import React, { useState, Fragment } from "react"
import axios from "axios"
import _, { set } from 'lodash'

import { Button, Span } from 'components'

const SubscriptionButton = () => {
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
      <Button onClick={handleSubscription} disabled={loading}>
        {loading ? "Processando..." : "Assinar"}
      </Button>

      { !_.isEmpty(error) ? <Span>{error}</Span> : null }
    </Fragment>
  )
}

export default SubscriptionButton
