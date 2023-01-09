import { AboutUs } from 'components/AboutUs';
import { Header } from 'components/Header';
import Main from 'components/Main/Home';
import NotFound from 'components/NotFound';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
