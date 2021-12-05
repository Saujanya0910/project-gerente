import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// css
import './App.css'
import Navbar from './components/Navbar';
import Create from './pages/create/Create';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Project from './pages/project/Project';
import Signup from './pages/signup/Signup';

// components

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <div className="container">
          <Routes>
            <Route 
              exact
              path="/" 
              element={<Dashboard />}
            />
            <Route 
              path="/signup" 
              element={<Signup />} 
            />
            <Route 
              path="/login" 
              element={<Login />} 
            />
            <Route 
              path="/create" 
              element={<Create />} 
            />
            <Route 
              path="/projects/:id" 
              element={<Project />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App
