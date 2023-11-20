import MainLayout from '../../components/templates/MainLayout/MainLayout';
import PowerGlitcher from '../../components/atoms/PowerGlitcher/PowerGlitcher';
import PresentationCard from '../../components/molecules/PresentationCard/PresentationCard';
import { cardsData } from '../../utils/data';
import './Home.css';

const Home = () => {
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
            <PowerGlitcher classProps='shake-text' playMode='always' duration={4000} iterations={Infinity} timeStart={0.5} timeEnd={0.75}>
              {'Shake'}
            </PowerGlitcher>
            {` the cursor to travel through the ascii multiverse!`}
          </div>
        </div>
        <div className='cards-container'>
          {
            cardsData.map(({ title, description, writeDate, readTime }) =>
              <PresentationCard
                key={title}
                title={title}
                description={description}
                writeDate={writeDate}
                readTime={readTime}
                redirectTo={title.replaceAll(' ', '_')}
                onClick={() => { console.log('test') }}
              />
            )
          }
        </div>
      </div>
    </MainLayout >
  );
};

export default Home;
