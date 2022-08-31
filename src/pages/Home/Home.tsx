import MainLayout from '../../components/templates/MainLayout/MainLayout';
import Glitcher from '../../components/atoms/GlitcherHOC';
import './Home.css';

const Home = () => {
  return (
    <MainLayout classProps='home'>
      <div className='container'>
        <Glitcher
          classProps='container-title'
          text='"The journey is the reward"'
          intensity={0.15}
          colorIntensity={0.4}
        />
        <div className='container-description'>
          <p>
            {`Hello there, I'm Leonardo and I'm a software developer from Bolivia,
            currently pursuing new challenges and opportunites. My main areas of interest are machine learning and web development.`}
          </p>
          <p>{`Do you like the what you see? 
          Shake the cursor to travel through the ascii multiverse!`}</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
