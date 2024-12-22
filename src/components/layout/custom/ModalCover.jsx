import React, { Fragment } from 'react'
import { createPortal } from 'react-dom'

import { withModalContextConsumer } from 'contexts'

import { Cover } from 'components'

const withModalCover = (WrappedComponent) => withModalContextConsumer(
    class ModalCover extends React.Component {
        state = {
          refNode: null,
          showModal: false,
        }
    
        componentDidMount() {
            if (this.props.modal.modalRef && this.props.modal.modalRef.current)
                this.setState({ ...this.state, refNode: this.props.modal.modalRef.current })
        }

        onOpen = () => this.setState({ ...this.state, showModal: true })
        onClose = () => this.setState({ ...this.state, showModal: false })
    
        render() {
            const { modal, ...passingProps } = this.props

            return (
            <Fragment>
                {this.state.refNode && this.state.showModal && createPortal(
                    <WrappedComponent showModal={this.state.showModal} onClose={this.onClose} />,
                    this.state.refNode
                )}

                <Cover
                    onClick={this.onOpen}
                    {...passingProps}
                />
            </Fragment>
            )
        }
      })

export default withModalCover
