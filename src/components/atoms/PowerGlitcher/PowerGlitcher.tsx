import { useRef, useCallback, useEffect } from 'react';
import { useGlitch, } from 'react-powerglitch';
import { PowerGlitchOptions, PlayModes } from 'powerglitch'
import './PowerGlitcher.css';

interface PowerGlitchProps {
    playMode?: PlayModes
    duration?: number | undefined
    iterations?: number | undefined
    timeStart?: number | undefined
    timeEnd?: number | undefined
}
interface Props extends PowerGlitchProps {
    classProps?: string;
    colors?: string[];
    children: React.ReactNode;
}

const getDefaultProps = (props: PowerGlitchProps): PowerGlitchOptions => ({
    createContainers: true,
    playMode: props.playMode || "hover",
    hideOverflow: false,
    timing: {
        duration: props.duration || 150,
        iterations: props.iterations || 1,
        easing: 'linear',
    },

    glitchTimeSpan: {
        start: props.timeStart || 0,
        end: props.timeEnd || 1
    },

    shake: {
        velocity: 20,
        amplitudeX: 0.10,
        amplitudeY: 0.05
    },
    slice: {
        count: 3,
        velocity: 30,
        minHeight: 0.1,
        maxHeight: 0.6,
        hueRotate: true
    },
    pulse: false,
})

// TODO: make new glitch props update the glitcher
const GlitcherHOC: React.FC<Props> = ({
    playMode,
    duration,
    iterations,
    timeStart,
    timeEnd,
    classProps = '',
    colors = ['red', 'green', 'blue'],
    children
}: Props) => {
    const ref = useRef<HTMLElement>();
    const glitch = useGlitch(
        getDefaultProps({
            playMode,
            duration,
            iterations,
            timeStart,
            timeEnd
        })
    );

    const refCallback = useCallback((node: HTMLElement | null) => {
        if (!node) {
            return;
        }
        ref.current = node;
        glitch.ref(node);
        // Must be placed after glitch.ref because it changes parent and adds children
        const glitchElements = node.parentElement!.children

        // Omitting 0 because is the actual react element displayed on screen
        for (let i = 1; i < glitchElements.length; i++) {
            const el = glitchElements[i] as HTMLElement;
            el.style.setProperty('color', colors[i % colors.length], 'important');
            el.classList.add('glitch-layer');
        }
    }, [glitch?.ref])

    useEffect(() => {
        const glitchContainer = ref.current?.parentElement?.parentElement
        glitchContainer && classProps && glitchContainer.classList.add(classProps)

        return () => {
            glitchContainer && classProps && glitchContainer.classList.remove(classProps);
        }
    }, [classProps])

    useEffect(() => {
        glitch.setOptions(getDefaultProps({
            playMode, duration, iterations, timeStart, timeEnd
        }));
    }, [playMode,
        duration,
        iterations,
        timeStart,
        timeEnd])

    return (
        <div ref={refCallback}>
            {children}
        </div >
    );
};

export default GlitcherHOC;



