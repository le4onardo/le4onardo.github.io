import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Home from './pages/Home/Home';
import TestBlog from './pages/blogs/TestBlog/TestBlog.mdx';
import './App.css';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    // Dont inject clustermaps in dev mode
    if (process.env.NODE_ENV === 'development') return;

    if (!document.getElementById("clustrmaps")) {
      const script = document.createElement('script');
      script.type = "text/javascript";
      script.id = "clustrmaps";
      script.src = "//clustrmaps.com/map_v2.js?d=sXdz8ZIhsJ5ZPtDDLAkz6VeGw9_bOrxtadcjCrBK0wQ&cl=ffffff&w=a";
      document.head.appendChild(script);
    }
  }, []);
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
