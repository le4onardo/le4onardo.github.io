import { useRef, useEffect, HTMLAttributes } from 'react';
import './Glitcher.css';

interface Props extends HTMLAttributes<HTMLElement> {
  text: React.ReactNode;
  classProps?: string;
  intensity?: number;
  colorIntensity?: number;
}

const Glitcher: React.FC<Props> = ({
  text,
  classProps,
  intensity = 0.5,
  colorIntensity = 0.5,
  ...props
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current!.style.setProperty('--seed', intensity + '');
      ref.current!.style.setProperty('--red-seed', colorIntensity + '');
      ref.current!.style.setProperty('--green-seed', colorIntensity + '');
      ref.current!.style.setProperty('--blue-seed', colorIntensity + '');
    }
  }, [intensity, colorIntensity]);

  return (
    <div
      data-text={text}
      className={'glitch ' + classProps}
      ref={ref}
      {...props}
    >
      {text}
    </div>
  );
};

export default Glitcher;
