import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import useSplitText from "../../../hooks/useSplitText";

interface Props {
    className?: string;
    trigger?: boolean;
    timeline?: gsap.core.Timeline
}

export default function AboutMe({ trigger, timeline, className = '' }: Props) {
    const titleSplit = useSplitText('.about-title', { type: 'chars', smartWrap: true, charsClass: 'tw:opacity-0' })
    const descriptionSplit = useSplitText('.about-description', {
        type: 'words', smartWrap: true,
        // wordsClass: 'tw:opacity-0 ' 
    });

    /**
     * Initial layout hiding
     */
    useGSAP(() => {
        gsap.set('.my-portrait', {
            x: 100,
            opacity: 0,
            filter: 'blur(20px)',
            scale: 1.2,
        });
        gsap.set([
            ...descriptionSplit.current!.words,
            ...titleSplit.current!.chars
        ], {
            x: -100,
            opacity: 0,
            filter: 'blur(20px)',
        });
    })

    useGSAP(() => {
        if (!trigger) return;
        const tl = timeline || gsap.timeline();

        // Fades in title, description and image
        tl.to(titleSplit.current!.chars, {
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.05,
        });
        tl.to(descriptionSplit.current!.words,
            {
                x: 0,
                opacity: 1,
                filter: 'blur(0px)',
                stagger: 0.01,
            },
        );
        tl.to('.my-portrait', {
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            duration: 0.6
        }, '<');
    }, { dependencies: [trigger] });


    return <div className={twMerge('tw:flex tw:justify-between', className)} id='about' >
        <div>
            <h2 className='tw:text-4xl tw:mb-20 tw:w-fit about-title' >ABOUT ME</h2>
            <p className='tw:lg:w-96 tw:w-full about-description'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
            </p>
        </div>
        <img className='my-portrait tw:h-[500px] tw:rounded' loading='lazy' src="https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/images/my_photo_1.jpeg" />
    </div >
}