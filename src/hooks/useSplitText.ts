import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";


export default function useSplitText(target: gsap.DOMTarget, vars: SplitText.Vars) {
    const splitTextObj = useRef<SplitText>();
    useGSAP(() => {
        if (target) {
            splitTextObj.current = SplitText.create(target, vars);
        }
        return () => {
            splitTextObj.current?.revert()
        };
    }, [target]);

    return splitTextObj;
}