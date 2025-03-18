import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import toSingleChars from "../../utils/string";
import gsap from 'gsap';
import { TextAnimator } from "../molecules/TextAnimator";
import { twMerge } from "tailwind-merge";


gsap.registerPlugin(useGSAP);

const professions = ['Developer', 'Engineer', 'Craftsman', 'Artisan'];
const colors = ['#FFC0CB', '#7CFC00', '#87CEFA', '#FFFF00'];

interface Props {
    className?: string;
}
export default function Hero({ className = '' }: Props) {
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

        tl.to(`div[data-sentence="${professions[active]}"]  p`, {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            color: colors[active],
            scale: 1,
            stagger: 0.05,
        }, '-=0.5');

    }, { scope: container });

    const onClick = contextSafe((e: any) => {
        const position = [...(e.target as HTMLElement).parentElement!.childNodes].findIndex(node => node === e.target);
        const nextActive = (active + 1) % professions.length;
        let tl = gsap.timeline();
        console.log(professions[active], professions[nextActive], position)

        tl.to(`div[data-word="${professions[active]}"] p`, {
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
        tl.to(`div[data-word="${professions[nextActive]}"]  p`, {
            opacity: 1,
            duration: 0.3,
            filter: 'blur(0px)',
            scale: 1,
            color: colors[nextActive],
            stagger: {
                from: Math.min(position, professions[nextActive].length - 1),
                each: 0.05
            },
            onStart: () => { console.log('draw', professions[nextActive]) }
        }, '<+=0.05');

        setActive(nextActive);
    });

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

        <TextAnimator text='Leonardo Rios' charStyles={{
            opacity: '0',
            filter: 'blur(10px)',
        }} />
        <div className='prof-container relative flex w-52'>
            <TextAnimator className="" text='Software ' charStyles={{
                opacity: '0',
                filter: 'blur(10px)',
            }} />
            <button style={{ textShadow: '0 2px 10px' }} className="relative cursor-pointer w-28" onClick={onClick}>
                {
                    professions.map((prof, index) => {
                        return <TextAnimator
                            text={prof}
                            className={active === index ? "relative z-10 top-0 left-0 w-fit" : "absolute top-0 left-0"}
                            charStyles={{
                                opacity: '0',
                                filter: 'blur(10px)',
                            }} />
                    })
                }
            </button>
            <div className="prof-shadow absolute h-full w-2.5 left-[-30px] shadow-[0_0_19px_16px_black] rounded-e-full z-20 bg-black" />
        </div>
    </div>
}