import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import toSingleChars from "../../utils/string";
import gsap from 'gsap';
import { TextAnimator } from "../molecules/TextAnimator";
import { twMerge } from "tailwind-merge";
import CodeIcon from "../icons/CodeIcon";
import GearIcon from "../icons/GearIcon";
import SeedlingIcon from "../icons/SeedlingIcon";
import SparklesIcon from "../icons/SparklesIcon";


gsap.registerPlugin(useGSAP);

const professions = ['Developer', 'Passionate', 'Engineer', 'Craftsman', 'Artisan'];
const colors = [
    '#FFC0CB', // Pink
    '#FFA500', // Orange
    '#FFFF00', // Yellow
    '#7CFC00', // Light Green
    '#87CEFA'  // Light Blue
];

interface Props {
    className?: string;
    onColorChange?: (color: string, index: number) => void;
}
export default function Hero({ onColorChange, className = '' }: Props) {
    const container = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState<number>(0);
    const transition = useRef<boolean>(false);

    const { contextSafe } = useGSAP(() => {
        let tl = gsap.timeline();
        tl.to('h1 p', {
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

        tl.to('div[data-sentence="Leonardo Rios"]  p', {
            opacity: 1,
            filter: 'blur(0px)',
            color: '#ffffff',
            duration: 0.5,
            stagger: 0.05,
        }, '+=0.5');

        tl.to(`div[data-sentence="Software "]  p`, {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            color: '#ffffff',
            scale: 1,
            stagger: 0.05,
        }, '+=0.5');

        tl.to(`.profession-${active} p, .profession-${active} svg `, {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            color: colors[active],
            scale: 1,
            stagger: 0.05,
        }, '-=0.5');

    }, { scope: container });

    const onClick = contextSafe((e: any) => {
        const target = e.target as HTMLElement;
        const position = target instanceof SVGElement ? professions[active].length :
            [...target.parentElement!.childNodes].findIndex(node => node === e.target);

        const nextActive = (active + 1) % professions.length;
        let tl = gsap.timeline();
        console.log(professions[active], professions[nextActive], position)

        tl.to(`.profession-${active} p, .profession-${active} svg `, {
            opacity: 0,
            filter: 'blur(10px)',
            scale: 5,
            duration: 0.3,
            color: '#000000',
            overwrite: true,
            stagger: {
                from: position,
                each: 0.05
            },
            onStart: () => { console.log('erase', professions[active]) }
        });
        tl.to(`.profession-${nextActive} p, .profession-${nextActive} svg `, {
            opacity: 1,
            duration: 0.3,
            filter: 'blur(0px)',
            scale: 1,
            color: colors[nextActive],
            stagger: {
                from: Math.min(position, professions[nextActive].length),
                each: 0.05
            },
            onStart: () => { console.log('draw', professions[nextActive]) },
            //onComplete: () => {  }
        }, '<+=0.05');

        if (onColorChange) {
            onColorChange(colors[nextActive], nextActive);
        }
        setActive(nextActive);
    });

    const buttonColors = [
        'hover:text-shadow-[0_5px_12px_pink]',
        'hover:text-shadow-[0_5px_12px_orange]',
        'hover:text-shadow-[0_5px_12px_yellow]',
        'hover:text-shadow-[0_5px_12px_lightgreen]',
        'hover:text-shadow-[0_5px_12px_lightblue]',
    ]

    return <div className={twMerge('bg-transparent flex flex-col justify-evenly  text-black', className)} ref={container}>
        <h1 className='max-w-none m-auto text-center mt-24 text-[6rem]
        lg:max-w-[30rem] lg:text-[60px] lg:mb-40 lg:mx-0 lg:mt-40 lg:font-bold lg:block lg:min-h-[288px] lg:text-left'>
            <TextAnimator className='' text='The journey is the reward...' charStyles={{
                opacity: '0',
                scale: '3',
                //left: `${Math.random() * 600 - 300}px`,
                //top: `${Math.random() * 600 - 300}px`,
                filter: 'blur(10px)'
            }} />
        </h1>

        <TextAnimator text='Leonardo Rios' charClassName="opacity-0 blur-md" />
        <div className='prof-container relative flex'>
            <TextAnimator className="" text='Software ' charClassName="opacity-0 blur-md" />
            <button className={`relative cursor-pointer overflow transition-[text-shadow]  duration-400 ${buttonColors[active]}`} onClick={onClick}>
                <div className={`whitespace-nowrap top-0 left-0 profession-0 ${active === 0 ? "relative z-10" : "absolute"}`}>
                    <TextAnimator
                        text={professions[0]}
                        className="inline"
                        charClassName="opacity-0 blur-md"
                    />
                    <CodeIcon stroke={colors[0]} className="opacity-0 inline blur" />
                </div>
                <div className={`whitespace-nowrap top-0 left-0 profession-1 ${active === 1 ? "relative z-10" : "absolute"}`}>
                    <TextAnimator
                        text={professions[1]}
                        className="inline"
                        charClassName="opacity-0 blur-md"
                    />
                    <GearIcon stroke={colors[1]} className="opacity-0 inline blur" />
                </div>
                <div className={`whitespace-nowrap top-0 left-0 profession-2 ${active === 2 ? "relative z-10" : "absolute"}`}>
                    <TextAnimator
                        text={professions[2]}
                        className="inline"
                        charClassName="opacity-0 blur-md"
                    />
                    <SeedlingIcon stroke={colors[2]} className="opacity-0 inline blur" />
                </div>
                <div className={`whitespace-nowrap top-0 left-0 profession-3 ${active === 3 ? "relative z-10" : "absolute"}`}>
                    <TextAnimator
                        text={professions[3]}
                        className="inline"
                        charClassName="opacity-0 blur-md"
                    />
                    <SparklesIcon stroke={colors[3]} className="opacity-0 inline blur" />
                </div>
                <div className={`whitespace-nowrap top-0 left-0 profession-4 ${active === 4 ? "relative z-10" : "absolute"}`}>
                    <TextAnimator
                        text={professions[4]}
                        className="inline"
                        charClassName="opacity-0 blur-md"
                    />
                    <CodeIcon stroke={colors[4]} className="opacity-0 inline blur" />
                </div>
            </button>
        </div>
    </div>
}