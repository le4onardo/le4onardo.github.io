import './NavigationBar.css';
import githubIcon from '../../../media/github-icon.png';
import linkedinIcon from '../../../media/linkedin-icon.png';

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
      >
        <img src={githubIcon} /> Portfolio
      </a>
      <a
        href='/experience'
        className='navigation-bar__link experience'
        rel='noopener noreferrer'
        target='_blank'
      >
        <img src={linkedinIcon} />
        Experience
      </a>
    </div>
  );
};

export default NavigationBar;
