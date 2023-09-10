import { useRef, useCallback } from 'react';
import { useGlitch, } from 'react-powerglitch';
import { PowerGlitchOptions, RecursivePartial } from 'powerglitch'
import './PowerGlitcher.css';

interface Props {
    options?: RecursivePartial<PowerGlitchOptions>
    classProps?: string;
    children: React.ReactNode;
}

const GlitcherHOC: React.FC<Props> = ({
    classProps = '',
    options,
    children
}: Props) => {
    const ref = useRef<HTMLElement>();
    const glitch = useGlitch(options || {
        createContainers: true,
        playMode: "hover",
        hideOverflow: false,
        timing: {
            duration: 5000,
            iterations: Infinity
        },
        glitchTimeSpan: false, // { "start": 0,"end": 1},
        shake: {
            velocity: 20,
            amplitudeX: 0.05,
            amplitudeY: 0.05
        },
        slice: {
            count: 9,
            velocity: 30,
            minHeight: 0.05,
            maxHeight: 0.2,
            hueRotate: true
        },
        pulse: false
    });
    const refCallback = useCallback((node: HTMLElement | null) => {
        if (!node) {
            return;
        }
        ref.current = node;
        glitch.ref(node);
        // Must be placed after glitch.ref because it changes parent and adds children
        const glitchElements = node.parentElement!.children

        // Actual React element displayed on screen
        for (let i = 1; i < glitchElements.length; i++) {
            const el = glitchElements[i] as HTMLElement;
            if (i % 3 === 0) el.style.setProperty('color', 'red', 'important');
            if (i % 3 === 1) el.style.setProperty('color', 'green', 'important');
            if (i % 3 === 2) el.style.setProperty('color', 'blue', 'important');

            el.classList.add('glitch-layer')
        }
        console.log(node.parentElement?.parentElement?.classList);
        classProps && node.parentElement?.parentElement?.classList.add(classProps)

    }, [options, classProps])

    return (
        <div ref={refCallback}>
            {children}
        </div >
    );
};

export default GlitcherHOC;