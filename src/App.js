import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {CreateRoom} from './components/CreateRoom'
import { Home } from './components/Home';
import { JoinRoom } from './components/JoinRoom';


function App() {
  return (
    <div className="App">
      {/* <h1>hello</h1> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={< Home />} />
          <Route path='/nfrub84rfn' element={< CreateRoom />} />
          <Route path='/fnrgjn484' element={< JoinRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export { App};
