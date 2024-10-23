import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import useFetchUser from './hooks/useFetchUser';
import './App.css';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Summary from './components/Admin/Summary';
import Departments from './components/Admin/Departments';
import ProtectedRoute from './utils/ProtectedRoute';
import AddDepartment from './components/Admin/AddDepartment';
import Employees from './components/Admin/Employees';
import AddEmployee from './components/Admin/AddEmployee';
import EditEmployee from './components/Admin/EditEmployee';

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
        {/* Root Route: Redirect to dashboard or login based on user */}
        <Route
          path="/"
          element={user ? <Navigate to={getDashboardRoute()} replace /> : <Navigate to="/login" replace />}
        />

        {/* Admin Dashboard Routes */}
        <Route
          path="/admin-dashboard/*"
          element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}
        >
          <Route index element={<Summary />} />
          <Route path="departments" element={<Departments />} />
          <Route path="employees" element={<Employees />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="add-employee" element={<AddEmployee />} />
         
        </Route>

        {/* Employee Dashboard Route */}
        <Route
          path="/employee-dashboard"
          element={<ProtectedRoute role="employee"><EmployeeDashboard /></ProtectedRoute>}
        />

        {/* Login Route */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};




export default App;
