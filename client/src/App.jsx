import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetchUser from './hooks/useFetchUser';
import PrivateRoute from './utils/PrivateRoute';

const App = () => {
  useFetchUser();

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
             
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
