import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Global styles
import './App.css'   // Component specific styles
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={
                        <PrivateRoute>
                            <App />
                        </PrivateRoute>
                    } />
                </Routes>
            </AuthProvider>
        </Router>
    </React.StrictMode>,
)
