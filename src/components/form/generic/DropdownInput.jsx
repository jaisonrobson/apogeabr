import React, { useState } from 'react'
import _ from 'lodash'

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { Dropdown, Image, Span, Icon } from 'components'

const DropdownInput = ({
    togglerProperties = {},
    options = ["Option 1"],
    setValue,
    name,
    ...props
}) => {
    const [selectedOption, setSelectedOption] = useState(0)

    const onSelect = (value) => {
        setValue(name, value, { shouldDirty: true, shouldTouch: true })

        setSelectedOption(value)
    }

    return (
        <Dropdown {...props}>
            <Dropdown.Toggler
                style={{
                    margin: 0,
                    padding: 0,
                }}
                width="100%"
                color="black"
                backgroundColor="#00000010"
                hoverColor="gray"
                hoverBackgroundColor="lightgray"
                hoverOpacity=".5"
                fontSize="12px"
                componentColor="none"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-evenly"
                {...togglerProperties}
            >
                <Span>{options[selectedOption]}</Span>

                <Icon icon={faCaretDown} size="xl" color="inherit" marginTop="-4px" />
            </Dropdown.Toggler>

            <Dropdown.Menu className="unselectable" style={{ width: '100%' }}>
                {
                    _.map(options, (option, idx) => (
                        <Dropdown.Item key={option} onClick={() => onSelect(idx)}>
                            {option}
                        </Dropdown.Item>
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropdownInput