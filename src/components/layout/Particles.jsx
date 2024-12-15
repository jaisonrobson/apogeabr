import { useMemo, useContext } from "react"

import Particles from "@tsparticles/react"

import { ParticlesContext } from 'contexts/withParticlesContext'

const WrappedParticles = ({ id="particles_1", style={ width: '100px', height: "30px" }, children }) => {
    const { isInitialized } = useContext(ParticlesContext)

    const options = useMemo(
        () => ({
            fullScreen: false,
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "repulse",
                    },
                    onHover: {
                        enable: true,
                        mode: "bubble",
                    },
                },
                modes: {
                    repulse: {
                        distance: 150,
                        duration: 0.4,
                    },
                    bubble: {
                        distance: 50,
                        duration: 0.4,
                        size: 10,
                    },
                },
            },
            detectRetina: true,
            emitters: [
                {
                    direction: 'top',
                    autoplay: 'true',
                    fill: 'true',
                    rate: {
                        quantity: 1,
                        delay: .3,
                    },
                    shape: {
                        options: {},
                        replace: {
                            color: false,
                            opacity: false,
                        },
                        type: 'square',
                    },
                    startCount: 1,                
                    particles: {
                        shape: { type: 'star' },
                        color: { enable: true, value: '#D4BF4E', sync: false, offset: { min: 0, max: 100 }, speed: 100 },
                        links: { enable: false },
                        opacity: { value: 0.7 },
                        rotate: { value: { min: 0, max: 360 }, direction: 'counter-clockwise', animation: { enable: true, speed: 15, sync: false } },
                        size: { value: { min: 1, max: 2.5 } },
                        move: { enable: true, speed: 1.5, outModes: 'remove' },
                    },
                    position: { x: 75, y: 150},
                },
                {
                    direction: 'top',
                    autoplay: 'true',
                    fill: 'true',
                    rate: {
                        quantity: 1,
                        delay: .3,
                    },
                    shape: {
                        options: {},
                        replace: {
                            color: false,
                            opacity: false,
                        },
                        type: 'square',
                    },
                    startCount: 1,                
                    particles: {
                        shape: { type: 'star' },
                        color: { enable: true, value: '#E6EEC0', sync: false, offset: { min: 0, max: 100 }, speed: 100 },
                        links: { enable: false },
                        opacity: { value: 0.7 },
                        rotate: { value: { min: 0, max: 360 }, direction: 'counter-clockwise', animation: { enable: true, speed: 15, sync: false } },
                        size: { value: { min: 1, max: 2.5 } },
                        move: { enable: true, speed: 1.5, outModes: 'remove' },
                    },
                    position: { x: 25, y: 150},
                }
            ],
        }),
        [],
    )

    return (
        <div id={id} style={style}>
            {
                isInitialized
                    ? (
                        <Particles
                        id={id}
                        options={options}
                    />)
                    : null
            }            

            {children}
        </div>
    )
}

export default WrappedParticles