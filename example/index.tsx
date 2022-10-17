import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { LiveScoreApp } from '../.';

const App = () => {
  return (
    <div>
      <LiveScoreApp />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
