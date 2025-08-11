import MainLayout from '../../components/templates/MainLayout/MainLayout';
import useGlitcher from '../../hooks/useGlitcher';
import Experience from '../../components/organisms/Experience/Experience';
import AboutMe from '../../components/organisms/About/About';
import Blogs from '../../components/organisms/Blogs/Blogs';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
import { useRef, useState } from 'react';
import Hero from '../../components/organisms/Hero';
import StateProvider from '../../store/Context';

const Home = () => {
    const [startAbout, setStartAbout] = useState(false);
    const [startSkills, setSkills] = useState(false);
    const tl = useRef<gsap.core.Timeline>();
    const aboutFadein = useRef<GSAPTween>();

    useGSAP(() => {
        // fades out hero on scroll
        const heroTween = gsap.to('.hero-container', {
            //opacity: 0,
            //filter: 'blur(60px)',
            //scale: 0.9,
            onUpdate: () => {
                if (heroTween!.progress() > 0.5) {
                    console.log('set about true');
                    setStartAbout(true);
                }
            },
            scrollTrigger: {
                trigger: '.hero-container',
                start: 'top top-=100',
                end: '+=1000',
                scrub: 1
            }
        });

        // pins about section for 500px
        gsap.to('.about-container', {
            // opacity: 0,
            // filter: 'blur(20px)',
            onStart: () => {
                console.log('set about true');
                setStartAbout(true);
                // console.log('about OUT START')
            },
            // immediateRender: false,
            scrollTrigger: {
                trigger: '.about-container',
                pin: true,
                start: 'top top',
                end: '+=500',
                scrub: 1
            }
        });

        // fades out about section on scroll
        gsap.to('.about-container', {
            opacity: 0,
            filter: 'blur(60px)',
            scale: 0.9,
            scrollTrigger: {
                trigger: '.about-container',
                start: 'top top-=10',
                end: '+=1000',
                scrub: 1
            }
        });

        gsap.to('.exp-container', {
            opacity: 0,
            filter: 'blur(60px)',
            scale: 0.9,
            // onStart: () => {},
            scrollTrigger: {
                trigger: '.exp-container',
                start: 'top top-=10',
                end: '+=1000',
                scrub: 1
            }
        });
    });

    return (
        <StateProvider initialState={{ colorOffset: 2.5 }}>
            <MainLayout classProps='tw:scroll-smooth tw:relative'>
                <Hero className='tw:relative tw:pt-16 hero-container tw:lg:max-w-[1200px] tw:lg:px-[50px] tw:lg:mx-auto tw:px-[20px]' />
                <AboutMe
                    className='about-container tw:relative tw:w-full tw:pt-48 tw:mt-8 tw:px-[20px] tw:lg:max-w-[1200px] tw:lg:mx-auto tw:lg:mb-[50px] tw:lg:px-[50px]'
                    trigger={startAbout}
                />

                <div className='tw:relative'>
                    <div className='tw:absolute tw:w-full tw:h-full tw:backdrop-blur-sm tw:bg-[rgba(0,0,0,0.8)]' />
                    <Experience className='tw:mt-64 tw:pt-32 tw:h-[900px] exp-container tw:lg:max-w-[1200px] tw:lg:mx-auto tw:lg:px-[50px]' />
                </div>
                <Blogs className='tw:mb-20 tw:h-[900px] tw:px-[20px] tw:lg:max-w-[1200px] tw:lg:mx-auto tw:lg:px-[50px]' />
            </MainLayout>
        </StateProvider>
    );
};

export default Home;
