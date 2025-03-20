import React, { useState, useEffect } from 'react'
import { useFormContext } from "react-hook-form"

import { RadioButtonsGroup } from 'components'

const RadioButtonsGroupInput = ({
    setValue = () => {},
    name,
    reloadInformation,
    doFormLateLoadInformations,
    ...props
}) => {
    const { value: { getValues, setValue: contextSetValue, formState: { defaultValues } } } = useFormContext()
    const [lateValue, setLateValue] = useState(undefined)

    const onSelect = (option) => setValue(name, option.value, { shouldDirty: true, shouldTouch: true })

    useEffect(() => {
        if (reloadInformation && doFormLateLoadInformations)
            setLateValue({ value: getValues(name) })
    }, [reloadInformation])

    return (
        <RadioButtonsGroup
            lateValue={lateValue}
            onSelectOption={onSelect}
            {...props}
        />
    )
}

export default RadioButtonsGroupInput