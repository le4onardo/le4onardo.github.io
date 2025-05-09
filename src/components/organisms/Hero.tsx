import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import gsap from 'gsap';
import { SplitText } from "gsap/SplitText";
import { twMerge } from "tailwind-merge";
import LordIcon from "../icons/LordIcon";
import { Player } from '@lordicon/react';


gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);

const roles = [
    {
        name: 'Developer',
        iconData: {
            url: "https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/icons/wired-outline-742-code-hover-pinch.json",
            reveal: 'in-reveal',
            hover: 'hover-pinch'
        },
        color: '#FFA500', // Orange
        buttonClassname: 'tw:transition-[filter] tw:duration-400 tw:hover:drop-shadow-[0_4px_3px_orange] tw:text-[#FFA500]'
    },
    {
        name: 'Engineer',
        iconData: {
            url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/icons/wired-outline-40-cogs.json',
            reveal: 'in-reveal',
            hover: 'loop-rotation',
        },
        color: '#FFFF00', // Yellow
        buttonClassname: 'tw:transition-[filter] tw:duration-400 tw:hover:drop-shadow-[0_4px_3px_yellow] tw:text-[#FFFF00]'
    },
    {
        name: 'Craftsman',
        iconData: {
            url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/icons/wired-outline-35-edit-hover-circle.json',
            reveal: 'in-dynamic',
            hover: 'hover-line',
        },
        color: '#7CFC00',   // Light Green
        buttonClassname: 'tw:transition-[filter] tw:duration-400 tw:hover:drop-shadow-[0_4px_3px_lightgreen] tw:text-[#7CFC00]'
    },
    {
        name: 'Artisan',
        iconData: {
            url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/icons/brush.json',
            reveal: 'in-reveal',
            hover: 'hover-pinch',
        },
        color: '#87CEFA', // Light Blue
        buttonClassname: 'tw:transition-[filter] tw:duration-400 tw:hover:drop-shadow-[0_4px_3px_lightblue] tw:text-[#87CEFA]'
    },
    {
        name: 'Passionate',
        iconData: {
            url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/icons/wired-outline-20-love-heart-hover-heartbeat-alt.json',
            reveal: 'in-reveal',
            hover: 'hover-heartbeat',
        },
        color: '#FFC0CB', // Pink
        buttonClassname: 'tw:transition-[filter] tw:duration-400 tw:hover:drop-shadow-[0_4px_3px_pink] tw:text-[#FFC0CB]'
    },
]

interface Props {
    className?: string;
    onColorChange?: (color: string, index: number) => void;
}

export default function Hero({ onColorChange, className = '' }: Props) {
    const [active, setActive] = useState<number>(0);
    const [iconState, setIconState] = useState<string>('in-reveal');
    const [hover, setHover] = useState(false);
    const container = useRef<HTMLDivElement>(null);
    const iconsPlayers = useRef<Array<Player | null>>([]);
    const roleNames = useRef<SplitText[]>([]);

    const { contextSafe } = useGSAP(() => {
        let mainTimeline = gsap.timeline();
        let title = SplitText.create('.header-title', { type: "chars", smartWrap: true })
        mainTimeline.from(title.chars, {
            duration: 1,
            stagger: 0.1,
            ease: "elastic.out(1,0.5)",
            filter: "blur(10px)",
            scale: 3,
            opacity: 0
        });

        let author = SplitText.create('.header-author', { type: "chars", smartWrap: true })
        mainTimeline.from(author.chars, {
            duration: 0.5,
            stagger: 0.05,
            opacity: 0,
            filter: 'blur(10px)',
        }, '+=0.5');

        let software = SplitText.create('.header-software', { type: 'chars', smartWrap: true });
        mainTimeline.from(software.chars, {
            duration: 0.5,
            stagger: 0.05,
            opacity: 0,
            filter: 'blur(10px)',
        }, '+=0.5');

        roles.map((_role, index) => {
            roleNames.current[index] = SplitText.create(`.role-name-${index}`, {
                type: 'chars',
                charsClass: 'role-char tw:opacity-0 tw:blur-md'
            })
        }, []);

        mainTimeline.to(roleNames.current[active].chars, {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            color: roles[active].color,
            scale: 1,
            stagger: 0.05,
        }, '-=0.5');

        mainTimeline.set(`.role-${active} .lordicon`, {
            opacity: 1,
            onComplete: () => {
                iconsPlayers.current[active]?.playFromBeginning()
            }
        });

    }, { scope: container });

    const onClick = contextSafe((e: any) => {
        const nextActive = (active + 1) % roles.length;
        const role = roles[active]
        const nextRole = roles[nextActive];
        const target = e.target as HTMLElement;
        console.log('click', target.className)
        const position = target.className.includes('role-char') ?
            [...target.parentElement!.childNodes].findIndex(node => node === e.target) :
            role.name.length;

        let tl = gsap.timeline();

        tl.to(`.role-${active} .role-char, .role-${active} .lordicon`, {
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
        tl.set(`.role-${active} .role-char, .role-${active} .lordicon`, {
            scale: 1
        })
        tl.to(`.role-${nextActive} .role-char`, {
            opacity: 1,
            duration: 0.3,
            filter: 'blur(0px)',
            scale: 1,
            color: nextRole.color,
            stagger: {
                from: Math.min(position, nextRole.name.length),
                each: 0.05
            },
        }, '<+=0.05');

        tl.set(`.role-${nextActive} .lordicon`, {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            onComplete: () => {
                setIconState(nextRole.iconData.reveal);
                iconsPlayers.current[nextActive]?.play()
            }
        });

        if (onColorChange) {
            onColorChange(nextRole.color, nextActive);
        }
        setActive(nextActive);
    });

    const onHover = (e: React.MouseEvent<HTMLButtonElement>) => {
        setHover(true);
        const playerRef = iconsPlayers.current[active];

        if (!playerRef?.isPlaying && iconState === roles[active].iconData.hover) {
            // console.log('hover play!');
            playerRef?.play();
        }
    };


    return <div className={twMerge('tw:bg-transparent tw:flex tw:flex-col tw:justify-evenly  tw:text-white', className)} ref={container}>
        <div className='tw:max-w-none tw:m-auto tw:text-center tw:mt-24 
        tw:text-[6rem] tw:lg:max-w-[30rem] tw:lg:text-[60px] tw:lg:mb-40 tw:lg:mx-0
        tw:lg:mt-40 tw:lg:font-bold tw:lg:block tw:lg:min-h-[288px] tw:lg:text-left'>
            <h1 className="header-title">
                The journey is the reward...
            </h1>
        </div>

        <span className='header-author'>
            Leonardo Rios
        </span>

        <div className='tw:relative tw:flex tw:gap-4 tw:items-center'>
            <span className="tw:inline header-software">Software</span>

            <button
                className={twMerge("tw:relative tw:cursor-pointer tw:inline")}
                onClick={onClick}
                onMouseEnter={onHover}
                onMouseLeave={() => setHover(false)}
            >
                {
                    roles.map(({ name, buttonClassname, iconData, color }, index) => {
                        return <div
                            key={index}
                            className={twMerge(
                                `tw:flex tw:items-center tw:gap-2 tw:whitespace-nowrap tw:top-0 tw:left-0 role-${index}`,
                                active === index ? "tw:relative tw:z-10" : "tw:absolute",
                                buttonClassname
                            )}
                        >
                            <span className={`role-name-${index}`}>{name}</span>
                            <LordIcon
                                ref={el => iconsPlayers.current[index] = el}
                                url={iconData.url}
                                size={30}
                                colorize={color}
                                state={iconState}
                                className={'tw:opacity-0 lordicon'}
                                onComplete={() => {
                                    if (active !== index) return;

                                    const role = roles[index];
                                    const playerRef = iconsPlayers.current[index];

                                    // console.log('complete', role.profession, iconState, hover)
                                    if (iconState === role.iconData.reveal) {
                                        setIconState(role.iconData.hover);
                                        hover ? playerRef?.play() : playerRef?.pause();
                                        return;
                                    }

                                    if (iconState === role.iconData.hover) {
                                        hover && playerRef?.playFromBeginning();
                                    }
                                }}
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