import MainLayout from '../../components/templates/MainLayout/MainLayout';
import './Home.css';
import useGlitcher from '../../hooks/useGlitcher';
import Skills from '../../components/organisms/Skills/Skills';
import AboutMe from '../../components/organisms/About/About';
import Blogs from '../../components/organisms/Blogs/Blogs';

const Home = () => {
  const { ref } = useGlitcher({
    playMode: 'always',
    timing: { duration: 4000, iterations: Infinity },
    glitchTimeSpan: { start: 0.5, end: 0.8 }
  })
  return (
    <MainLayout classProps='home'>
      <div className='container'>
        <span className='title-container'>
          The journey is the reward...
        </span>
        <div className='container-description'>
          <p>
            {`Hi, I am Leonardo and I'm a software developer from Bolivia. Most of the time you can find me on Github or LinkedIn. Currently sharping my backend skills`}
          </p>
          <div>
            {`Do you like what you see? `}
            <div className='shake-text'>
              <div ref={ref}>
                <span>Shake</span>
              </div>
            </div>
            {` the cursor to travel through the ascii multiverse!`}
          </div>
        </div>
      </div>
      <AboutMe />
      <Skills />
      <Blogs />

    </MainLayout >
  );
};

export default Home;
