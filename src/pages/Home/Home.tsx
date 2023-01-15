import MainLayout from '../../components/templates/MainLayout/MainLayout';
import GlitcherHOC from '../../components/atoms/GlitcherHOC';
import Glitcher from 'text-glitcher';
import './Home.css';

const Home = () => {
  return (
    <MainLayout classProps='home'>
      <div className='container'>
        <GlitcherHOC
          classProps='container-title'
          text='"The journey is the reward"'
          intensity={0.15}
          colorIntensity={0.4}
        />
        <div className='container-description'>
          <p>
            {`Hello there, my name is Leonardo and I'm a software developer from Bolivia. I enjoy challenges and to spend too much time on the internet. Most of the time you can find me on github or linkedin
            My main areas of interest are machine learning and web development.`}
          </p>
          <p>
            {'Do you like what you see? '}
            <Glitcher
              classProps='shake-text'
              text='Shake'
              intensity={0.4}
              colorIntensity={0.2}
            />{' '}
            the cursor to travel through the ascii multiverse!
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
