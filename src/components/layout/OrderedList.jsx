import React from 'react'

const ListItem = (props) => <li {...props} />

const OrderedList = ({ children, ...props }) => {
    return (
        <ol {...props}>
            {children}
        </ol>
    )
}

OrderedList.Item = ListItem

export default OrderedList
