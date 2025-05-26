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


/*
const getRandomVideo = () => assets[Math.floor(Math.random() * assets.length)];
const MAX_GLITCH_INDEX = 0.3;
const GLITCH_LOSS = 0.005;
const CRT_LOSS = 0.015;
const NEXT_VIDEO_THRESHOLD = 15;
*/

const Home = () => {
  /*
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
  */
  const [startAbout, setStartAbout] = useState(false);
  const [startSkills, setSkills] = useState(false);
  const tl = useRef<gsap.core.Timeline>();
  const aboutFadein = useRef<GSAPTween>();

  useGSAP(() => {
    tl.current = gsap.timeline();

    const heroTween = gsap.to('.hero-container', {
      opacity: 0,
      filter: 'blur(60px)',
      scale: 0.9,
      onUpdate: () => {
        if (heroTween!.progress() > 0.5) {
          console.log('set about true');
          setStartAbout(true)
        }
      },
      scrollTrigger: {
        trigger: '.hero-container',
        start: 'top top-=100',
        end: "+=1000",
        scrub: 1,
      }
    });
    gsap.to('.about-container', {
      // opacity: 0,
      // filter: 'blur(20px)',
      onStart: () => {
        console.log('set about true');
        setStartAbout(true)
        // console.log('about OUT START')
      },
      // immediateRender: false,
      scrollTrigger: {
        trigger: '.about-container',
        pin: true,
        start: "top top",
        end: "+=500",
        scrub: 1,
      }
    });
    gsap.to('.about-container', {
      opacity: 0,
      filter: 'blur(60px)',
      scale: 0.9,
      scrollTrigger: {
        trigger: '.about-container',
        start: "top top-=10",
        end: "+=1000",
        scrub: 1,
      }
    });

    tl.current.to('.skills-container', {
      opacity: 1,
      duration: 3,
      filter: 'blur(0px)',
      /*scrollTrigger: {
        trigger: '#home-container',
        start: 7000,
        end: "+=3000",
        scrub: true,
      }*/
      /*
      onComplete: () => {
        //if (tl.progress() > 0.4) {
        setSkills(true);
        console.log('skills start')
        // }
      }
      */
    });
    /*
        ScrollTrigger.create({
          animation: tl.current,
          trigger: '#home-container',
          start: 'top top',
          end: "+=15000",
          pin: true,
          scrub: 1,
          markers: true
          // anticipatePin: 1
        });
        */
  });
  /*
  useGSAP(() => {
    if (!startAbout) return;
    aboutFadein.current?.kill();

    gsap.fromTo('.about-container', {
      opacity: 0,
      filter: 'blur(20px)',
      // duration: 1,
      immediateRender: false,
      scrollTrigger: {
        trigger: '#home-container',
        start: 500,
        end: "+=500",
        scrub: true,
      }
    }, {
      opacity: 1,
      filter: 'blur(0px)',
      // duration: 1,
      onStart: () => console.log('about IN START'),
      immediateRender: false,
      scrollTrigger: {
        trigger: '#home-container',
        start: 1000,
        end: "+=500",
        scrub: true,
      }
    });
    console.log('inserting about fadein');

  }, [startAbout])
*/
  useGSAP(() => {
  }, [startSkills])

  return (
    <MainLayout classProps='tw:scroll-smooth tw:relative'>
      <div id="home-container">
        <Hero className='tw:relative tw:pt-16 hero-container' />

        <AboutMe className='tw:relative tw:w-full tw:pt-56 about-container' trigger={startAbout} />

        {/*
          <div className='tw:relative tw:mt-12'>
          {

              // <link rel="" href={backgroundVideo.backgroundUrl} type="image/png" />
              // <img style={{ height: 700, width: 1400 }} src={backgroundVideo.backgroundUrl}></img>
              <>
                <PixiBackground height={700} width={1400} videoData={backgroundVideo} nextVideoData={nextVideo} className='sticky top-[65px]'
                  ticker={cachedTickFn}
                />
              </>
              // assets.map(videoData => <PixiBackground height={700} width={1400} videoData={videoData} />)

          }
          </div>
        */}
        <div className='tw:absolute skills-container'>
          <Skills className='tw:mt-64 tw:pt-32 tw:h-[900px]' />
        </div>
      </div>
      <Blogs className='tw:mb-20' />
    </MainLayout >
  );
};

export default Home;
