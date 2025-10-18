'use client'

import { useState } from 'react'
import { ContactFormData, ContactFormErrors, ContactFormState } from '@/types/landing-page'

interface ContactFormProps {
  selectedPackage?: string
  onClose?: () => void
}

export default function ContactForm({ selectedPackage, onClose }: ContactFormProps) {
  const [formState, setFormState] = useState<ContactFormState>({
    data: {
      name: '',
      email: '',
      projectType: '',
      message: '',
      selectedPackage: selectedPackage || '',
      goals: ''
    },
    errors: {},
    isSubmitting: false,
    isSubmitted: false,
    isSuccess: false
  })

  // Project types from the content
  const projectTypes = [
    '׳‘׳׳•׳’׳™׳ ׳׳§׳¦׳•׳¢׳™׳™׳',
    '׳׳×׳¨׳™ ׳—׳‘׳¨׳”',
    '׳₪׳•׳¨׳˜׳₪׳•׳׳™׳• ׳“׳™׳’׳™׳˜׳׳™',
    '׳—׳ ׳•׳™׳•׳× ׳׳•׳ ׳׳™׳™׳',
    '׳׳×׳¨׳™ ׳׳™׳¨׳•׳¢׳™׳',
    '׳₪׳׳˜׳₪׳•׳¨׳׳•׳× ׳—׳™׳ ׳•׳›׳™׳•׳×',
    '׳׳—׳¨'
  ]

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateField = (field: keyof ContactFormData, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return '׳©׳ ׳׳׳ ׳”׳•׳ ׳©׳“׳” ׳—׳•׳‘׳”'
        if (value.trim().length < 2) return '׳©׳ ׳—׳™׳™׳‘ ׳׳”׳›׳™׳ ׳׳₪׳—׳•׳× 2 ׳×׳•׳•׳™׳'
        return undefined
      
      case 'email':
        if (!value.trim()) return '׳›׳×׳•׳‘׳× ׳׳™׳׳™׳™׳ ׳”׳™׳ ׳©׳“׳” ׳—׳•׳‘׳”'
        if (!validateEmail(value)) return '׳›׳×׳•׳‘׳× ׳׳™׳׳™׳™׳ ׳׳ ׳×׳§׳™׳ ׳”'
        return undefined
      
      case 'projectType':
        if (!value) return '׳™׳© ׳׳‘׳—׳•׳¨ ׳¡׳•׳’ ׳₪׳¨׳•׳™׳§׳˜'
        return undefined
      
      case 'message':
        if (!value.trim()) return '׳”׳•׳“׳¢׳” ׳”׳™׳ ׳©׳“׳” ׳—׳•׳‘׳”'
        if (value.trim().length < 10) return '׳”׳•׳“׳¢׳” ׳—׳™׳™׳‘׳× ׳׳”׳›׳™׳ ׳׳₪׳—׳•׳× 10 ׳×׳•׳•׳™׳'
        return undefined
      
      default:
        return undefined
    }
  }

  const validateForm = (): ContactFormErrors => {
    const errors: ContactFormErrors = {}
    
    const fieldsToValidate: (keyof ContactFormData)[] = ['name', 'email', 'projectType', 'message']
    
    fieldsToValidate.forEach((field) => {
      const value = formState.data[field]
      if (value !== undefined) {
        const error = validateField(field, value)
        if (error) {
          if (field === 'name') errors.name = error
          else if (field === 'email') errors.email = error
          else if (field === 'projectType') errors.projectType = error
          else if (field === 'message') errors.message = error
        }
      }
    })
    
    return errors
  }

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormState(prev => {
      const newData = { ...prev.data }
      const newErrors = { ...prev.errors }
      
      if (field === 'name') {
        newData.name = value
        newErrors.name = undefined
      } else if (field === 'email') {
        newData.email = value
        newErrors.email = undefined
      } else if (field === 'projectType') {
        newData.projectType = value
        newErrors.projectType = undefined
      } else if (field === 'message') {
        newData.message = value
        newErrors.message = undefined
      } else if (field === 'selectedPackage') {
        newData.selectedPackage = value
      } else if (field === 'goals') {
        newData.goals = value
      }
      
      return {
        ...prev,
        data: newData,
        errors: newErrors
      }
    })
  }

  const handleBlur = (field: keyof ContactFormData) => {
    const value = formState.data[field]
    if (value !== undefined) {
      const error = validateField(field, value)
      if (error) {
        setFormState(prev => {
          const newErrors = { ...prev.errors }
          if (field === 'name') newErrors.name = error
          else if (field === 'email') newErrors.email = error
          else if (field === 'projectType') newErrors.projectType = error
          else if (field === 'message') newErrors.message = error
          
          return {
            ...prev,
            errors: newErrors
          }
        })
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const errors = validateForm()
    
    if (Object.keys(errors).length > 0) {
      setFormState(prev => ({
        ...prev,
        errors
      }))
      return
    }

    setFormState(prev => ({
      ...prev,
      isSubmitting: true,
      submitError: undefined
    }))

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState.data),
      })

      if (!response.ok) {
        throw new Error('׳©׳׳™׳—׳× ׳”׳”׳•׳“׳¢׳” ׳ ׳›׳©׳׳”')
      }

      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        isSubmitted: true
      }))

      // Auto close after 3 seconds if onClose is provided
      if (onClose) {
        setTimeout(() => {
          onClose()
        }, 3000)
      }

    } catch (error) {
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        submitError: error instanceof Error ? error.message : '׳׳™׳¨׳¢׳” ׳©׳’׳™׳׳” ׳‘׳©׳׳™׳—׳× ׳”׳”׳•׳“׳¢׳”'
      }))
    }
  }

  const resetForm = () => {
    setFormState({
      data: {
        name: '',
        email: '',
        projectType: '',
        message: '',
        selectedPackage: selectedPackage || '',
        goals: ''
      },
      errors: {},
      isSubmitting: false,
      isSubmitted: false,
      isSuccess: false
    })
  }

  // Success state
  if (formState.isSubmitted) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center animate-scale-in">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 animate-slide-in-up">׳”׳”׳•׳“׳¢׳” ׳ ׳©׳׳—׳” ׳‘׳”׳¦׳׳—׳”!</h3>
        <p className="text-gray-600 mb-6 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          ׳×׳•׳“׳” ׳¢׳ ׳₪׳ ׳™׳™׳×׳›׳. ׳ ׳—׳–׳•׳¨ ׳׳׳™׳›׳ ׳‘׳”׳§׳“׳ ׳”׳׳₪׳©׳¨׳™.
        </p>
        <div className="animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={resetForm}
            className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            ׳©׳׳— ׳”׳•׳“׳¢׳” ׳ ׳•׳¡׳₪׳×
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="mr-4 text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-105"
            >
              ׳¡׳’׳•׳¨
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 animate-scale-in">
      <div className="mb-6 animate-slide-in-up">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">׳‘׳•׳׳• ׳ ׳×׳—׳™׳ ׳׳¢׳‘׳•׳“</h3>
        <p className="text-gray-600">
          ׳׳׳׳• ׳׳× ׳”׳₪׳¨׳˜׳™׳ ׳•׳ ׳—׳–׳•׳¨ ׳׳׳™׳›׳ ׳¢׳ ׳”׳¦׳¢׳× ׳׳—׳™׳¨ ׳׳•׳×׳׳׳×
        </p>
        {selectedPackage && (
          <div className="mt-3 p-3 bg-slate-50 rounded-lg animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
            <p className="text-sm text-slate-800">
              <span className="font-medium">׳—׳‘׳™׳׳” ׳ ׳‘׳—׳¨׳×:</span> {selectedPackage}
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            ׳©׳ ׳׳׳ *
          </label>
          <input
            type="text"
            id="name"
            value={formState.data.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-700 focus:border-transparent transition-all duration-300 hover:shadow-md ${
              formState.errors.name 
                ? 'border-red-500 bg-red-50 animate-pulse' 
                : 'border-gray-300 hover:border-gray-400 focus:scale-105'
            }`}
            placeholder="׳”׳›׳ ׳™׳¡׳• ׳׳× ׳©׳׳›׳ ׳”׳׳׳"
            disabled={formState.isSubmitting}
          />
          {formState.errors.name && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {formState.errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            ׳›׳×׳•׳‘׳× ׳׳™׳׳™׳™׳ *
          </label>
          <input
            type="email"
            id="email"
            value={formState.data.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-700 focus:border-transparent transition-all duration-300 hover:shadow-md ${
              formState.errors.email 
                ? 'border-red-500 bg-red-50 animate-pulse' 
                : 'border-gray-300 hover:border-gray-400 focus:scale-105'
            }`}
            placeholder="example@email.com"
            disabled={formState.isSubmitting}
          />
          {formState.errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {formState.errors.email}
            </p>
          )}
        </div>

        {/* Project Type Field */}
        <div className="animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
            ׳¡׳•׳’ ׳”׳₪׳¨׳•׳™׳§׳˜ *
          </label>
          <select
            id="projectType"
            value={formState.data.projectType}
            onChange={(e) => handleInputChange('projectType', e.target.value)}
            onBlur={() => handleBlur('projectType')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-700 focus:border-transparent transition-all duration-300 hover:shadow-md ${
              formState.errors.projectType 
                ? 'border-red-500 bg-red-50 animate-pulse' 
                : 'border-gray-300 hover:border-gray-400 focus:scale-105'
            }`}
            disabled={formState.isSubmitting}
          >
            <option value="">׳‘׳—׳¨׳• ׳¡׳•׳’ ׳₪׳¨׳•׳™׳§׳˜</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {formState.errors.projectType && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {formState.errors.projectType}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div className="animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            ׳”׳•׳“׳¢׳” *
          </label>
          <textarea
            id="message"
            rows={4}
            value={formState.data.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            onBlur={() => handleBlur('message')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-700 focus:border-transparent transition-all duration-300 resize-none hover:shadow-md ${
              formState.errors.message 
                ? 'border-red-500 bg-red-50 animate-pulse' 
                : 'border-gray-300 hover:border-gray-400 focus:scale-105'
            }`}
            placeholder="׳¡׳₪׳¨׳• ׳׳ ׳• ׳¢׳ ׳”׳₪׳¨׳•׳™׳§׳˜ ׳©׳׳›׳, ׳”׳“׳¨׳™׳©׳•׳× ׳•׳”׳¦׳™׳₪׳™׳•׳×..."
            disabled={formState.isSubmitting}
          />
          {formState.errors.message && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {formState.errors.message}
            </p>
          )}
        </div>

        {/* Goals Field (optional) */}
        <div className="animate-slide-in-up" style={{ animationDelay: '0.45s' }}>
          <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-2">
            ׳׳˜׳¨׳•׳× ׳”׳₪׳¨׳•׳™׳§׳˜ (׳׳•׳₪׳¦׳™׳•׳ ׳׳™)
          </label>
          <input
            type="text"
            id="goals"
            value={formState.data.goals || ''}
            onChange={(e) => handleInputChange('goals', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-700 focus:border-transparent transition-all duration-300 hover:shadow-md ${
              formState.errors.goals 
                ? 'border-red-500 bg-red-50 animate-pulse' 
                : 'border-gray-300 hover:border-gray-400 focus:scale-105'
            }`}
            placeholder="׳׳“׳•׳’׳׳”: ׳”׳’׳“׳׳× ׳׳™׳“׳™׳, ׳ ׳™׳”׳•׳ ׳‘׳׳•׳’, ׳—׳™׳‘׳•׳¨ CRM"
            disabled={formState.isSubmitting}
          />
          {formState.errors.goals && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {formState.errors.goals}
            </p>
          )}
        </div>

        {/* Submit Error */}
        {formState.submitError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {formState.submitError}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="animate-slide-in-up" style={{ animationDelay: '0.5s' }}>
          <button
            type="submit"
            disabled={formState.isSubmitting}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
              formState.isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-slate-900 hover:bg-slate-900 hover:shadow-lg transform hover:scale-105 hover:-translate-y-1 animate-glow'
            } text-white`}
          >
          {formState.isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              ׳©׳•׳׳— ׳”׳•׳“׳¢׳”...
            </span>
          ) : (
            '׳©׳׳— ׳”׳•׳“׳¢׳”'
          )}
        </button>
        </div>

        {/* Close Button */}
        {onClose && (
          <div className="animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 px-4 text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-105"
              disabled={formState.isSubmitting}
            >
              ׳‘׳™׳˜׳•׳
            </button>
          </div>
        )}
      </form>
    </div>
  )
}


