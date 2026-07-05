
import { Route, Routes, useLocation } from 'react-router-dom'
// import LandingPage from './pages/LandingPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import AuthPage from './pages/AuthPage.jsx'
import EntriesPage from './pages/EntriesPage.jsx'
import Navbar from './components/Navbar.jsx' 
import Topbar from './components/topbar.jsx'
import AuthProvider from './context/AuthContext.jsx'
import './App.css'

function App() {
  const location = useLocation();

  const hideTopNavbar = ['/', '/auth'].includes(location.pathname);
  
  // const [login, setLogin] = useState(false);

  return (
  <AuthProvider>
      <div className="App">
        {hideTopNavbar ? 
        (
          <Routes>
						<Route path='/' element={<AuthPage />} />
						<Route path='/auth' element={<AuthPage />} />
					</Routes>
         ):(
        <div style={{ display: "flex" }}>
          <Navbar />
          <div style={{ flex: 1 }}>
            <Topbar />
            <Routes> 
              <Route path='/dashboard' element={<DashboardPage />} />
              <Route path='/entries' element={<EntriesPage />} />
            </Routes>
          </div>
        </div>
        )}
      </div>
  </AuthProvider>
  )
}

export default App
