import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home';
import ReviewList from './pages/reviewList';
import NavBar from './components/navBar';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/review-list" element={<ReviewList />} />
          <Route exact path="/:id" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
