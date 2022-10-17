import React from 'react';
// import { Counter } from './features/counter/Counter';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import StartGame from './components/StartGame/startGame';
import TablePlayer from './components/TablePlayer/tablePlayer';
import GamePlay from './components/GamePlay/gamePlay';
import History from './components/History/history';
import GameResult from './components/GameResult/gameResult';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<StartGame />} />
            <Route path="/list-players" element={<TablePlayer />} />
            <Route path="/game-play" element={<GamePlay />} />
            <Route path="/history" element={<History />} />
            <Route path="/game-result" element={<GameResult />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
