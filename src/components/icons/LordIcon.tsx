import { ForwardedRef, forwardRef, LegacyRef, RefObject, useEffect, useRef, useState } from 'react';
import { Player } from '@lordicon/react';
import { IPlayerOptions } from '@lordicon/react/dist/interfaces';


export interface LordIconProps extends Omit<IPlayerOptions, "icon"> {
    className?: string
    url: string
    loop?: boolean
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            'lord-icon': any;
        }
    }
}

function LordIcon({ url, loop, className = '', ...props }: LordIconProps, ref: ForwardedRef<Player>) {
    const [iconData, setIconData] = useState<string | null>(null);
    const localRef = useRef<Player | null>();

    useEffect(() => {
        fetch(url).then(
            async res => setIconData(await res.json())
        );
    }, [url]);


    return (
        <div className={className}>
            {
                !!iconData && <Player
                    ref={(el) => {
                        localRef.current = el;
                        typeof ref === 'function' && ref(el)
                    }}
                    icon={iconData}
                    onComplete={() => {
                        loop && localRef?.current?.playFromBeginning()
                    }}
                    {...props}
                />
            }

        </div>
    );
}

export default forwardRef(LordIcon);