import React from 'react'

const ListItem = (props) => {

    return <li {...props} />
}

const UnorderedList = ({ children, ...props }) => {
    return (
        <ul {...props}>
            {children}
        </ul>
    )
}

UnorderedList.Item = ListItem

export default UnorderedList
