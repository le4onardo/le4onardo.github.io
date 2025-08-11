import { useEffect, useState, useRef, useContext } from 'react';
import NavigationBar from '../../organisms/NavigationBar/NavigationBar';
import './MainLayout.css';
import { twMerge } from 'tailwind-merge';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import gsap from 'gsap';
import { ThreeCanvas } from '../../organisms/ThreeCanvas/ThreeCanvas';
import { StateContext } from '../../../store/Context';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

interface Props {
    children: React.ReactNode;
    classProps: string;
}

const MainLayout: React.FC<Props> = ({ children, classProps }: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const [scroll, setScroll] = useState(false);
    const { threeState } = useContext(StateContext);

    useEffect(() => {
        const handleScroll = () => setScroll(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div
                className={`tw:fixed tw:w-full tw:z-20 tw:top-0 tw:border-b-neutral-700 tw:pb-20
                    tw:bg-[linear-gradient(to_bottom,black_10%,transparent)]
                    ${scroll && 'tw:border-b-[1px]'}`}
                ref={ref}
            >
                <div className='tw:backdrop-blur-lg tw:mask-[linear-gradient(to_bottom,black_10%,transparent)] tw:w-full tw:h-full tw:absolute' />
                <NavigationBar className='tw:h-16 tw:w-full tw:mx-auto tw:max-w-[1200px] tw:px-12 tw:relative' />
            </div>
            <ThreeCanvas className='tw:fixed tw:w-full tw:h-full tw:top-0' {...threeState} />
            <div className={twMerge(classProps)}>{children}</div>
        </>
    );
};

export default MainLayout;
