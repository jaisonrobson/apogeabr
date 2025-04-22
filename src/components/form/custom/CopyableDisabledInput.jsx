import { useState, useRef } from 'react'

import { Input, Tooltip } from 'components'

const CopyableDisabledInput = ({ value, textAlign = 'center' }) => {
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const inputRef = useRef(null)

    const handleClick = (e) => {
        const input = e.target
        navigator.clipboard.writeText(input.value)
        setTooltipOpen(true)
        setTimeout(() => setTooltipOpen(false), 2000)
    }

    return (
        <div ref={inputRef}>
            <Input
                value={value || '-'}
                readOnly
                textAlign={textAlign}
                cursor="pointer"
                onClick={handleClick}
            />
            <Tooltip
                placement="top"
                isOpen={tooltipOpen}
                target={inputRef}
            >
                Texto copiado!
            </Tooltip>
        </div>
    )
}

export default CopyableDisabledInput 