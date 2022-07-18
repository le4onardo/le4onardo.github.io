import PixiBackground from '../../organisms/PixiBackground/PixiBackground';
import NavigationBar from '../../organisms/NavigationBar/NavigationBar';
import './MainLayout.css';

interface Props {
  children: React.ReactNode;
  classProps: string;
}

const MainLayout: React.FC<Props> = ({ children, classProps }: Props) => {
  return (
    <div className={`main-layout ${classProps}`}>
      <PixiBackground />
      <div className={'main-layout-container'}>
        <NavigationBar />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
