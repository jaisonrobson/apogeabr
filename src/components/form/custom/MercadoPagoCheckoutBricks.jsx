import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Payment, StatusScreen } from '@mercadopago/sdk-react'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { faPix } from '@fortawesome/free-brands-svg-icons'

import { withMercadoPagoBricksContext, MercadoPagoBricksContext } from 'contexts'

import {
    Button,
    Icon,
    Input,
    Container,
    Row,
    Col,
    TitleH4,
    Div,
    CopyableDisabledInput,
 } from 'components'

 const PixStatusScreen = () => {
    const { paymentStatus } = useContext(MercadoPagoBricksContext)

    const getStatusConfig = () => {
        switch (paymentStatus) {
            case 'approved':
                return {
                    color: '#28a745',
                    title: 'Pagamento Aprovado!',
                    message: 'Seu pagamento foi processado com sucesso.',
                    icon: '✓'
                }
            case 'rejected':
                return {
                    color: '#dc3545',
                    title: 'Pagamento Rejeitado',
                    message: 'Não foi possível processar seu pagamento. Por favor, tente novamente.',
                    icon: '✕'
                }
            case 'pending':
            default:
                return {
                    color: '#ffc107',
                    title: 'Aguardando Pagamento',
                    message: 'Estamos aguardando a confirmação do seu pagamento.',
                    icon: '⟳'
                }
        }
    }

    const statusConfig = getStatusConfig()

    return (
        <Container>
            <Row>
                <Col>
                    <Div 
                        style={{ 
                            textAlign: 'center',
                            padding: '2rem',
                            borderRadius: '8px',
                            backgroundColor: '#f8f9fa',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        <Div 
                            style={{ 
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                backgroundColor: statusConfig.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1rem',
                                color: 'white',
                                fontSize: '2rem'
                            }}
                        >
                            {statusConfig.icon}
                        </Div>

                        <TitleH4 
                            style={{ 
                                color: statusConfig.color,
                                marginBottom: '1rem'
                            }}
                        >
                            {statusConfig.title}
                        </TitleH4>

                        <p style={{ 
                            color: '#6c757d',
                            fontSize: '1.1rem',
                            marginBottom: '1rem'
                        }}>
                            {statusConfig.message}
                        </p>

                        {paymentStatus === 'pending' && (
                            <Div style={{ marginTop: '1rem' }}>
                                <p style={{ 
                                    color: '#6c757d',
                                    fontSize: '0.9rem',
                                    fontStyle: 'italic'
                                }}>
                                    Esta página será atualizada automaticamente
                                </p>
                            </Div>
                        )}
                    </Div>
                </Col>
            </Row>
        </Container>
    )
 }

 const PixPayment = () => {
    const {
        isLoading,
        payload,
        preferenceId,
        error,
        pixCode,
        paymentData,
        showStatusScreen,
        paymentStatus,
        showPixQRCode,
        showPaymentData,
        endpoint,
        setPayload,
        setPreferenceId,
        setError,
        setPixCode,
        setPaymentData,
        setShowStatusScreen,
        setPaymentStatus,
        setShowPixQRCode,
        setShowPaymentData,
        enableLoading,
        disableLoading,
        amount
    } = useContext(MercadoPagoBricksContext)

    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')

    const handleClick = async (e) => {
        enableLoading()

        try {
            const response = await axios.post(`${endpoint}/create_payment_pix`,
                {
                    transaction_amount: amount,
                    email: email,
                    cpf: cpf,
                    first_name: first_name,
                    last_name: last_name,
                    mp_preference_id: preferenceId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            )
            
            setPaymentData({
                email: email,
                cpf: cpf,
                first_name: first_name,
                last_name: last_name,
                paymentId: response.data.id,
                paymentStatus: response.data.status,
                paymentQRCode: response.data.qr_code,
                paymentQRCodeBase64: response.data.qr_code_base64,

            })

            setShowStatusScreen(true)
            setShowPaymentData(true)
            setShowPixQRCode(true)
        } catch (error) {
            setError("Erro ao criar pagamento via pix.")
            console.error("Erro:", error)
        } finally {
            disableLoading()
        }        
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Input
                        type="text"
                        placeholder="digite o seu email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />                
                </Col>
            </Row>

            <Row>
                <Col>
                    <Input
                        type="text"
                        placeholder="digite o seu CPF"
                        name="cpf"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    />
                </Col>
            </Row>
            
            <Row>
                <Col>
                    <Input
                        type="text"
                        placeholder="digite seu nome"
                        name="first_name"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Input
                        type="text"
                        placeholder="digite o seu sobrenome"
                        name="last_name"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button onClick={handleClick}>Prosseguir</Button>
                </Col>
            </Row>
        </Container>
    )
}

 const InitialBricksOptions = () => {
    const {
        selectedPaymentMethod,
        setSelectedPaymentMethod
    } = useContext(MercadoPagoBricksContext)

    return (
        <Container>
            <Row>
                <Col>
                    <Button onClick={() => setSelectedPaymentMethod('credit-card')}>
                        <Icon icon={faCreditCard} />
                        Outro método de pagamento
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button onClick={() => setSelectedPaymentMethod('pix')}>
                        <Icon icon={faPix} />
                        Pagar com PIX
                    </Button>
                </Col>
            </Row>
        </Container>
    )
 }

const MercadoPagoCheckoutBricks = ({
    title = "Faça uma doação",
    description = "Ajude a manter o projeto",
    amount = 10,
    currency = "BRL",
    endpoint = `${[process.env.REACT_APP_BACKEND_HOST]}/donations`
}) => {
    const {
        isLoading,
        preferenceId,
        error,
        pixCode,
        paymentData,
        paymentStatus,
        selectedPaymentMethod,
        showStatusScreen,
        showPixQRCode,
        showPaymentData,
        setPreferenceId,
        setError,
        setPixCode,
        setPaymentData,
        setShowStatusScreen,
        setShowPixQRCode,
        setShowPaymentData,
        setPaymentStatus,
        setEndpoint,
        setAmount,
        enableLoading,
        disableLoading
    } = useContext(MercadoPagoBricksContext)

    useEffect(() => {
        setEndpoint(endpoint)
        setAmount(amount)

        const createPreference = async () => {
            enableLoading()
            try {
                const response = await axios.post(endpoint, 
                    { transaction_amount: amount },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        }
                    }
                )                
                setPreferenceId(response.data.payload.mp_preference_id)
            } catch (error) {
                setError("Erro ao criar preferência de pagamento.")
                console.error("Erro:", error)
            } finally {
                disableLoading()
            }
        }

        createPreference()
    }, [endpoint, amount])

    useEffect(() => {
        if (paymentData?.paymentId) {
            const verifyPaymentStatus = async () => {
                try {
                    const response = await axios.post(
                        `${endpoint}/verify_payment`,
                        { payment_id: paymentData.paymentId },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            }
                        }
                    )
                    
                    // Atualiza o status do pagamento com a resposta da API
                    setPaymentStatus(response.data.payload.status)
                    
                    // Se o pagamento for aprovado ou rejeitado, para a verificação
                    if (response.data.payload.status === 'approved' || response.data.payload.status === 'rejected') {
                        clearInterval(intervalId)
                    }
                } catch (error) {
                    console.error("Erro ao verificar status do pagamento:", error)
                }
            }

            // Executa a verificação imediatamente
            verifyPaymentStatus()
            
            // Configura o intervalo para verificar a cada 3 segundos
            const intervalId = setInterval(verifyPaymentStatus, 10000)
            
            // Limpa o intervalo quando o componente for desmontado
            return () => clearInterval(intervalId)
        }
    }, [paymentData, endpoint])

    const handlePayment = async (param) => {
        console.log("Dados do pagamento recebidos:", param)
        setPaymentData(param)
        setShowStatusScreen(true)

        try {
            await axios.post(`${endpoint}/verify_payment`, 
                { preference_id: preferenceId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            )
            
            setPaymentStatus('approved')
        } catch (error) {
            console.error("Erro ao verificar pagamento:", error)
            setError("Erro ao processar pagamento. Por favor, tente novamente.")
            setPaymentStatus('rejected')
        }
    }

    if (isLoading) {
        return <div>Carregando...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            {preferenceId && (
                !selectedPaymentMethod ? (
                    <InitialBricksOptions />
                ) : (
                    <>
                        <Row>
                            <Col>
                                {!showStatusScreen ? (
                                    selectedPaymentMethod === 'pix' ? (
                                        <PixPayment />
                                    ) : (
                                        <Payment
                                            initialization={{
                                                amount: amount,
                                                preferenceId: preferenceId
                                            }}
                                            customization={{
                                                paymentMethods: {
                                                    creditCard: 'all'
                                                },
                                                visual: {
                                                    style: {
                                                        theme: 'default'
                                                    }
                                                }
                                            }}
                                            onSubmit={handlePayment}
                                            onReady={() => {
                                                console.log("Brick pronto")
                                            }}
                                            onError={(error) => {
                                                console.error("Erro no Brick:", error)
                                                setError("Erro ao processar pagamento. Por favor, tente novamente.")
                                            }}
                                        />
                                    )                            
                                ) : (
                                    paymentData?.paymentId && (
                                        selectedPaymentMethod === 'pix' ? (
                                            <PixStatusScreen />
                                        ) : (
                                            <StatusScreen
                                                initialization={{
                                                        paymentId: paymentData?.paymentId
                                                }}
                                                customization={{
                                                    visual: {
                                                        style: {
                                                            theme: 'default'
                                                        }
                                                    }
                                                }}
                                                onReady={() => {
                                                    console.log("StatusScreen pronto")
                                                }}
                                                onError={(error) => {
                                                    console.error("Erro no StatusScreen:", error)
                                                }}
                                            />
                                        )
                                    )
                                )}
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col>
                                {showPixQRCode && (
                                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                        <TitleH4 className="text-black">Código PIX:</TitleH4>

                                        <p>
                                            <img src={`data:image/png;base64,${paymentData.paymentQRCodeBase64}`} style={{ width: '256px', maxWidth: '256px' }} />
                                        </p>

                                        <CopyableDisabledInput
                                            value={paymentData.paymentQRCode}
                                            marginBottom="10px"
                                            marginTop="10px"
                                            borderRadius="5px"
                                            height="55px"
                                            maxWidth="65%"
                                        />

                                        <p style={{ maxWidth: '90%' }}>Clique para copiar o código e utilize-o no seu aplicativo de pagamento</p>
                                    </div>
                                )}  
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                {showPaymentData && (
                                    <Div style={{ marginTop: '20px', textAlign: 'center' }}>
                                        <TitleH4 className="text-black">Dados do Pagamento:</TitleH4>

                                        <Row>
                                            <Col>
                                                <p style={{ maxWidth: '90%' }}>
                                                    <strong style={{paddingRight: '5px'}}>Email: </strong>
                                                    {paymentData.email}
                                                </p>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <p style={{ maxWidth: '90%' }}>
                                                    <strong style={{paddingRight: '5px'}}>CPF: </strong>
                                                    {paymentData.cpf}
                                                </p>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <p style={{ maxWidth: '90%' }}>
                                                    <strong style={{paddingRight: '5px'}}>Nome: </strong>
                                                    {paymentData.first_name}
                                                </p>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <p style={{ maxWidth: '90%' }}>
                                                    <strong style={{paddingRight: '5px'}}>Sobrenome: </strong>
                                                    {paymentData.last_name}
                                                </p>
                                            </Col>
                                        </Row>
                                    </Div>
                                )}
                            </Col>
                        </Row>
                    </>
                )
            )}
        </div>
    )
}

export default withMercadoPagoBricksContext(MercadoPagoCheckoutBricks)
