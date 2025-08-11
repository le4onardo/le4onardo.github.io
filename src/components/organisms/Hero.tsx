import { useGSAP } from '@gsap/react';
import { useContext, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { twMerge } from 'tailwind-merge';
import LordIcon from '../icons/LordIcon';
import { Player } from '@lordicon/react';
import { StateContext } from '../../store/Context';
// import { CustomWiggle, RoughEase } from "gsap/all";

const roles = [
    {
        name: 'Developer',
        iconData: {
            url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/icons/wired-outline-742-code-hover-pinch.json',
            reveal: 'in-reveal',
            hover: 'hover-pinch'
        },
        color: '#FFA500', // Orange
        buttonClassname:
            'tw:transition-[filter] tw:duration-400 tw:hover:drop-shadow-[0_4px_3px_orange] tw:text-[#FFA500]',
        colorOffset: 2.5
    },
    {
        name: 'Engineer',
        iconData: {
            url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/icons/wired-outline-40-cogs.json',
            reveal: 'in-reveal',
            hover: 'loop-rotation'
        },
        color: '#FFFF00', // Yellow
        buttonClassname:
            'tw:transition-[filter] tw:duration-400 tw:hover:drop-shadow-[0_4px_3px_yellow] tw:text-[#FFFF00]',
        colorOffset: 3.1
    },
    {
        name: 'Craftsman',
        iconData: {
            url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/icons/wired-outline-35-edit-hover-circle.json',
            reveal: 'in-dynamic',
            hover: 'hover-line'
        },
        color: '#7CFC00', // Light Green
        buttonClassname:
            'tw:transition-[filter] tw:duration-400 tw:hover:drop-shadow-[0_4px_3px_lightgreen] tw:text-[#7CFC00]',
        colorOffset: 4
    },
    {
        name: 'Artisan',
        iconData: {
            url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/icons/brush.json',
            reveal: 'in-reveal',
            hover: 'hover-pinch'
        },
        color: '#87CEFA', // Light Blue
        buttonClassname:
            'tw:transition-[filter] tw:duration-400 tw:hover:drop-shadow-[0_4px_3px_lightblue] tw:text-[#87CEFA]',
        colorOffset: 5.5
    },
    {
        name: 'Passionate',
        iconData: {
            url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/icons/wired-outline-20-love-heart-hover-heartbeat-alt.json',
            reveal: 'in-reveal',
            hover: 'hover-heartbeat'
        },
        color: '#FFC0CB', // Pink
        buttonClassname:
            'tw:transition-[filter] tw:duration-400 tw:hover:drop-shadow-[0_4px_3px_pink] tw:text-[#FFC0CB]',
        colorOffset: 7.5
    }
];

interface Props {
    className?: string;
}

export default function Hero({ className = '' }: Props) {
    const [active, setActive] = useState<number>(0);
    const [iconState, setIconState] = useState<string>('in-reveal');
    const [hover, setHover] = useState(false);

    const container = useRef<HTMLDivElement>(null);
    const iconsPlayers = useRef<Array<Player | null>>([]);
    const roleNames = useRef<SplitText[]>([]);
    const { updateThreeState } = useContext(StateContext);

    const { contextSafe } = useGSAP(
        () => {
            const mainTimeline = gsap.timeline();
            const title = SplitText.create('.header-title', { type: 'chars', smartWrap: true });

            mainTimeline.from(title.chars, {
                opacity: 0,
                filter: 'blur(10px)',
                y: 50,
                ease: 'back',
                scale: 0.8,
                stagger: 0.1
            });

            const author = SplitText.create('.header-author', { type: 'words', smartWrap: true });
            mainTimeline.from(
                author.words,
                {
                    opacity: 0,
                    filter: 'blur(10px)',
                    y: 10,
                    scale: 0.8,
                    stagger: 0.3
                },
                '+=1'
            );

            mainTimeline.from(
                '.header-software',
                {
                    opacity: 0,
                    filter: 'blur(10px)',
                    y: 10,
                    scale: 0.8,
                    duration: 0.5
                },
                '+=0.5'
            );

            roles.map((_role, index) => {
                roleNames.current[index] = SplitText.create(`.role-name-${index}`, {
                    type: 'chars',
                    charsClass: 'role-char tw:opacity-0 tw:blur-md'
                });
            }, []);

            mainTimeline.to(roleNames.current[active].chars, {
                filter: 'blur(0px)',
                opacity: 1,
                stagger: 0.05
            });

            mainTimeline.set(`.role-${active} .lordicon`, {
                opacity: 1,
                onComplete: () => {
                    iconsPlayers.current[active]?.playFromBeginning();
                }
            });
        },
        { scope: container }
    );

    const onClick = contextSafe((e: any) => {
        const nextActive = (active + 1) % roles.length;
        const role = roles[active];
        const nextRole = roles[nextActive];
        const target = e.target as HTMLElement;
        const position = target.className.includes('role-char')
            ? [...target.parentElement!.childNodes].findIndex((node) => node === e.target)
            : role.name.length;
        const tl = gsap.timeline();
        /**
         * Fades out current role chars and icon
         */
        tl.to(`.role-${active} .role-char, .role-${active} .lordicon`, {
            opacity: 0,
            filter: 'blur(10px)',
            scale: 5,
            color: '#000000',
            overwrite: true,
            stagger: {
                from: position,
                each: 0.05
            }
        });
        /**
         * Inmediately reverts the current scale for next transition
         */
        tl.set(`.role-${active} .role-char, .role-${active} .lordicon`, {
            scale: 1
        });
        /**
         * Fades in next role chars
         */
        tl.to(
            `.role-${nextActive} .role-char`,
            {
                filter: 'blur(0px)',
                scale: 1,
                opacity: 1,
                color: nextRole.color,
                stagger: {
                    from: Math.min(position, nextRole.name.length),
                    each: 0.05
                }
            },
            '<-=1'
        );

        /**
         * Inmediately sets the next icon with visible css
         */
        tl.set(`.role-${nextActive} .lordicon`, {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            /**
             * After the icon is no hidden, playing the animation will make finally appear
             */
            onComplete: () => {
                setIconState(nextRole.iconData.reveal);
                iconsPlayers.current[nextActive]?.play();
            }
        });

        updateThreeState && updateThreeState({ colorOffset: nextRole.colorOffset });
        setActive(nextActive);
    });

    const onHover = (e: React.MouseEvent<HTMLButtonElement>) => {
        setHover(true);
        const playerRef = iconsPlayers.current[active];

        if (!playerRef?.isPlaying && iconState === roles[active].iconData.hover) {
            playerRef?.play();
        }
    };

    return (
        <div className={twMerge('tw:flex tw:flex-col tw:justify-evenlytw:text-white', className)} ref={container}>
            <div
                className='tw:max-w-none tw:m-auto tw:text-center tw:mt-24 
        tw:text-[6rem] tw:lg:max-w-[30rem] tw:lg:text-[60px] tw:lg:mb-40 tw:lg:mx-0
        tw:lg:mt-40 tw:lg:font-bold tw:lg:block tw:lg:min-h-[288px] tw:lg:text-left'
            >
                <h1 className='header-title'>The journey is the reward...</h1>
            </div>

            <span className='header-author tw:w-fit'>Leonardo Rios</span>

            <div className='tw:relative tw:flex tw:gap-4 tw:items-center tw:w-fit'>
                <span className='tw:inline  header-software'>Software</span>
                <button
                    className={twMerge('tw:relative tw:cursor-pointer tw:inline')}
                    onClick={onClick}
                    onMouseEnter={onHover}
                    onMouseLeave={() => setHover(false)}
                >
                    {roles.map(({ name, buttonClassname, iconData, color }, index) => {
                        return (
                            <div
                                key={index}
                                className={twMerge(
                                    `tw:flex tw:items-center tw:gap-2 tw:whitespace-nowrap tw:top-0 tw:left-0 role-${index}`,
                                    active === index ? 'tw:relative tw:z-10' : 'tw:absolute',
                                    buttonClassname
                                )}
                            >
                                <span className={`role-name-${index}`}>{name}</span>
                                <LordIcon
                                    ref={(el) => (iconsPlayers.current[index] = el)}
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
                        );
                    })}
                </button>
            </div>
        </div>
    );
}

/*
<a href="https://lordicon.com/">Icons by Lordicon.com</a>
*/
