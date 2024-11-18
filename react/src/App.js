import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import  Checkout  from './Pages/Checkout'
import { Home } from './Pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  )
}
export default App;