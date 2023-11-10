import { AboutUs } from 'components/AboutUs/AboutUs';
import { Header } from 'components/Main/Header';
import Forms from 'components/Form/Forms';
import Main from 'components/Main/Main';
import NotFound from 'components/NotFound';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SinglePage from 'components/Main/SinglePage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/form" element={<Forms />} />
        <Route path="/inner/:id" element={<SinglePage />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
