import MainLayout from '../../components/templates/MainLayout/MainLayout';
import Glitcher from '../../components/atoms/GlitcherHOC';
import './Home.css';

const Home = () => {
  return (
    <MainLayout classProps='home'>
      <div className='container'>
        <Glitcher
          classProps='container-title'
          text='Welcome, to my place on the web :)'
          intensity={0.2}
          colorIntensity={0.4}
        />
        <div className='container-description'>
          <p>
            {`Hello there, I'm Leonardo and I'm a software developer from Bolivia.
            On my spare time, I enjoy playing with my cat, tasting or cooking
            new food and watching memes.`}
          </p>
          <p>
            {`I hope you like this website, I spend a lot of time trying to make
            it look pretty for you <3`}
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
