import { useEffect, useState, useRef } from 'react';
import PixiBackground from '../../organisms/PixiBackground/PixiBackground';
import NavigationBar from '../../organisms/NavigationBar/NavigationBar';
import './MainLayout.css';
import { AssestType, assets } from '../../../utils/data';
import GlitchEmisorFilter from '../../../utils/pixi-utils/GlitchEmitterFilter/GlitchEmisorFilter';
import CRTEmisorFilter from '../../../utils/pixi-utils/CRTEmitterFilter/CRTEmitterFilter';

interface Props {
  children: React.ReactNode;
  classProps: string;
}

const MainLayout: React.FC<Props> = ({ children, classProps }: Props) => {
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
      <div className={`tw:sticky tw:z-20 tw:top-0 tw:border-b-neutral-700 tw:backdrop-blur-sm ${scroll && "tw:border-b-[1px]"}`} ref={ref}>
        <NavigationBar className='tw:h-16 tw:w-full tw:mx-auto tw:max-w-[1200px] tw:px-12' />
      </div >
      <div className={`main-layout ${classProps}`}>

        <div className={'main-layout-container'}>
          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
