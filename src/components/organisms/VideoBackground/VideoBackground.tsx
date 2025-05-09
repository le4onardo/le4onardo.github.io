import { useEffect, useRef } from "react";

interface Props {
    className?: string;
    autoPlay?: boolean;
    muted?: boolean;
}


export const VideoBackground = ({ className }: Props) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const inertiaX = useRef(0);
    const inertiaEpsilon = useRef(0);
    const queue = useRef<number[]>([]);

    useEffect(() => {
        let id = setInterval(() => {
            if (!inertiaEpsilon.current) return;
            if (!videoRef.current) return;

            let time = videoRef.current.currentTime + inertiaEpsilon.current;
            if (time > videoRef.current.duration)
                time = time - videoRef.current.duration;
            else if (time < 0)
                time = videoRef.current.duration + time;
            videoRef.current.currentTime = time;


            if (Math.abs(inertiaEpsilon.current) < 0.05) {
                inertiaEpsilon.current = 0;
                console.log('epsilon 0');
            }
            else {
                inertiaEpsilon.current = inertiaEpsilon.current * 0.95;
            }
            console.log('interia ticker', videoRef.current.currentTime);

        }, 33);
        return () => clearInterval(id);
    }, []);

    const onMouseDown = (e: React.MouseEvent) => {
        inertiaX.current = e.clientX;
    }
    const onMouseMove = async (e: React.MouseEvent) => {
        if (inertiaX.current === 0) return;
        const delta = inertiaX.current - e.clientX;
        // queue.current = queue.current.concat(Array(Math.round(Math.abs(delta))).fill(delta < 0 ? -0.0333 : 0.0333));
        console.log(inertiaX.current, e.clientX, queue.current.length);

        inertiaEpsilon.current += delta;
        inertiaEpsilon.current = Math.max(Math.min(inertiaEpsilon.current, 0.75), -0.75);
        inertiaX.current = e.clientX;
    }

    const onMouseUp = (e: React.MouseEvent) => {
        inertiaX.current = 0;
    }
    return <div className={className}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseOut={onMouseUp}
    >
        <video
            ref={videoRef}
            src={
                // 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/HD_blackhole_keyframe_1.mp4'
                // 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Glasshouse+Study+Room+with+Forest+view+and+Large+Windows+-+Rain+Sounds+for+Focus+and+Relaxation.mov'
                // 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/HD+Black+hole.mp4'
                // 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Circular_clouds_and_moon.mp4'
                // 'https://le4onardo.github.io/backgrounds/Nebula_Motion.mp4'
                'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/TEST_blue_galaxy_loop_watermarked_keyframe_1.mp4'
            }
            autoPlay={true}
            muted={true}
            loop={true}
            controls={false}
        />
        <div className='tw:absolute tw:top-0 tw:w-full tw:h-1/5 tw:bg-linear-[to_bottom,rgba(0,0,0,1),rgba(0,0,0,0)]' />
        <div className='tw:absolute tw:top-0 tw:right-0 tw:h-full tw:w-1/5 tw:bg-linear-[to_left,rgba(0,0,0,1),rgba(0,0,0,0)]' />
        <div className='tw:absolute tw:bottom-0 tw:w-full tw:h-1/5 tw:bg-linear-[to_top,rgba(0,0,0,1),rgba(0,0,0,0)]' />
        <div className='tw:absolute tw:top-0 tw:left-0 tw:h-full tw:w-1/5 tw:bg-linear-[to_right,rgba(0,0,0,1),rgba(0,0,0,0)]' />
    </div>
}