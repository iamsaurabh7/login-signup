import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import ErrorBoundary from './components/ErrorBoundary'
import Login from './components/Login'
import SignUp from './components/SignUp'

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </Router>
      </ErrorBoundary>
    </Provider>
  )
}

export default App