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

const getRandomVideo = () => assets[Math.floor(Math.random() * assets.length)];

const MainLayout: React.FC<Props> = ({ children, classProps }: Props) => {
  const loadThreshold = useRef(0);
  const [backgroundVideo, setBackgroundVideo] = useState<AssestType>(getRandomVideo());
  const [nextVideo, setNextVideo] = useState<AssestType>(getRandomVideo());

  const cachedTickFn = (
    glitchFilter: GlitchEmisorFilter,
    _deltacrtFilter: CRTFilter) => {
    if (glitchFilter.intensity === 0.3) {
      loadThreshold.current++;
    } else {
      // reduce count over time
      loadThreshold.current = Math.max(loadThreshold.current - 1, 0);
    }

    // user glitched a lot during some time
    if (loadThreshold.current >= 20) {
      loadThreshold.current = 0;
      console.log('user glitched a lot', nextVideo);
      setBackgroundVideo(nextVideo)
      setNextVideo(getRandomVideo())
    }
    glitchFilter.intensity = Math.max(glitchFilter.intensity - 0.005, 0);
  };

  console.log('rendering main layout', backgroundVideo, nextVideo);

  return (
    <div className={`main-layout ${classProps}`}>
      <div className={`pixi-container`}>
        <PixiBackground height={700} width={1400} videoData={backgroundVideo} nextVideoData={nextVideo} ticker={cachedTickFn} asciiSize={1} />
      </div>
      <div className={'main-layout-container'}>
        <NavigationBar />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
