import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Provider, useDispatch, useSelector } from "react-redux"
import { ToastContainer } from 'react-toastify'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import dataReducer from './redux/reducer';
import { ProtectRoute } from './pages/ProtectedRoute'
import { lazy, Suspense, useEffect } from 'react';
import Loader from './components/Loader'
const LazyDashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const LazyLogin = lazy(() => import('./pages/Login'));

export const store = configureStore({
  reducer: dataReducer
});

function App() {
  const loading = useSelector((state: any) => state.loading)

  return (
    <>

      <Provider store={store}>
        <Suspense fallback={<Loader />}>
          <ToastContainer />
          <Router>
            <Routes>
              <Route path="/" element={<LazyLogin />} />
              <Route path="/login" element={<LazyLogin />} />
              <Route path="/dashboard/*" element={<ProtectRoute><LazyDashboard /></ProtectRoute>} />
            </Routes>
          </Router>
        </Suspense>
      </Provider>
    </>
  )
}

export default App
