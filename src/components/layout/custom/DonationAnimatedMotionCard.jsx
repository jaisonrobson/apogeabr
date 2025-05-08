import React, { useState, Fragment } from "react"

import {
    MercadoPagoCheckoutBricks,
    AnimatedMotionCard,
    Input,
} from 'components'

const DonationAnimatedMotionCard = ({
    defaultAmount=10,
    isCustom=false,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [amount, setAmount] = useState(defaultAmount)

    return (
        <Fragment>
            {isLoaded ? (
                <MercadoPagoCheckoutBricks amount={amount} />
            ) : (
                <AnimatedMotionCard
                    level="animated_motion_card_one"
                    cardTitle="Novato"
                    cardSubtitle=""
                    cardItems={["Prioridade na revisão", "Suporte prioritário", "500 Créditos mensais"]}
                    cardBackground="linear-gradient(-45deg, #726f67, #aba296, #685a52)"
                    cardImageBackground="linear-gradient(45deg, #726f6760, #aba29660, #685a5260)"
                    cardColor="white"
                    cardBorder="1px solid #685a52"
                    listGroupBorderColor="#685a52"
                    listGroupBackgroundColor="#aba29670"
                    listGroupColorVariantOne="#e1937c40"
                    listGroupColorVariantTwo="#e1937c20"
                    buttonColor="#32170f"
                    buttonBackgroundColor="#FFFFFF20"
                    buttonHoverBackgroundColor="#4f4e4e50"
                    buttonBorder="2px solid #685a5240"
                    buttonOnClick={() => setIsLoaded(true)}
                    buttonDescription="Doar"
                    complementaryFooter={
                        isCustom ? (
                            <Input
                                value={amount}
                                placeholder={defaultAmount}
                                type="number"
                                onChange={(e) => setAmount(e.target.value)}
                                textAlign="center"
                            />
                        ) : undefined
                    }
                    {...props}
                />
            )}
        </Fragment>
    )
}

export default DonationAnimatedMotionCard
