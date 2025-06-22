import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './pages/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthRoute } from './routes/AuthRoute';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import DefaultLayout from './layout/DefaultLayout';
import Home from './pages/dashboard/Home';
import Register from './pages/Register';

function App() {

  return (
   <BrowserRouter>
   <Routes>

      <Route path="/" element={<AuthRoute>
      </AuthRoute>} />
  
    <Route path="/login" element={<AuthRoute>
      <Login />
    </AuthRoute>} />
    <Route path="/register" element={<AuthRoute>
      <Register />
    </AuthRoute>} />
    <Route path='/dashboard' element={<ProtectedRoute>
        <DefaultLayout>
          <Home />
        </DefaultLayout>
    </ProtectedRoute>} />
   </Routes>
   <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // or "dark"
      />
   </BrowserRouter>
  )
}

export default App
