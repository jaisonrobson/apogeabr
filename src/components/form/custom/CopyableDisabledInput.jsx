import { useState, useRef } from 'react'

import { Input, Tooltip } from 'components'

const CopyableDisabledInput = ({ value, textAlign = 'center', ...props }) => {
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const inputRef = useRef(null)

    const handleClick = async (e) => {
        const input = e.target
        
        try {
            // Tenta usar a API moderna primeiro
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(input.value)
            } else {
                // Fallback para método mais antigo
                const textArea = document.createElement('textarea')
                textArea.value = input.value
                textArea.style.position = 'fixed'
                textArea.style.left = '-999999px'
                textArea.style.top = '-999999px'
                document.body.appendChild(textArea)
                textArea.focus()
                textArea.select()
                
                try {
                    document.execCommand('copy')
                } catch (err) {
                    console.error('Erro ao copiar texto:', err)
                }
                
                document.body.removeChild(textArea)
            }
            
            setTooltipOpen(true)
            setTimeout(() => setTooltipOpen(false), 2000)
        } catch (err) {
            console.error('Erro ao copiar texto:', err)
        }
    }

    return (
        <div ref={inputRef}>
            <Input
                value={value || '-'}
                readOnly
                textAlign={textAlign}
                cursor="pointer"
                onClick={handleClick}
                {...props}
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