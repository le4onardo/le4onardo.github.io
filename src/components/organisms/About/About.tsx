import { twMerge } from "tailwind-merge";
import useGlitcher from "../../../hooks/useGlitcher"

interface Props {
    className?: string;
}

export default function AboutMe({ className = '' }: Props) {
    return <div className={twMerge('tw:pt-30', className)} id='about'>

        <h2 className='tw:text-4xl tw:mb-20 tw:w-fit' >ABOUT ME</h2>

        <p className='tw:lg:w-96 w-full'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
        </p>
    </div>
}