// import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Demo1 from './pages/demo1/demo1';
import TeapotDemo from './pages/demo2/demo2';

function App() {
  return (
    <BrowserRouter basename='/simple-three-js-demo'>
      <div className="App">
        <nav>
          <Link to="/demo1">Demo 1</Link> | 
          <Link to="/demo2">Teapot</Link>
        </nav>
        <Routes>
          <Route path="/demo1" element={<Demo1 />} />
          <Route path="/demo2" element={<TeapotDemo />} />
          <Route path="/" element={<TeapotDemo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
