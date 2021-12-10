import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// css
import './App.css'

// components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Create from './pages/create/Create';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Project from './pages/project/Project';
import Signup from './pages/signup/Signup';
import OnlineUsers from './components/OnlineUsers';
import NotFound404 from './pages/NotFound404/NotFound404';


function App() {

  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      { authIsReady && (
        <BrowserRouter>
          { user && <Sidebar /> }
          
          <div className="container">
            <Navbar />
            <Routes>
              <Route 
                path="/" 
                element={!user ? <Navigate to="/login" /> : <Dashboard />}
              />
              <Route 
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />} 
              />
              <Route 
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />} 
              />
              <Route 
                path="/create"
                element={user ? <Create /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/projects/:id"
                element={user ? <Project /> : <Navigate to="/login" />} 
              />
              <Route 
                path="*"
                element={<NotFound404 /> }
              />
            </Routes>
          </div>

          { user && <OnlineUsers /> }
        </BrowserRouter>
      )}
    </div>
  );
}

export default App
