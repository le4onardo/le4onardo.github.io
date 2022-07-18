import MainLayout from '../../components/templates/MainLayout/MainLayout';
import './Home.css';

const Home = () => {
  return (
    <MainLayout classProps='home'>
      <div className='container'>
        <div className='container-title'>
          THIS IS A TITLE, AND SOME MORE TEXT
        </div>
        <p className='container-description'>
          This is supossed to be a large description, something about me I
          guess, lets just prin dummy chars: sldgijls lsdfj sld sdkjf lsdk
        </p>
      </div>
    </MainLayout>
  );
};

export default Home;
