import MainLayout from '../../components/templates/MainLayout/MainLayout';
import GlitcherHOC from '../../components/atoms/GlitcherHOC';
import PresentationCard from '../../components/molecules/PresentationCard/PresentationCard';
import Glitcher from 'text-glitcher';
import { cardsData } from '../../utils/data';
import './Home.css';

const Home = () => {
  return (
    <MainLayout classProps='home'>
      <div className='container'>
        <GlitcherHOC
          classProps='container-title'
          text="Just trying to be better..."
          intensity={0.15}
          colorIntensity={0.4}
        />
        <div className='container-description'>
          <p>
            {`Hi, my name is Leonardo and I'm a software developer from Bolivia. Most of the time you can find me on Github or LinkedIn. Currently sharping my backend skills :)`}
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
