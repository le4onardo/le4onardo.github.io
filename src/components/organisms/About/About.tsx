import useGlitcher from "../../../hooks/useGlitcher"

export default function AboutMe() {
    const { ref } = useGlitcher({
        playMode: 'click',
        timing: { duration: 2000, iterations: Infinity, easing: 'ease-in-out' },
        glitchTimeSpan: { start: 0.1, end: 1 },
        shake: {
            velocity: 40,
            amplitudeX: 0.05,
            amplitudeY: 0.05,
        },
        slice: {
            count: 10,
            velocity: 30,
            minHeight: 0.1,
            maxHeight: 0.2,
            hueRotate: true
        },
    })

    return <div className='mt-24'>
        <div ref={ref}>
            <h2 className='text-4xl mb-20 w-fit' >ABOUT ME</h2>
        </div>
        <p className='lg:w-2/5 w-full'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
        </p>
    </div>
}