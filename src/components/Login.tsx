import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { RootState, AppDispatch } from '../store/store'
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice'
import { validateLoginForm, hasFormErrors } from '../utils/validation'
import { LoginFormData, FormErrors } from '../types'
import Input from './Input'

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const location = useLocation()
  const { isLoading } = useSelector((state: RootState) => state.auth)

  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [loginError, setLoginError] = useState<string>('')

  // Check for success message from sign-up
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message)
      // Clear message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000)
    }
  }, [location.state])


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    
    setTouchedFields(prev => ({
      ...prev,
      [name]: true,
    }))

    if (touchedFields[name] || errors[name]) {
      const fieldErrors = validateLoginForm({ ...formData, [name]: value })
      setErrors(prev => ({
        ...prev,
        [name]: fieldErrors[name] || '',
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationErrors = validateLoginForm(formData)
    setErrors(validationErrors)
    setLoginError('')
    
    if (hasFormErrors(validationErrors)) {
      return
    }

    dispatch(loginStart())
    
    setTimeout(() => {
      if (formData.username && formData.password) {
        // Simple success case - any non-empty username/password works for demo
        dispatch(loginSuccess({
          name: 'Demo User',
          username: formData.username,
          email: 'user@example.com',
        }))
        
        // Show success message
        alert(`Welcome ${formData.username}! Login successful.`)
        setLoginError('')
      } else {
        dispatch(loginFailure())
        setLoginError('Please enter both username and password.')
      }
    }, 1000)
  }


  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#B8D4D1' }}>
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl">
        {/* Header */}
        <div className="bg-teal-700 text-white text-center py-4 sm:py-6 rounded-t-lg">
          <h1 className="text-xl sm:text-2xl font-light">Login</h1>
          <p className="text-teal-100 mt-1 sm:mt-2 font-light text-sm sm:text-base">Sign in to continue</p>
        </div>
        
        {/* Form */}
        <div className="bg-white px-6 sm:px-8 md:px-12 py-12 sm:py-16 rounded-b-lg shadow-lg">
          {successMessage && (
            <div className="mb-6 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-sm">
              {successMessage}
            </div>
          )}
          
          {loginError && (
            <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
              {loginError}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="max-w-xs sm:max-w-sm mx-auto space-y-6 sm:space-y-8">
              <Input
                label="Username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                error={errors.username}
                placeholder=""
                required
              />
              
              <Input
                label="New Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                placeholder=""
                required
              />
            </div>

            <div className="mt-8 sm:mt-12 flex flex-col items-center space-y-4 sm:space-y-6">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-8 sm:px-12 py-2.5 sm:py-3 rounded-full text-white font-medium transition-all duration-200 focus:outline-none text-sm sm:text-base ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-teal-700 hover:bg-teal-800'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'LOGIN'
                )}
              </button>
              
              <p className="text-gray-600 text-sm">
                Don't have Account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="text-teal-700 hover:text-teal-800 underline font-medium"
                >
                  SignUp
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login