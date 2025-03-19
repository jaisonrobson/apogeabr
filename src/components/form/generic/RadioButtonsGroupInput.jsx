import React from 'react'

import { RadioButtonsGroup } from 'components'

const RadioButtonsGroupInput = ({
    setValue = () => {},
    name,
    ...props
}) => {
    const onSelect = (option) => setValue(name, option.value, { shouldDirty: true, shouldTouch: true })

    return (
        <RadioButtonsGroup
            onSelectOption={onSelect}
            {...props}
        />
    )
}

export default RadioButtonsGroupInput