import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef, useState } from "react";
import gsap from 'gsap';

interface Props {
    className?: string
}

const data = [{
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
                mollit anim id est laborum.`

}, {
    company: 'Imaige AI',
    position: 'Software engineer',
    logo: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/images/brilliantearth.png',
    start: 'January 2022',
    end: 'August 2023',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.`
}, {
    company: 'Xtime',
    position: 'Web developer',
    logo: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/images/brilliantearth.png',
    start: 'April 2018',
    end: 'December 2021',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.`
}];

export default function Experience({ className }: Props) {
    const [active, setActive] = useState<number>();
    const jobsDataChars = useRef<any>([]); 

    const {contextSafe} = useGSAP(() => {
        data.map((_role, index) => {
            jobsDataChars.current[index] = SplitText.create(`.job-description-${index}`, {
                type: 'words',
                wordsClass: 'job-description-word tw:opacity-0 tw:blur-md'
            })
        });
    }, []);

     const onHover = contextSafe((nextActive: number) => {
        const tl = gsap.timeline();

        // console.log('on hover', active);
        if (active !== undefined) {
            // Fades out current role chars
            tl.to(`.job-description-${active} .job-description-word`, {
                opacity: 0,
                filter: 'blur(10px)',
                scale: 5,
                color: '#000000',
                overwrite: true,
                duration: 0.5,
                onStart: () => {
                    console.log('fade out start')
                },
                stagger: {
                    // each: 0.005
                }
            });
            // Inmediately reverts the current scale for next transition 
            tl.set(`.job-description-${active} .job-description-word`, {
                scale: 1,
            });            
        }
        /**
         * Fades in next role chars
         */
        
        tl.to(`.job-description-${nextActive} .job-description-word`, {
            filter: 'blur(0px)',
            opacity: 1,
            scale: 1,
            color: '#ffffff',
            onStart: () => {console.log('fade in start', nextActive)},
            // duration: 1,
            stagger: {
                each: 0.005
            }
            
        },  
        active! >= 0 ? '>-0.5' : undefined
        );

        setActive(nextActive)
    });

    const onLeave = contextSafe((index: number) => {
        const tl = gsap.timeline();

        /**
        * Fades out current role chars
        */
        tl.to(`.job-description-${index} .job-description-word`, {
            opacity: 0,
            filter: 'blur(10px)',
            scale: 5,
            color: '#000000',
            duration: 0.5,
            overwrite: true,
            onStart: () => {console.log('fade out leave', index)},
        });
        tl.set(`.job-description-${index} .job-description-word`, {
            scale: 1,
            // overwrite: true,
        });
                
        setActive(undefined)
    });

    //console.log(active);
    return <div className={className} id="skills">
        <h2 className='tw:text-4xl tw:mb-20 tw:w-fit projects-title'>Experience</h2>
        <div className="tw:flex">
            <div className="tw:flex-1/2 tw:flex tw:flex-col tw:gap-8"  onMouseLeave={() => onLeave(active!)}>{
                data.map((item, index) => <div
                        key={item.company}
                        onMouseEnter={(e) => {
                            console.log(e.target);
                            onHover(index)}}
                        className={
                            `tw:cursor-pointer tw:flex tw:items-center tw:gap-4 tw:mb-8 tw:transition-opacity tw:duration-200
                            ${active===index || active === undefined ? "" : "tw:opacity-40"}`
                        }
                    >
                    <img src={item.logo} className="tw:w-16 tw:rounded-md"/>
                    <div>
                        <h4 className="">{item.company}</h4>
                        <h5>{item.position}</h5>
                        <span>{item.start}</span> - <span>{item.end}</span>
                    </div>
                </div>)
            }</div>
            <div className="tw:flex-1/2 tw:relative tw:h-full">
                {data.map((item, index) => 
                    <div 
                        key={item.company}
                        className={`job-description-${index} tw:w-full tw:top-0 tw:absolute`} 
                    >
                        {item.description}
                        
                    </div>
                )}
            </div>
        </div>
    </div>
}