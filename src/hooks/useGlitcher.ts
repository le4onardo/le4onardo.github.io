import { useCallback, useState } from 'react';
import { useGlitch } from 'react-powerglitch';
import { PowerGlitchOptions, RecursivePartial, mergeOptions } from 'powerglitch'


const useGlitcher = (options: RecursivePartial<PowerGlitchOptions> & {
    colors?: string[],
} = {}) => {
    const [glitchOptions, setOptions] = useState(options);
    const glitch = useGlitch(mergeOptions({
        createContainers: false,
        playMode: "hover",
        hideOverflow: false,
        timing: {
            duration: 350,
            iterations: 1,
            easing: 'linear',
        },

        glitchTimeSpan: {
            start: 0,
            end: 1
        },

        shake: {
            velocity: 20,
            amplitudeX: 0.10,
            amplitudeY: 0.05
        },
        slice: {
            count: 4,
            velocity: 30,
            minHeight: 0.1,
            maxHeight: 0.6,
            hueRotate: true
        },
        pulse: false,
    }, glitchOptions));

    const ref = useCallback((node: HTMLElement | null) => {
        if (!node) {
            return;
        }
        const colors = glitchOptions?.colors?.length ? glitchOptions?.colors : ['red', 'green', 'blue', 'inherit'];
        glitch.ref(node);
        // Must be placed after glitch.ref because it changes parent and adds children
        const glitchElements = node.children

        // Omitting 0 because is the actual react element displayed on screen
        for (let i = 1; i < glitchElements.length; i++) {
            const el = glitchElements[i] as HTMLElement;
            el.style.setProperty('color', colors[(i - 1) % colors.length], 'important');
            el.classList.add('glitch-layer');
        }
    }, [glitchOptions])

    return {
        ...glitch,
        setOptions,
        ref
    }
}

export default useGlitcher;