import React, { Fragment } from 'react'
import { redirect } from 'react-router-dom'
import _ from 'lodash'
import axios from 'axios'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import {
    Modal,
    Button, 
    Icon,
    Span,
    Container,
} from 'components'

const DeleteButton = ({ animationName = "iconDeleteAnimation", animatedBackgroundColor = "#ED8C8E", ...props }) => (
    <Button
        color="white"
        backgroundColor='#00000060'
        border='2px solid gray'
        onHover={{
            animation: {
                property: `${animationName} 0.5s linear 0s infinite alternate`,
                corpse: `@keyframes ${animationName} {
                    0%  {transform: scale3d(1,1,1);}
                    100%  {transform: scale3d(1.03,1.03,1.03); background-color: ${animatedBackgroundColor}; border-radius: 8px}
                }`
            }
        }}
        {...props}
    >
        <Icon icon={faTrash} />
    </Button>
)

const DeleteRecordModalButton = ({ deleteEndpoint = "", deleteRoutePath = "", onDelete: onDeleteParam = undefined, ...props }) => {
    const onDelete = async () => {
        if (!_.isEmpty(deleteEndpoint) || typeof deleteEndpoint === 'function') {
            let endpoint = deleteEndpoint

            if (typeof deleteEndpoint === 'function')
                endpoint = deleteEndpoint()

            try {
                const response = await axios.delete(`${[process.env.REACT_APP_BACKEND_HOST]}/${endpoint}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                })
    
                if (!_.isEmpty(deleteRoutePath)) {
                    redirect(`${deleteRoutePath.slice(0, -1)}?success=${encodeURIComponent(JSON.stringify(response.data))}`)
    
                    return window.location.reload()
                }
            } catch (error) {
                const resultingError = error?.response?.data || { message: error.message }
    
                if (!_.isEmpty(deleteRoutePath)) {
                    redirect(`${deleteRoutePath.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    
                    return window.location.reload()
                }
            }
        }

        if (onDeleteParam)
            onDeleteParam()
    }

    return (
        <Modal
            Component={DeleteButton}
            componentProps={props}
            centered
        >
            {({ isOpen, toggle }) => (
                <Fragment>
                    <Modal.Body light>
                        <Span fontFamily="Arial" fontSize="20px" color="black" textShadow="0px 0px 5px white">
                            <p>Voce deseja realmente remover o registro?</p>

                            <p>Esta ação é irreversível.</p>
                        </Span>
                    </Modal.Body>

                    <Modal.Footer light>
                        <Container
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                            alignItems="center"
                            width="100%"
                        >
                            <Button
                                onClick={toggle}
                                color="white"
                                backgroundColor='#00000060'
                                border='2px solid gray'
                                onHover={{
                                    animation: {
                                        property: 'recordCancelAnimation 0.5s linear 0s infinite alternate',
                                        corpse: `@keyframes recordCancelAnimation {
                                            0%  {transform: scale3d(1,1,1);}
                                            100%  {transform: scale3d(1.03,1.03,1.03); background-color: lightgray; border-radius: 8px}
                                        }`
                                    }
                                }}
                            >
                                Não
                            </Button>

                            <Button
                                onClick={() => {
                                    onDelete()

                                    toggle()
                                }}
                                color="white"
                                backgroundColor='#00000060'
                                border='2px solid gray'
                                onHover={{
                                    animation: {
                                        property: 'recordDeleteAnimation 0.5s linear 0s infinite alternate',
                                        corpse: `@keyframes recordDeleteAnimation {
                                            0%  {transform: scale3d(1,1,1);}
                                            100%  {transform: scale3d(1.03,1.03,1.03); background-color: #ED8C8E; border-radius: 8px}
                                        }`
                                    }
                                }}
                            >
                                Sim
                            </Button>
                        </Container>
                    </Modal.Footer>
                </Fragment>
            )}
        </Modal>        
    )
}

export default DeleteRecordModalButton