
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import DataDashboard from './pages/DataDashboard'
import Navbar from './components/HomeBar'
import Profile from './components/Profile'
import { UserProvider } from './hooks/UseUser'

function App() {
  // console.log("created APp")
  return (
    <div>
      <Router>
        <UserProvider>
        <Navbar />
        <Routes>
          <Route path='/login' Component={Login} />
          <Route path='/home' Component={Home} />
          {/* <Route path='/maindashboard' Component={MainDashboard} /> */}
          <Route path='/data' Component={DataDashboard} />
          <Route path='/profile' Component={Profile} />
        </Routes>
        </UserProvider>
      </Router>
    </div>
  )
}

export default App
