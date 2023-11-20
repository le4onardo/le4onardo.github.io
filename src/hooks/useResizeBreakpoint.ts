import { useEffect, useState } from "react";

export const useResizeBreakpoint = (breakpoint: number) => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < breakpoint);
    useEffect(() => {
        const onResize = (_e?: Event) => {
            setIsMobile(window.innerWidth < breakpoint);
        }
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, []);
    return isMobile;
}