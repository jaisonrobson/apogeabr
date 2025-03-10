import React, { Fragment } from 'react'
import { redirect } from 'react-router-dom'
import axios from 'axios'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import ROUTES from 'router/routes'

import {
    Modal,
    Button, 
    Icon,
    Span,
    Container,
} from 'components'

const DeleteButton = (props) => (
    <Button
        color="white"
        backgroundColor='#00000060'
        border='2px solid gray'
        onHover={{
            animation: {
                property: 'languageDeleteAnimation 0.5s linear 0s infinite alternate',
                corpse: `@keyframes languageDeleteAnimation {
                    0%  {transform: scale3d(1,1,1);}
                    100%  {transform: scale3d(1.03,1.03,1.03); background-color: #ED8C8E; border-radius: 8px}
                }`
            }
        }}
        {...props}
    >
        <Icon icon={faTrash} />
    </Button>
)

const Delete = ({ localeId }) => {
    const onDelete = async () => {
        try {
            const response = await axios.delete(`${[process.env.REACT_APP_BACKEND_HOST]}/locales/${localeId}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })

            redirect(`${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_LANGUAGES.path.slice(0, -1)}?success=${encodeURIComponent(JSON.stringify(response.data))}`)

            return window.location.reload()
        } catch (error) {
            const resultingError = error?.response?.data || { message: error.message }

            redirect(`${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_LANGUAGES.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)

            return window.location.reload()
        }
    }

    return (
        <Modal Component={DeleteButton} centered>
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
                                        property: 'languageCancelAnimation 0.5s linear 0s infinite alternate',
                                        corpse: `@keyframes languageCancelAnimation {
                                            0%  {transform: scale3d(1,1,1);}
                                            100%  {transform: scale3d(1.03,1.03,1.03); background-color: lightgray; border-radius: 8px}
                                        }`
                                    }
                                }}
                            >
                                Não
                            </Button>

                            <Button
                                onClick={onDelete}
                                color="white"
                                backgroundColor='#00000060'
                                border='2px solid gray'
                                onHover={{
                                    animation: {
                                        property: 'languageDeleteAnimation 0.5s linear 0s infinite alternate',
                                        corpse: `@keyframes languageDeleteAnimation {
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

export default Delete