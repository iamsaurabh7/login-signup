export interface LoginFormData {
  username: string
  password: string
}

export interface SignUpFormData {
  name: string
  username: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export interface FormErrors {
  [key: string]: string
}

export interface AuthState {
  user: {
    name: string
    username: string
    email: string
  } | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string, formData?: any) => string | null
}

export interface InputProps {
  label: string
  type: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  placeholder?: string
  required?: boolean
}