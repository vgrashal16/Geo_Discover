import './App.css';
import Homepage from './pages/homepage';
import Detail from './pages/detail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:country" element={<Detail />} />
      </Routes>
    </Router>
  )
}

export default App
