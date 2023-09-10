import './NavigationBar.css';
import githubIcon from '../../../media/github-icon.png';
import linkedinIcon from '../../../media/linkedin-icon.png';
import cvIcon from '../../../media/new-cv-icon.png';
import PowerGlitcher from '../../atoms/PowerGlitcher/PowerGlitcher';

const NavigationBar = () => {
  return (
    <div className='navigation-bar'>
      <PowerGlitcher>
        <a
          className={'home navigation-bar__link'}
          href='https://docs.google.com/document/d/11ek2gR7W66aMLip-v5xD30T5KiThzfrACdcjJupOInk/edit?usp=sharing'
          target='_blank'
          rel='noopener noreferrer'
          title='CV'
        >
          <img src={cvIcon} />
          <div>CV</div>
        </a>
      </PowerGlitcher>
      <PowerGlitcher>
        <a
          href='https://github.com/le4onardo'
          className='github navigation-bar__link'
          rel='noopener noreferrer'
          target='_blank'
          title='GitHub'
        >
          <img src={githubIcon} />
          <div>Github</div>
        </a>
      </PowerGlitcher>
      <PowerGlitcher>
        <a
          href='https://www.linkedin.com/in/leonardo-julio-rios-aliaga-017687122'
          className='linkedin navigation-bar__link'
          rel='noopener noreferrer'
          target='_blank'
          title='Linked In'
        >
          <img src={linkedinIcon} />
          <div>LinkedIn</div>
        </a>
      </PowerGlitcher>
    </div>
  );
};

export default NavigationBar;
