import React from 'react'

import { Button } from 'components'

const HoverableButton = (props) => (
    <Button
        opacity="1"
        onHover={{
            opacity: '0.5',
            animation: {
                property: 'hoverableButtonAnimation 0.5s linear 0s infinite alternate',
                corpse: `@keyframes hoverableButtonAnimation {
                    0%  {transform: scale3d(1,1,1);}
                    100%  {transform: scale3d(1.03,1.03,1.03); background-color: lightgray; border-radius: 8px}
                }`
            }
        }}
        {...props}
    />
)

export default HoverableButton
