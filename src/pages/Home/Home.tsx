import MainLayout from '../../components/templates/MainLayout/MainLayout';
import useGlitcher from '../../hooks/useGlitcher';
import Skills from '../../components/organisms/Skills/Skills';
import AboutMe from '../../components/organisms/About/About';
import Blogs from '../../components/organisms/Blogs/Blogs';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
import { useCallback, useRef, useState } from 'react';
import Hero from '../../components/organisms/Hero';
import PixiBackground from '../../components/organisms/PixiBackground/PixiBackground';
import { AssestType, assets } from '../../utils/data';
import GlitchEmisorFilter from '../../utils/pixi-utils/GlitchEmitterFilter/GlitchEmisorFilter';
import CRTEmisorFilter from '../../utils/pixi-utils/CRTEmitterFilter/CRTEmitterFilter';
import { VideoBackground } from '../../components/organisms/VideoBackground/VideoBackground';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';



const getRandomVideo = () => assets[Math.floor(Math.random() * assets.length)];
const MAX_GLITCH_INDEX = 0.3;
const GLITCH_LOSS = 0.005;
const CRT_LOSS = 0.015;
const NEXT_VIDEO_THRESHOLD = 15;


const Home = () => {
  const loadThreshold = useRef(0);
  const [backgroundVideo, setBackgroundVideo] = useState<AssestType>(assets[5]);
  const [nextVideo, setNextVideo] = useState<AssestType>(getRandomVideo());


  const cachedTickFn = (
    filters: { glitch?: GlitchEmisorFilter, crt?: CRTEmisorFilter },
    loading: boolean
  ) => {
    if (!filters) return;

    const { glitch, crt } = filters;

    if (loading) {
      // glitch.intensity = MAX_GLITCH_INDEX;
      return;
    }

    // Check if user is glitching a lot
    if (glitch!.intensity >= MAX_GLITCH_INDEX) {
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
    glitch!.intensity = Math.max(glitch!.intensity - GLITCH_LOSS, 0);
    crt!.intensity = Math.max(crt!.intensity - CRT_LOSS, 0);
  };




  return (
    <MainLayout classProps='tw:scroll-smooth'>
      <div className='tw:relative tw:mt-12'>
        {
          /*
            // <link rel="" href={backgroundVideo.backgroundUrl} type="image/png" />
            // <img style={{ height: 700, width: 1400 }} src={backgroundVideo.backgroundUrl}></img>
            <>
              <PixiBackground height={700} width={1400} videoData={backgroundVideo} nextVideoData={nextVideo} className='sticky top-[65px]'
                ticker={cachedTickFn}
              />
            </>
            // assets.map(videoData => <PixiBackground height={700} width={1400} videoData={videoData} />)
            */
        }
        <Hero className='tw:relative tw:w-full' />
        <AboutMe className='tw:relative tw:w-fit tw:mt-64 tw:pt-64  about-me' />
      </div>
      <Skills className='tw:mt-64 tw:pt-32 tw:h-[900px]' />
      <Blogs />
    </MainLayout >
  );
};

export default Home;
