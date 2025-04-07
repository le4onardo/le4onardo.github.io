import MainLayout from '../../components/templates/MainLayout/MainLayout';
import useGlitcher from '../../hooks/useGlitcher';
import Skills from '../../components/organisms/Skills/Skills';
import AboutMe from '../../components/organisms/About/About';
import Blogs from '../../components/organisms/Blogs/Blogs';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
import { useCallback, useRef, useState } from 'react';
import toSingleChars from '../../utils/string';
import Hero from '../../components/organisms/Hero';
import PixiBackground from '../../components/organisms/PixiBackground/PixiBackground';
import { AssestType, assets } from '../../utils/data';
import GlitchEmisorFilter from '../../utils/pixi-utils/GlitchEmitterFilter/GlitchEmisorFilter';
import CRTEmisorFilter from '../../utils/pixi-utils/CRTEmitterFilter/CRTEmitterFilter';
import { VideoBackground } from '../../components/organisms/VideoBackground/VideoBackground';

gsap.registerPlugin(useGSAP);

const getRandomVideo = () => assets[Math.floor(Math.random() * assets.length)];
const MAX_GLITCH_INDEX = 0.3;
const GLITCH_LOSS = 0.005;
const CRT_LOSS = 0.015;
const NEXT_VIDEO_THRESHOLD = 15;


const colorHueMap: Record<string, number> = {
  '#FFC0CB': 30,
  '#FFA500': 155,
  '#FFFF00': 190,
  '#7CFC00': 230,
  '#87CEFA': 300,

}
const Home = () => {
  const loadThreshold = useRef(0);
  const [backgroundVideo, setBackgroundVideo] = useState<AssestType>(assets[5]);
  const [nextVideo, setNextVideo] = useState<AssestType>(getRandomVideo());
  const [videoHue, setVideoHue] = useState<number>(30);

  const updateColor = useCallback((color: string, index: number) => {
    setVideoHue((videoHue) => {
      const rotationCount = Math.floor(videoHue / 360);
      const degreeBase = index === 0 ? (rotationCount + 1) * 360 : rotationCount * 360;

      console.log(videoHue);
      return degreeBase + colorHueMap[color];
    });
  }, [setVideoHue]);

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
  const videoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let tl = gsap.timeline();

    tl.to(videoRef.current, {
      filter: `hue-rotate(${videoHue}deg)`,
      color: '#ffffff',
      duration: 1,
      // ease: "elastic.out(1,0.5)",
    });

  }, { scope: videoRef, dependencies: [videoHue] });

  return (
    <MainLayout classProps='home scroll-smooth'>
      <div className='relative'>
        <div className={`absolute w-fit h-full right-0`} ref={videoRef}>
          <VideoBackground className="sticky top-[150px] cursor-pointer" />
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

        </div>

        <Hero className='relative w-fit mb-38' onColorChange={updateColor} />
        <AboutMe className='relative w-fit pb-38' />
      </div>
      <Skills />
      <Blogs />
    </MainLayout >
  );
};

export default Home;
