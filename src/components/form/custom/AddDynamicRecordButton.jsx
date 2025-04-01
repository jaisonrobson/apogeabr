import React, { useState } from 'react'

import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'

import {
    Button,
    Div,
    Icon,
} from 'components'

const AddDynamicRecordButton = ({ addRecordDescription = "novo registro", onClick }) => {
    const [ isHovered, setIsHovered ] = useState(false)

    const onMouseEnter = () => setIsHovered(true)
    const onMouseLeave = () => setIsHovered(false)

    return (
        <Button
            width="100%"
            onHover={{
                backgroundColor: "lightblue",
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            color={isHovered ? "black" : "white"}
            onClick={onClick}
        >
            <Div
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="15px"                
            >
                <Icon
                    icon={faSquarePlus}
                    color={isHovered ? "black" : "white"}
                />

                Adicionar {addRecordDescription}
            </Div>
        </Button>
    )
}

export default AddDynamicRecordButton