import MainLayout from '../../components/templates/MainLayout/MainLayout';
import Glitcher from '../../components/atoms/GlitcherHOC';
import './Home.css';

const Home = () => {
  return (
    <MainLayout classProps='home'>
      <div className='container'>
        <Glitcher
          classProps='container-title'
          text='Welcome, to my little place on the web'
          intensity={0.15}
          colorIntensity={0.4}
        />
        <div className='container-description'>
          <p>
            {`Hello there, I'm Leonardo and I'm a software developer from Bolivia.
            Currently pursuing new challenges and opportunites. My main areas of interest are machine learning and web development.`}
          </p>
          <p>
            {`I hope you like this website, I spend a good amount of time trying to make
            it look pretty for you :)`}
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
