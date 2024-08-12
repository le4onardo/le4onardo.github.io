import { useEffect, useState, useRef } from 'react';
import PixiBackground from '../../organisms/PixiBackground/PixiBackground';
import NavigationBar from '../../organisms/NavigationBar/NavigationBar';
import './MainLayout.css';
import { AssestType, assets } from '../../../utils/data';
import GlitchEmisorFilter from '../../../utils/pixi-utils/GlitchEmitterFilter/GlitchEmisorFilter';

interface Props {
  children: React.ReactNode;
  classProps: string;
}

const getRandomVideo = () => assets[Math.floor(Math.random() * assets.length)];
const MAX_GLITCH_INDEX = 0.3
const GLITCH_DEGRADING_FACTOR = 0.005
const NEXT_VIDEO_THRESHOLD = 20

const MainLayout: React.FC<Props> = ({ children, classProps }: Props) => {
  const loadThreshold = useRef(0);
  const [backgroundVideo, setBackgroundVideo] = useState<AssestType>(getRandomVideo());
  const [nextVideo, setNextVideo] = useState<AssestType>(getRandomVideo());

  const cachedTickFn = (
    filters: { glitch: GlitchEmisorFilter },
    loading: boolean
  ) => {
    const { glitch } = filters;

    if (loading) {
      glitch.intensity = MAX_GLITCH_INDEX;
      return;
    }

    // Check if user is glitching a lot
    if (glitch.intensity >= MAX_GLITCH_INDEX) {
      loadThreshold.current++;

      // User glitched a lot during some time
      if (loadThreshold.current >= NEXT_VIDEO_THRESHOLD) {
        loadThreshold.current = 0;
        setBackgroundVideo(nextVideo)
        setNextVideo(getRandomVideo())
      }
    } else {
      loadThreshold.current = Math.max(loadThreshold.current - 1, 0);
    }

    // Smooth glitch reduction over time
    glitch.intensity = Math.max(glitch.intensity - GLITCH_DEGRADING_FACTOR, 0);
  };


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
