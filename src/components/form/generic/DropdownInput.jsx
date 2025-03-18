import React, { useState } from 'react'
import _ from 'lodash'

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { Dropdown, Span, Icon } from 'components'

const DropdownInput = ({
    togglerProperties = {},
    menuProperties={},
    itemProperties={},
    defaultValue = 0,
    options = [{id: 0, name: "Option 1"}],
    setValue = () => {},
    name,
    light = false,
    ...props
}) => {
    const [selectedOption, setSelectedOption] = useState(defaultValue)

    const onSelect = (value) => {
        setValue(name, value, { shouldDirty: true, shouldTouch: true })

        setSelectedOption(value)
    }

    return (
        <Dropdown light={light} {...props}>
            <Dropdown.Toggler
                style={{
                    margin: 0,
                    padding: 0,
                }}
                width="100%"
                fontSize="12px"
                componentColor="none"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-around"
                light={light}
                {...togglerProperties}
            >
                <Span>{_.find(options, {id: selectedOption})?.name || _.first(options)?.name}</Span>

                <Icon icon={faCaretDown} size="xl" color="inherit" marginTop="-4px" />
            </Dropdown.Toggler>

            <Dropdown.Menu
                light={light}
                className="unselectable"
                style={{ width: '100%' }}
                {...menuProperties}
            >
                {
                    _.map(options, (option, idx) => (
                        <Dropdown.Item
                            light={light}
                            key={option.id}
                            onClick={() => onSelect(option.id)}
                            {...itemProperties}
                        >
                            {option.name}
                        </Dropdown.Item>
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropdownInput