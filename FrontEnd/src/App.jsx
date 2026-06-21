
import { Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage.jsx'
import AuthPage from './pages/AuthPage.jsx'
import CategoriesPage from './pages/CategoriesPage.jsx'
import EntriesPage from './pages/EntriesPage.jsx'
import MembersPage from './pages/MembersPage.jsx'
import Navbar from './components/Navbar.jsx' 
import Topbar from './components/topbar.jsx'
import './App.css'

function App() {
  
  // const [login, setLogin] = useState(false);

  return (
  <div className="App">
    <div style={{ display: "flex" }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Topbar />
        <Routes> 
          <Route path='/' element={<DashboardPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/categories' element={<CategoriesPage />} />
          <Route path='/entries' element={<EntriesPage />} />
          <Route path='/members' element={<MembersPage />} />
        </Routes>
      </div>
    </div>
  </div>
  )
}

export default App
