import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { useRef, useState } from 'react';
import gsap from 'gsap';

interface Props {
    className?: string;
}

const data = [
    {
        company: 'Brilliant Earth',
        position: 'Senior software engineer',
        logo: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/images/brilliantearth.png',
        start: 'September 2023',
        end: 'Present',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.`,
        technologies: [
            'Next JS',
            'Web performance',
            'AWS Lambda',
            'AWS Amplify',
            'AWS CodePipeline',
            'Shopify',
            'Github actions'
        ]
    },
    {
        company: 'MediaViz AI',
        position: 'Software engineer',
        logo: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/images/MediaViz.png',
        start: 'January 2022',
        end: 'August 2023',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.`,
        technologies: [
            'Next JS',
            'Web performance',
            'AWS Lambda',
            'AWS Amplify',
            'AWS CodePipeline',
            'Shopify',
            'Github actions'
        ]
    },
    {
        company: 'Xtime',
        position: 'Web developer',
        logo: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/images/xtime.png',
        start: 'April 2018',
        end: 'December 2021',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.`,
        technologies: [
            'Next JS',
            'Web performance',
            'AWS Lambda',
            'AWS Amplify',
            'AWS CodePipeline',
            'Shopify',
            'Github actions'
        ]
    }
];

export default function Experience({ className }: Props) {
    const [active, setActive] = useState<number>();
    const jobsDataChars = useRef<any>([]);

    const { contextSafe } = useGSAP(() => {
        data.map((_role, index) => {
            jobsDataChars.current[index] = SplitText.create(`.job-${index}`, {
                type: 'words',
                wordsClass: 'job-word tw:opacity-0 tw:blur-md'
            });
        });
    }, []);

    const onHover = contextSafe((nextActive: number) => {
        if (nextActive === active) return;

        const tl = gsap.timeline();

        // console.log('on hover', active);
        if (active !== undefined) {
            // Fades out current role chars
            tl.to(`.job-${active} .job-word`, {
                opacity: 0,
                filter: 'blur(10px)',
                scale: 5,
                color: '#000000',
                overwrite: true,
                duration: 0.5,
                onStart: () => {
                    console.log('fade out start');
                },
                stagger: {
                    // each: 0.005
                }
            });
            // Inmediately reverts the current scale for next transition
            tl.set(`.job-${active} .job-word`, {
                scale: 1
            });
        }
        /**
         * Fades in next role chars
         */

        tl.to(
            `.job-${nextActive} .job-word`,
            {
                filter: 'blur(0px)',
                opacity: 1,
                scale: 1,
                color: '#ffffff',
                onStart: () => {
                    console.log('fade in start', nextActive);
                },
                // duration: 1,
                stagger: {
                    each: 0.005
                }
            },
            active! >= 0 ? '>-0.5' : undefined
        );

        setActive(nextActive);
    });

    const onLeave = contextSafe((index: number) => {
        const tl = gsap.timeline();

        /**
         * Fades out current role chars
         */
        tl.to(`.job-${index} .job-word`, {
            opacity: 0,
            filter: 'blur(10px)',
            scale: 5,
            color: '#000000',
            duration: 0.5,
            overwrite: true,
            onStart: () => {
                console.log('fade out leave', index);
            }
        });
        tl.set(`.job-${index} .job-word`, {
            scale: 1
            // overwrite: true,
        });

        setActive(undefined);
    });

    //console.log(active);
    return (
        <div className={className} id='skills'>
            <h2 className='tw:text-4xl tw:mb-20 tw:w-fit projects-title'>Experience</h2>
            <div className='tw:flex'>
                <div className='tw:flex-1/2 tw:flex tw:flex-col tw:gap-8'>
                    {data.map((item, index) => (
                        <div
                            key={item.company}
                            onClick={(e) => {
                                onHover(index);
                            }}
                            onMouseEnter={(e) => {
                                onHover(index);
                            }}
                            className={` tw:transition-opacity tw:duration-200 tw:flex: tw:flex-col tw:items-center
                            ${active === index || active === undefined ? '' : 'tw:opacity-40'}`}
                        >
                            <div className='tw:cursor-pointer tw:flex tw:items-center tw:gap-4 tw:mb-8'>
                                <img src={item.logo} className='tw:w-16 tw:rounded-md' />
                                <div>
                                    <h4 className=''>{item.company}</h4>
                                    <h5>{item.position}</h5>
                                    <span>{item.start}</span> - <span>{item.end}</span>
                                </div>
                            </div>
                            {index + 1 < data.length && (
                                <div className='tw:h-0.5 tw:w-3/5  tw:bg-white tw:rounded-2xl' />
                            )}
                        </div>
                    ))}
                </div>
                <div className='tw:flex-1/2 tw:relative tw:h-full'>
                    {data.map((item, index) => (
                        <div key={item.company} className={`job-${index} tw:absolute tw:w-full tw:top-0 `}>
                            <div className={`job-description `}>{item.description}</div>
                            <div className={'job-technologies tw:mt-4 tw:flex tw:gap-x-4 tw:flex-wrap tw:items-center'}>
                                <div className='job-word'>Technologies: </div>
                                {item.technologies.map((tech, index) => {
                                    return (
                                        <>
                                            <div
                                                key={tech}
                                                className='job-word tw:flex tw:gap-x-2 tw:before:w-1.5 tw:before:h-1.5 tw:before:rounded-full tw:before:bg-white'
                                            >
                                                {tech}
                                            </div>
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
