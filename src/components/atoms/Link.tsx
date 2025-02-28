import useGlitcher from "../../hooks/useGlitcher";
import { twMerge } from 'tailwind-merge';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode
    className?: string,
}

export default function Link({ href, title, children, className = '', target = '_self', rel = 'noopener noreferrer' }: Props) {
    const glitch = useGlitcher();

    return <a
        className={twMerge('flex align-center decoration-transparent transition duration-250 ease-in-out hover:scale-125', className)}
        href={href}
        target={target}
        rel={rel}
        title={title}
        ref={glitch.ref}
    >
        {children}
    </a>
}