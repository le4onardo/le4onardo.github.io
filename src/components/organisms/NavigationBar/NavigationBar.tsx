import './NavigationBar.css';
import githubIcon from '../../../media/github-icon.png';
import linkedinIcon from '../../../media/linkedin-icon.png';
import cvIcon from '../../../media/new-cv-icon.png';
import useGlitcher from '../../../hooks/useGlitcher';

const NavigationBar = () => {
  const cvGlitch = useGlitcher();
  const githubGlitch = useGlitcher();
  const linkedInGlitch = useGlitcher();

  return (
    <div className='navigation-bar'>
      
      <div ref={cvGlitch.ref}>
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
      </div>
      <div ref={githubGlitch.ref}>
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
      </div>
      <div ref={linkedInGlitch.ref}>
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
      </div>
    </div>
  );
};

export default NavigationBar;
