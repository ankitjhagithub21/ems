import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import "./App.css"
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<Navigate to={"/admin-dashboard"}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App
