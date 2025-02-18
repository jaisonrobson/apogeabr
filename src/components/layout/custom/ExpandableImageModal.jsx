import react from 'react'

import { Image, Modal } from 'components'

const ImageWrapper = ({ image, ...props }) => <Image src={image} width="300px" height="150px" {...props} />

const ExpandableImageModal = ({ image, imageWrapperProps, ...props }) => (
    <Modal Component={ImageWrapper} componentProps={{ image: image, ...imageWrapperProps }} {...props} centered style={{ backgroundColor:"red" }}>
        {({ isOpen, toggle }) => (
            <Modal.Body style={{ padding: '0' }}>
                <Image src={image} />
            </Modal.Body>
        )}
    </Modal>
)

export default ExpandableImageModal