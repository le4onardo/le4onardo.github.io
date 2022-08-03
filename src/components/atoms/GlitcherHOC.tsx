import { useState } from 'react';
import Glitcher from './Glitcher';
interface Props {
  text: React.ReactNode;
  classProps?: string;
  intensity?: number;
  colorIntensity?: number;
}

const GlitcherHOC: React.FC<Props> = ({
  text,
  classProps,
  intensity = 0.5,
  colorIntensity = 0.5
}: Props) => {
  const [state, setIntensity] = useState(0);
  const [colorState, setColorIntensity] = useState(0);

  return (
    <Glitcher
      text={text}
      onMouseOver={() => {
        setIntensity(intensity);
        setColorIntensity(colorIntensity);
      }}
      onMouseOut={() => {
        setIntensity(0);
        setColorIntensity(0);
      }}
      intensity={state}
      colorIntensity={colorState}
      classProps={classProps}
    />
  );
};

export default GlitcherHOC;
