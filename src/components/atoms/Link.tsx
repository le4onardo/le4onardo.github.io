import useGlitcher from "../../hooks/useGlitcher";
import { twMerge } from 'tailwind-merge';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode
    className?: string,
}

export default function Link({ href, title, children, className = '', target = '_self', rel = 'noopener noreferrer' }: Props) {
    const glitch = useGlitcher();

    return <a
        className={twMerge('flex align-center decoration-transparent text-neutral-300 transition duration-400 ease-in-out hover:text-neutral-50', className)}
        href={href}
        target={target}
        rel={rel}
        title={title}
        ref={glitch.ref}
    >
        {children}
    </a>
}