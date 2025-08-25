import React, { useState } from 'react'
import { InputProps } from '../types'

const Input: React.FC<InputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  placeholder,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPasswordField = type === 'password'
  const inputType = isPasswordField && showPassword ? 'text' : type

  return (
    <div className="mb-6 sm:mb-8 relative">
      <div className="relative">
        <input
          id={name}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-0 py-2.5 sm:py-3 bg-transparent border-0 border-b-2 focus:outline-none focus:ring-0 transition-colors duration-200 text-gray-700 placeholder-gray-400 text-sm sm:text-base ${
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-teal-600'
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        {isPasswordField && (
          <button
            type="button"
            className="absolute right-0 top-2.5 sm:top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showPassword ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L8.464 8.464M9.878 9.878l-.5.5m0-5.5A6 6 0 1017.5 7.5a6 6 0 00-11 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              )}
            </svg>
          </button>
        )}
      </div>
      <label 
        htmlFor={name} 
        className={`absolute left-0 transition-all duration-200 pointer-events-none ${
          value 
            ? '-top-1.5 sm:-top-2 text-xs text-teal-600 font-medium' 
            : 'top-2.5 sm:top-3 text-xs sm:text-sm text-gray-400'
        }`}
      >
        {label.toUpperCase()}
      </label>
      {error && (
        <p 
          id={`${name}-error`} 
          className="mt-1 text-xs sm:text-sm text-red-600" 
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export default Input