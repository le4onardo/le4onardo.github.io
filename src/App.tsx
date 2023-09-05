import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Home from './pages/Home/Home';
import TestBlog from './pages/blogs/TestBlog/TestBlog.mdx';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:blogTitle' element={<TestBlog name='test' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
