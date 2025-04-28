import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import gsap from 'gsap';
import { TextAnimator } from "../molecules/TextAnimator";
import { twMerge } from "tailwind-merge";
import CodeIcon, { codeIconGsap } from "../icons/CodeIcon";
import GearIcon, { gearIconGsap } from "../icons/GearIcon";
import SeedlingIcon, { seedlingIconGsap } from "../icons/SeedlingIcon";
import SparklesIcon, { sparklesIconGsap } from "../icons/SparklesIcon";
import LordIcon from "../icons/LordIcon";
import { Player } from '@lordicon/react';


gsap.registerPlugin(useGSAP);

const states = [
    {
        profession: 'Developer',
        iconData: {
            url: "https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/icons/wired-outline-742-code-hover-pinch.json",
            reveal: 'in-reveal',
            hover: 'hover-pinch'
        },
        color: '#FFC0CB', // Pink
        animations: codeIconGsap,
        buttonClassname: 'transition-[filter] duration-400 hover:drop-shadow-[0_4px_3px_pink]'
    },
    {
        profession: 'Passionate',
        iconData: {
            url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/icons/wired-outline-40-cogs.json',
            reveal: 'in-reveal',
            hover: 'loop-rotation',
            // loop
            onComplete: (player?: Player) => { player?.playFromBeginning() }
        },

        color: '#FFA500', // Orange
        animations: gearIconGsap,
        buttonClassname: 'transition-[filter] duration-400 hover:drop-shadow-[0_4px_3px_orange]'
    },
    {
        profession: 'Engineer',
        iconData: {
            url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/icons/wired-outline-40-cogs.json',
        },
        color: '#FFFF00', // Yellow
        animations: seedlingIconGsap,
        buttonClassname: 'transition-[filter] duration-400 hover:drop-shadow-[0_4px_3px_yellow]'
    },
    {
        profession: 'Craftsman',
        iconData: {
            url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/icons/wired-outline-40-cogs.json',
        },
        color: '#7CFC00',   // Light Green
        animations: sparklesIconGsap,
        buttonClassname: 'transition-[filter] duration-400 hover:drop-shadow-[0_4px_3px_lightgreen]'
    },
    {
        profession: 'Artisan',
        iconData: {
            url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/icons/wired-outline-40-cogs.json',
        },
        color: '#87CEFA', // Light Blue
        animations: codeIconGsap,
        buttonClassname: 'transition-[filter] duration-400 hover:drop-shadow-[0_4px_3px_lightblue]'
    },
]

interface Props {
    className?: string;
    onColorChange?: (color: string, index: number) => void;
}

export default function Hero({ onColorChange, className = '' }: Props) {
    const container = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState<number>(0);
    const iconTimeline = useRef<gsap.core.Timeline>();
    const [iconState, setIconState] = useState<string>();
    const iconsPlayers = useRef<Array<Player | null>>([]);

    const { contextSafe } = useGSAP(() => {
        let mainTimeline = gsap.timeline();
        iconTimeline.current = gsap.timeline();
        states[active].animations.forEach(({ targets, vars, position, method }) => {
            iconTimeline.current![method](targets, vars, position);
        });
        iconTimeline.current!.pause();

        mainTimeline.to('h1 p', {
            opacity: 1,
            scale: 1,
            top: 0,
            left: 0,
            color: '#ffffff',
            duration: 1,
            stagger: 0.1,
            filter: 'blur(0px)',
            ease: "elastic.out(1,0.5)",
        });

        mainTimeline.to('div[data-sentence="Leonardo Rios"]  p', {
            opacity: 1,
            filter: 'blur(0px)',
            color: '#ffffff',
            duration: 0.5,
            stagger: 0.05,
        }, '+=0.5');

        mainTimeline.to(`div[data-sentence="Software "]  p`, {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            color: '#ffffff',
            scale: 1,
            stagger: 0.05,
        }, '+=0.5');

        mainTimeline.to(`.profession-${active} p`, {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            color: states[active].color,
            scale: 1,
            stagger: 0.05,
        }, '-=0.5');

        mainTimeline.set(`.profession-${active} .lordicon`, {
            opacity: 1,
            onComplete: () => {
                iconsPlayers.current[active]?.playFromBeginning()
            }
        });

    }, { scope: container });

    const onClick = contextSafe((e: any) => {
        const nextActive = (active + 1) % states.length;
        const { profession, color } = states[active];
        const target = e.target as HTMLElement;
        const position = target instanceof SVGElement ? profession.length :
            [...target.parentElement!.childNodes].findIndex(node => node === e.target);


        let tl = gsap.timeline();
        console.log(profession, profession[nextActive], position)

        tl.to(`.profession-${active} p, .profession-${active} .lordicon `, {
            opacity: 0,
            filter: 'blur(10px)',
            scale: 5,
            duration: 0.3,
            color: '#000000',
            overwrite: true,
            rotation: 0,
            stagger: {
                from: position,
                each: 0.05
            },
        });
        tl.to(`.profession-${nextActive} p`, {
            opacity: 1,
            duration: 0.3,
            filter: 'blur(0px)',
            scale: 1,
            color: states[nextActive].color,
            stagger: {
                from: Math.min(position, states[nextActive].profession.length),
                each: 0.05
            },
        }, '<+=0.05');

        tl.set(`.profession-${nextActive} .lordicon`, {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            onComplete: () => {
                iconsPlayers.current[nextActive]?.playFromBeginning()
            }
        });

        if (onColorChange) {
            onColorChange(states[nextActive].color, nextActive);
        }
        setIconState('in-reveal');
        setActive(nextActive);
    });

    const onHover = contextSafe((e: React.MouseEvent<HTMLButtonElement>) => {
        setIconState(states[active].iconData.hover);
        iconsPlayers.current[active]?.playFromBeginning();
    });

    return <div className={twMerge('bg-transparent flex flex-col justify-evenly  text-black', className)} ref={container}>
        <h1 className='max-w-none m-auto text-center mt-24 text-[6rem]
        lg:max-w-[30rem] lg:text-[60px] lg:mb-40 lg:mx-0 lg:mt-40 lg:font-bold lg:block lg:min-h-[288px] lg:text-left'>
            <TextAnimator className='' text='The journey is the reward...' charStyles={{
                opacity: '0',
                scale: '3',
                // left: `${Math.random() * 600 - 300}px`,
                // top: `${Math.random() * 600 - 300}px`,
                filter: 'blur(10px)'
            }} />
        </h1>

        <TextAnimator text='Leonardo Rios' charClassName="opacity-0 blur-md" />
        <div className='relative flex items-center whitespace-nowrap' >
            <TextAnimator className="inline" text='Software ' charClassName="opacity-0 blur-md" />
            <button
                className={twMerge("relative cursor-pointer inline")}
                onClick={onClick}
                onMouseEnter={onHover}
            >
                {
                    states.map(({ profession, buttonClassname, iconData, color }, index) => {
                        return <div
                            key={index}
                            className={twMerge(
                                `flex items-center whitespace-nowrap top-0 left-0 profession-${index}`,
                                active === index ? "relative z-10" : "absolute",
                                buttonClassname
                            )}
                        >
                            <TextAnimator
                                text={profession}
                                charClassName="opacity-0 blur-md"
                            />
                            <LordIcon
                                ref={el => iconsPlayers.current[index] = el}
                                url={iconData.url}
                                // onComplete={iconData.onComplete ? () => iconData.onComplete(iconsPlayers.current[index]) : undefined}
                                size={30}
                                colorize={color}
                                state={iconState}
                                className={'opacity-0 lordicon'}
                            />
                        </div>
                    })
                }
            </button>
        </div>
    </div>
}

/*
<a href="https://lordicon.com/">Icons by Lordicon.com</a>
*/