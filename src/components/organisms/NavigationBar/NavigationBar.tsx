import './NavigationBar.css';
import githubIcon from '../../../media/github-icon.png';
import linkedinIcon from '../../../media/linkedin-icon.png';
import Glitcher from '../../atoms/GlitcherHOC';
import cvIcon from '../../../media/cv-icon.png';

const NavigationBar = () => {
  return (
    <div className='navigation-bar'>
      <a
        className={'home navigation-bar__link'}
        href='https://docs.google.com/document/d/11ek2gR7W66aMLip-v5xD30T5KiThzfrACdcjJupOInk/edit?usp=sharing'
        target='_blank'
        rel='noopener noreferrer'
        title='CV'
      >
        <img src={cvIcon} />
        <Glitcher text='CV' colorIntensity={0.3} intensity={1} />
      </a>
      <a
        href='https://github.com/le4onardo'
        className='navigation-bar__link'
        rel='noopener noreferrer'
        target='_blank'
        title='GitHub'
      >
        <img src={githubIcon} />
        <Glitcher text='Github' colorIntensity={0.3} intensity={1} />
      </a>
      <a
        href='https://www.linkedin.com/in/leonardo-julio-rios-aliaga-017687122'
        className='navigation-bar__link'
        rel='noopener noreferrer'
        target='_blank'
        title='Linked In'
      >
        <img src={linkedinIcon} />
        <Glitcher text='LinkedIn' colorIntensity={0.3} intensity={1} />
      </a>
    </div>
  );
};

export default NavigationBar;
