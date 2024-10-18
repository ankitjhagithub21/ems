import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import "./App.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeDashboard from './pages/EmployeeDashboard';

const App = () => {
  
  return (
    <BrowserRouter>
    <ToastContainer/>
       <Routes>
        <Route path='/' element={<Navigate to={"/admin-dashboard"}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
        <Route path='/employee-dashboard' element={<EmployeeDashboard/>}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App
