import './NavigationBar.css';
import githubIcon from '../../../media/github-icon.png';
import linkedinIcon from '../../../media/linkedin-icon.png';
import Glitcher from '../../atoms/GlitcherHOC';

const NavigationBar = () => {
  console.log(githubIcon);
  return (
    <div className='navigation-bar'>
      <a className={'home'} href='/'>
        Source Code
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
        href='/experience'
        className='navigation-bar__link experience'
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
