import React, { useState, Fragment } from 'react'
import { Modal as ReactstrapModal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import { Button } from 'components'

const Header = ({ children, ...props }) => (
    <ModalHeader style={{ backgroundColor:"lightgray" }} {...props}>
        {children}
    </ModalHeader>
)

const Footer = ({ children, ...props }) => (
    <ModalFooter style={{ backgroundColor:"lightgray" }} {...props}>
        {children}
    </ModalFooter>
)

const Body = ({ children, ...props }) => (
    <ModalBody style={{ backgroundColor:"lightgray" }} {...props}>
        {children}
    </ModalBody>
)

const Modal = ({
    ButtonComponent = Button,
    children,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(oldValue => !oldValue)

    return (
        <Fragment>
            <ButtonComponent onClick={toggle} />

            <ReactstrapModal isOpen={isOpen} toggle={toggle} fade={true} {...props}>
                {children({ isOpen, toggle })}
            </ReactstrapModal>
        </Fragment>
    )
}

Modal.Header = Header
Modal.Body = Body
Modal.Footer = Footer

export default Modal