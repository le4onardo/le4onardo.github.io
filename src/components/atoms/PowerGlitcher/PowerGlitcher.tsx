import { useRef, useCallback, useEffect } from 'react';
import { useGlitch, } from 'react-powerglitch';
import { PowerGlitchOptions, RecursivePartial, PlayModes } from 'powerglitch'
import './PowerGlitcher.css';

interface Props {
    // -- PowerGlitch props
    playMode?: PlayModes
    duration?: number | undefined
    iterations?: number | undefined
    timeStart?: number | undefined
    timeEnd?: number | undefined
    // -- 

    classProps?: string;
    children: React.ReactNode;
}

// TODO: make new glitch props update the glitcher
const GlitcherHOC: React.FC<Props> = ({
    playMode,
    duration,
    iterations,
    timeStart,
    timeEnd,

    classProps = '',
    children
}: Props) => {
    const ref = useRef<HTMLElement>();
    const glitch = useGlitch({
        createContainers: true,
        playMode: playMode || "hover",
        hideOverflow: false,
        timing: {
            duration: duration || 150,
            iterations: iterations || 1,
        },
        glitchTimeSpan: {
            start: timeStart || 0,
            end: timeEnd || 1
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
    });
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
            if (i % 3 === 0) el.style.setProperty('color', 'red', 'important');
            if (i % 3 === 1) el.style.setProperty('color', 'green', 'important');
            if (i % 3 === 2) el.style.setProperty('color', 'blue', 'important');
            el.classList.add('glitch-layer')
        }
    }, [])

    useEffect(() => {
        const glitchContainer = ref.current!.parentElement!.parentElement
        glitchContainer && classProps && glitchContainer.classList.add(classProps)

        return () => {
            glitchContainer && classProps && glitchContainer.classList.remove(classProps);
        }
    }, [classProps])

    return (
        <div ref={refCallback}>
            {children}
        </div >
    );
};

export default GlitcherHOC;
