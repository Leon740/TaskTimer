import React from 'react';
import Main from './components/Main/Main';
import ErrorBoundary from './components/opt/ErrorBoundary';
import Loader from './components/opt/Loader';
import './App.scss';

function App() {
  return (
    <React.StrictMode>
      <div className="min-h-screen flex bg-neutral-900 text-white">
        <ErrorBoundary>
          <Loader>
            <Main />
          </Loader>
        </ErrorBoundary>
      </div>
    </React.StrictMode>
  );
}
export default App;
