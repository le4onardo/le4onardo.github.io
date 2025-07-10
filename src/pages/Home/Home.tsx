import MainLayout from '../../components/templates/MainLayout/MainLayout';
import useGlitcher from '../../hooks/useGlitcher';
import Skills from '../../components/organisms/Skills/Skills';
import AboutMe from '../../components/organisms/About/About';
import Blogs from '../../components/organisms/Blogs/Blogs';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
import { useRef, useState } from 'react';
import Hero from '../../components/organisms/Hero';


const colorOffets = [
  // orange '#FFA500':
   2.5,
  // yellow '#FFFF00':
   3.1,
  //light green '#7CFC00':
   4,
  // Light Blue '#87CEFA': 
  5.5,
  // pink '#FFC0CB': 
  7.5
];


const Home = () => {
  const [startAbout, setStartAbout] = useState(false);
  const [startSkills, setSkills] = useState(false);
  const tl = useRef<gsap.core.Timeline>();
  const aboutFadein = useRef<GSAPTween>();
  const [color, setColor] = useState(colorOffets[0]);


  useGSAP(() => {
    tl.current = gsap.timeline(colorOffets);

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

    gsap.to('.skills-container', {
      opacity: 0,
      filter: 'blur(60px)',
      scale: 0.9,
      scrollTrigger: {
        trigger: '.skills-container',
        start: "top top-=10",
        end: "+=1000",
        scrub: 1,
      }
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

  return (
    <MainLayout classProps='tw:scroll-smooth tw:relative' color={color}>
      

      <div id="home-container">
        <Hero className='tw:relative tw:pt-16 hero-container' onColorChange={(_color, index) => setColor(colorOffets[index])}/>

        <AboutMe className='tw:relative tw:w-full tw:pt-48 tw:mt-8 about-container' trigger={startAbout} />
        
        <Skills className='tw:mt-64 tw:pt-32 tw:h-[900px] skills-container' />
        
      </div>
      <Blogs className='tw:mb-20 tw:h-[900px]' />
    </MainLayout >
  );
};

export default Home;
