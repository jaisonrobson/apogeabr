import React, { useState } from 'react'
import { Input } from 'components'

const CheckboxInput = ({ name, register, defaultChecked, ...props }) => {
    const [checked, setChecked] = useState(defaultChecked)

    const handleChange = (event) => setChecked(oldValue => !oldValue)

    return (
        <Input 
            name={name}
            type="checkbox"
            checked={checked}
            onClick={handleChange}
            {...register(name)}
            {...props}
        />
    )
}

export default CheckboxInput 