import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Landing } from './screens/landing';
import { Game } from './screens/chess';

function App() {
  return (
    <div className="h-screen w-screen bg-slate-900 overflow-hidden m-0 p-0 fixed top-0 left-0">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/chess" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
