import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText, ScrollTrigger);

/** 
 *  Common effects
*/
gsap.registerEffect({
    name: 'fadeIn',
    effect: (targets: gsap.TweenTarget, config?: { from?: gsap.TweenVars, to?: gsap.TweenVars }) => {
        return gsap.fromTo(targets, {
            opacity: 0,
            filter: 'blur(10px)',
            ...config?.from
        }, {
            duration: 0.5,
            stagger: 0.03,
            filter: 'blur(0px)',
            scale: 1,
            opacity: 1,
            ...config?.to
        })
    },
    extendTimeline: true
});

gsap.registerEffect({
    name: 'fadeOut',
    effect: (targets: gsap.TweenTarget, config?: { from?: gsap.TweenVars, to?: gsap.TweenVars }) => {
        return gsap.fromTo(targets, {
            opacity: 1,
            filter: 'blur(0px)',
            ...config?.from
        }, {
            opacity: 0,
            filter: 'blur(10px)',
            scale: 5,
            duration: 0.3,
            color: '#000000',
            ...config?.to
        })
    },
    extendTimeline: true
});