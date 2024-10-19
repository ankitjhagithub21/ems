import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoute from './utils/PrivateRoute';
import useFetchUser from './hooks/useFetchUser';
import './App.css';

const App = () => {
  useFetchUser();
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <p>Loading...</p>;

  const getDashboardRoute = () =>
    user?.role === 'admin' ? '/admin-dashboard' : '/employee-dashboard';

  return (
    <BrowserRouter>
      <ToastContainer 
        position="top-center" 
        hideProgressBar 
        autoClose={1000} 
        closeButton={false} 
      />
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to={getDashboardRoute()} replace /> : <Navigate to="/login" replace />} 
        />

        <Route 
          path="/admin-dashboard" 
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/employee-dashboard" 
          element={
            <PrivateRoute role="employee">
              <EmployeeDashboard />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/login" 
          element={user ? <Navigate to="/" replace /> : <Login />} 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
