import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Home from './pages/Home/Home';
import Blog from './pages/Blog/Blog';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:blogTitle' element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
