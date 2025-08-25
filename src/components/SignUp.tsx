import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../store/store'
import { signUpSuccess } from '../store/authSlice'
import { validateSignUpForm, hasFormErrors } from '../utils/validation'
import { SignUpFormData, FormErrors } from '../types'
import Input from './Input'

const SignUp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [signUpError, setSignUpError] = useState<string>('')

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
      const fieldErrors = validateSignUpForm({ ...formData, [name]: value })
      setErrors(prev => ({
        ...prev,
        [name]: fieldErrors[name] || '',
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationErrors = validateSignUpForm(formData)
    setErrors(validationErrors)
    setSignUpError('')
    
    if (hasFormErrors(validationErrors)) {
      setTouchedFields({
        name: true,
        username: true,
        email: true,
        phone: true,
        password: true,
        confirmPassword: true,
      })
      return
    }

    setIsSubmitting(true)
    
    setTimeout(() => {
      // Simple success case - all valid forms succeed for demo
      dispatch(signUpSuccess({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
      }))
      
      setIsSubmitting(false)
      navigate('/login', { 
        state: { 
          message: 'Account created successfully! Please sign in with any username/password.' 
        }
      })
    }, 1000)
  }


  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#B8D4D1' }}>
      <div className="w-full max-w-md sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
        {/* Header */}
        <div className="bg-teal-700 text-white text-center py-4 sm:py-6 rounded-t-lg">
          <h1 className="text-xl sm:text-2xl font-light">Create new Account</h1>
        </div>
        
        {/* Form */}
        <div className="bg-white px-6 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 rounded-b-lg shadow-lg">
          {signUpError && (
            <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
              {signUpError}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-4 sm:gap-y-6 lg:gap-y-8 max-w-xs sm:max-w-md lg:max-w-4xl mx-auto">
              {/* Left Column */}
              <div>
                <Input
                  label="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  placeholder=""
                  required
                />
                
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
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
              
              {/* Right Column */}
              <div>
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
                  label="Phone No."
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                  placeholder=""
                  required
                />
                
                <Input
                  label="Confirm New Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                  placeholder=""
                  required
                />
              </div>
            </div>

            <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 sm:px-10 lg:px-12 py-2.5 sm:py-3 rounded-full text-white font-medium transition-all duration-200 focus:outline-none text-sm sm:text-base ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-teal-700 hover:bg-teal-800'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  'SIGN UP'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp