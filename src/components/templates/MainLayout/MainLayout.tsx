import { useEffect, useState, useRef } from 'react';
import NavigationBar from '../../organisms/NavigationBar/NavigationBar';
import './MainLayout.css';
import { twMerge } from 'tailwind-merge';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import gsap from 'gsap';
import { ThreeCanvas } from '../../organisms/ThreeCanvas/ThreeCanvas';


gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);


interface Props {
  children: React.ReactNode;
  classProps: string;
  color: number;
}

const MainLayout: React.FC<Props> = ({ children, classProps, color }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`tw:fixed tw:w-full tw:z-20 tw:top-0 tw:border-b-neutral-700 ${scroll && "tw:border-b-[1px]"}`} ref={ref}>
        <NavigationBar className='tw:h-16 tw:w-full tw:mx-auto tw:max-w-[1200px] tw:px-12' />
      </div >
      <ThreeCanvas className='tw:fixed tw:w-full tw:h-full tw:top-0' selColorOffset={color}/>
      <div className={twMerge(
        `tw:px-[20px] tw:lg:max-w-[1200px] tw:lg:mx-auto tw:lg:mb-[50px] tw:lg:px-[50px]`,
        classProps
      )}>
        {children}
      </div>
    </>
  );
};

export default MainLayout;
