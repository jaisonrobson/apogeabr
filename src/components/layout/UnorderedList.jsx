import React from 'react'

const ListItem = (props) => {

    return <li {...props} />
}

const UnorderedList = () => {
    return (
        <ul>

        </ul>
    )
}

UnorderedList.Item = ListItem

export default UnorderedList
