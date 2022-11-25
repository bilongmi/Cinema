import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';

import MovieInfos from './pages/MovieInfos.js';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="movieinfos/:id" element={<MovieInfos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;