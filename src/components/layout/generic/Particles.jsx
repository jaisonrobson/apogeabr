import { useState, useContext, useRef, useEffect } from "react"

import Particles from "@tsparticles/react"

import { ParticlesContext } from 'contexts'

import { options } from 'particles/starsFlowingTop'

const WrappedParticles = ({ id="particles_1", style={ width: '100px', height: "30px" }, children, childrenContainerStyle }) => {
    const { isInitialized } = useContext(ParticlesContext)
    const containerRef = useRef(null)
    const [state, setState] = useState({ width: '100px', height: '30px' })

    useEffect(() => {
        if (containerRef && containerRef.current) {
            setState((oldState) => ({ width: containerRef.current.clientWidth, height: containerRef.current.clientHeight }))
        }
    }, [state.width, state.height, isInitialized, containerRef])

    return (        
        isInitialized
            ? (
                <div ref={containerRef} id={id} style={style}>
                    <Particles
                        id={id}
                        options={options}
                    />

                    <div
                        style={{
                            display: 'flex',
                            position: 'absolute',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            justifySelf: 'center',
                            alignItems: 'center',
                            height: state.height,
                            width: state.width,
                            ...childrenContainerStyle,
                        }}
                    >
                        {children}
                    </div>
                </div>
            )
            : null
    )
}

export default WrappedParticles