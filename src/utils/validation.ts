import { FormErrors, SignUpFormData, LoginFormData } from '../types'

export const validateName = (name: string): string | null => {
  if (!name.trim()) {
    return 'Name is required'
  }
  if (!/^[A-Za-z\s]+$/.test(name)) {
    return 'Name must contain only alphabets and spaces'
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters long'
  }
  return null
}

export const validateUsername = (username: string): string | null => {
  if (!username.trim()) {
    return 'Username is required'
  }
  if (!/^[A-Za-z0-9_-]+$/.test(username)) {
    return 'Username can only contain letters, numbers, underscores, and hyphens'
  }
  if (username.length < 3) {
    return 'Username must be at least 3 characters long'
  }
  if (username.length > 20) {
    return 'Username must be at most 20 characters long'
  }
  return null
}

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return 'Email is required'
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address'
  }
  return null
}

export const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) {
    return 'Phone number is required'
  }
  const phoneRegex = /^\+[1-9]\d{1,14}$/
  if (!phoneRegex.test(phone)) {
    return 'Please enter a valid phone number with country code (e.g., +1234567890)'
  }
  return null
}

export const validatePassword = (password: string, username?: string): string | null => {
  if (!password) {
    return 'Password is required'
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters long'
  }
  if (!/^[A-Za-z0-9@#$%^&+=!]*$/.test(password)) {
    return 'Password can only contain letters, numbers, and special characters (@#$%^&+=!)'
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return 'Password must contain at least one lowercase letter'
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return 'Password must contain at least one uppercase letter'
  }
  if (!/(?=.*\d)/.test(password)) {
    return 'Password must contain at least one number'
  }
  if (username && password.toLowerCase().includes(username.toLowerCase())) {
    return 'Password cannot contain your username'
  }
  return null
}

export const validateConfirmPassword = (confirmPassword: string, password: string): string | null => {
  if (!confirmPassword) {
    return 'Please confirm your password'
  }
  if (confirmPassword !== password) {
    return 'Passwords do not match'
  }
  return null
}

export const validateLoginForm = (formData: LoginFormData): FormErrors => {
  const errors: FormErrors = {}
  
  const usernameError = validateUsername(formData.username)
  if (usernameError) errors.username = usernameError
  
  if (!formData.password) {
    errors.password = 'Password is required'
  }
  
  return errors
}

export const validateSignUpForm = (formData: SignUpFormData): FormErrors => {
  const errors: FormErrors = {}
  
  const nameError = validateName(formData.name)
  if (nameError) errors.name = nameError
  
  const usernameError = validateUsername(formData.username)
  if (usernameError) errors.username = usernameError
  
  const emailError = validateEmail(formData.email)
  if (emailError) errors.email = emailError
  
  const phoneError = validatePhone(formData.phone)
  if (phoneError) errors.phone = phoneError
  
  const passwordError = validatePassword(formData.password, formData.username)
  if (passwordError) errors.password = passwordError
  
  const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password)
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError
  
  return errors
}

export const hasFormErrors = (errors: FormErrors): boolean => {
  return Object.keys(errors).length > 0
}