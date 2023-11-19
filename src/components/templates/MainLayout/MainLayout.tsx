import { useEffect, useState, useCallback, useRef } from 'react';
import PixiBackground from '../../organisms/PixiBackground/PixiBackground';
import NavigationBar from '../../organisms/NavigationBar/NavigationBar';
import './MainLayout.css';
import { AssestType, assets } from '../../../utils/data';
import GlitchEmisorFilter from '../../../utils/pixi-utils/GlitchEmitterFilter/GlitchEmisorFilter';
import { CRTFilter } from 'pixi-filters';

interface Props {
  children: React.ReactNode;
  classProps: string;
}

const MainLayout: React.FC<Props> = ({ children, classProps }: Props) => {
  const glitchCounter = useRef(0);
  

  const [backgroundVideo, setBackgroundVideo] = useState<AssestType>(
    // initial random video 
    assets[Math.floor(Math.random() * assets.length)]
  );

  const cachedTickFn = useCallback((
    glitchFilter: GlitchEmisorFilter,
    _deltacrtFilter: CRTFilter) => {
    if (glitchFilter.intensity === 0.3) glitchCounter.current++;
    else glitchCounter.current = Math.max(glitchCounter.current - 1, 0);

    if (glitchCounter.current >= 20) {
      glitchCounter.current = 0;
      setBackgroundVideo(assets[Math.floor(Math.random() * assets.length)])
    }
  }, [backgroundVideo]);

  return (
    <div className={`main-layout ${classProps}`}>
      <div className={`pixi-container`}>
        <PixiBackground height={700} width={1400} videoData={backgroundVideo} ticker={cachedTickFn} asciiSize={1} />
      </div>
      <div className={'main-layout-container'}>
        <NavigationBar />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
