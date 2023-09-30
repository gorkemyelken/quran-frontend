import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Turkmence from './components/Turkmence';
import Arapca from './components/Arapca';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage/>}></Route>
        <Route path="/turkmence/:sureId" element={<Turkmence/>}></Route>
        <Route path="/arapca/:sureId" element={<Arapca/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
