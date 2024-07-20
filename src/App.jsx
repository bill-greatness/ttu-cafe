import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
