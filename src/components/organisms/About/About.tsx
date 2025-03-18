import { twMerge } from "tailwind-merge";
import useGlitcher from "../../../hooks/useGlitcher"

interface Props {
    className?: string;
}

export default function AboutMe({ className = '' }: Props) {
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
            count: 12,
            velocity: 30,
            minHeight: 0.1,
            maxHeight: 0.2,
            hueRotate: true
        },
    })

    return <div className={twMerge('pt-30', className)} id='about'>
        <div className='w-fit' ref={ref}>
            <h2 className='text-4xl mb-20 w-fit' >ABOUT ME</h2>
        </div>
        <p className='lg:w-96 w-full'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
        </p>
    </div>
}