import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LiveScoreApp } from '../.';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path="/" element={<LiveScoreApp />} />
    </Routes>
      </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
