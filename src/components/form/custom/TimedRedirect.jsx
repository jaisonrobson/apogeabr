import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Row, TitleH4 } from 'components'

const TimedRedirect = ({ redirectTo = "/", time = 5000, className = "text-black" }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirectTo)
    }, time)

    return () => clearTimeout(timer)
  }, [navigate, redirectTo, time])

  return (
    <Row>
      <TitleH4 className={className}>Voce será redirecionado em {time/1000} segundos...</TitleH4>
    </Row>
  )
}

export default TimedRedirect
