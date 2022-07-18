import './NavigationBar.css';

const NavigationBar = () => {
  return (
    <div className='navigation-bar'>
      <a className={'home'} href='/'>
        Home
      </a>
      <a href='/portfolio'>Portfolio</a>
      <a href='/experience'>Experience</a>
      <a href='/about'>About me</a>
      <a href='/blog'>Blog</a>
    </div>
  );
};

export default NavigationBar;
