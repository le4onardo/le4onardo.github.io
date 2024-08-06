import MainLayout from '../../components/templates/MainLayout/MainLayout';
import PresentationCard from '../../components/molecules/PresentationCard/PresentationCard';
import { cardsData } from '../../utils/data';
import './Home.css';
import useGlitcher from '../../hooks/useGlitcher';

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
