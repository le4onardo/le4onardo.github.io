import MainLayout from '../../components/templates/MainLayout/MainLayout';
import Glitcher from '../../components/atoms/GlitcherHOC';
import './Home.css';

const Home = () => {
  return (
    <MainLayout classProps='home'>
      <div className='container'>
        <Glitcher
          classProps='container-title'
          text='Welcome, to my little place on the web :)'
          intensity={0.5}
          colorIntensity={0.4}
        />
        <p className='container-description'>
          This is supossed to be a large description, something about me I
          guess, lets just prin dummy chars: sldgijls lsdfj sld sdkjf lsdk This
          is supossed to be a large description, something about me I guess,
          lets just prin dummy chars: sldgijls lsdfj sld sdkjf lsdk This is
        </p>
      </div>
    </MainLayout>
  );
};

export default Home;
