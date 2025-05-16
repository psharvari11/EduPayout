
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Homepage';
import Signup from './pages/Signup';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/mentor" element={<ProtectedRoute role="mentor"><MentorDashboard /></ProtectedRoute>} /> */}
      </Routes>
    </Router>
  );
}

export default App;