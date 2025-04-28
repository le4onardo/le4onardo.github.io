import { forwardRef, LegacyRef, RefObject, useEffect, useRef, useState } from 'react';
import { Player } from '@lordicon/react';
import { IPlayerOptions } from '@lordicon/react/dist/interfaces';


export interface LordIconProps extends Omit<IPlayerOptions, "icon"> {
    className?: string
    url: string
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            'lord-icon': any;
        }
    }
}

function LordIcon({ url, className = '', ...props }: LordIconProps, ref: LegacyRef<Player>) {
    const [iconData, setIconData] = useState<string | null>(null);

    useEffect(() => {
        fetch(url).then(
            async res => setIconData(await res.json())
        );
    }, [url]);




    return (
        <div className={className}>
            {
                !!iconData && <Player
                    ref={ref}
                    icon={iconData}
                    {...props}
                />
            }

        </div>
    );
}

export default forwardRef(LordIcon);