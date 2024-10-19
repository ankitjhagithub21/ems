import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetchUser from './hooks/useFetchUser';
import PrivateRoute from './utils/PrivateRoute';
import { useSelector } from 'react-redux';

const App = () => {
  useFetchUser();

  const { user,loading } = useSelector((state) => state.auth);

  if(loading){
    return <p>Loading...</p>
  }

  return (
    <BrowserRouter>
      <ToastContainer position='top-center' hideProgressBar= {true} autoClose={1000} closeButton={false}/>
      <Routes>
        {/* Redirect / to the appropriate dashboard if the user exists */}
        <Route
          path="/"
          element={
            user ? (
              user.role === 'admin' ? (
                <Navigate to="/admin-dashboard" replace />
              ) : (
                <Navigate to="/employee-dashboard" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Admin Dashboard Route */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Employee Dashboard Route */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoute role="employee">
              <EmployeeDashboard />
            </PrivateRoute>
          }
        />

        {/* Login Route */}
        <Route path="/login" element={user ? <Navigate to={"/"}/> : <Login/>} />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
