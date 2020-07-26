import React from 'react';
import Navigation from './components/Navigation'
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";
import './App.css';



function App() {
  return (
    <Router>
      <div className="app">
        <div className="browser">
          <Navigation />
          <div className="viewport">
            <Routes />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
