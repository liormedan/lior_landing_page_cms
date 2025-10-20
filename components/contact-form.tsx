'use client'

import { useMemo, useState } from 'react'
import { ContactFormData, ContactFormErrors, ContactFormState } from '@/types/landing-page'

interface ContactFormProps {
  selectedPackage?: string
  onClose?: () => void
}

const PROJECT_TYPES = [
  'מערכת תוכן להשקת מוצר',
  'קמפיין לידים לעסק שירותי',
  'מוצר SaaS שצריך חיבורי CRM',
  'עמוד הרשמה לאירוע או וובינר',
  'אתר תדמית קטן ומוכן לצמיחה',
  'שדרוג דף קיים ל-RTL ונגישות',
  'רכיב אחר / לא בטוחים עדיין',
]

const REQUIRED_FIELDS: Array<keyof ContactFormData> = ['name', 'email', 'projectType', 'message']

const initialState = (selectedPackage?: string): ContactFormState => ({
  data: {
    name: '',
    email: '',
    projectType: '',
    message: '',
    goals: '',
    selectedPackage: selectedPackage || '',
  },
  errors: {},
  isSubmitting: false,
  isSubmitted: false,
  isSuccess: false,
})

export default function ContactForm({ selectedPackage, onClose }: ContactFormProps) {
  const [formState, setFormState] = useState<ContactFormState>(() => initialState(selectedPackage))

  const projectTypeOptions = useMemo(() => PROJECT_TYPES, [])

  const validateField = (field: keyof ContactFormData, value: string): string | undefined => {
    const trimmed = value.trim()

    switch (field) {
      case 'name':
        if (!trimmed) return 'נשמח לדעת איך לפנות אליך.'
        if (trimmed.length < 2) return 'שם צריך להכיל לפחות 2 תווים.'
        return undefined
      case 'email':
        if (!trimmed) return 'מייל עבודה עוזר לנו לחזור אליך מהר.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'כתובת המייל נראית לא תקינה.'
        return undefined
      case 'projectType':
        if (!trimmed) return 'בחרו את סוג הפרויקט כדי שנדע להכין חומרים רלוונטיים.'
        return undefined
      case 'message':
        if (!trimmed) return 'ספרו לנו בקצרה מה האתגר או המטרה של הדף.'
        if (trimmed.length < 10) return 'נשמח לעוד כמה מילים כדי שנבין את התמונה המלאה.'
        return undefined
      default:
        return undefined
    }
  }

  const validateForm = (): ContactFormErrors => {
    const errors: ContactFormErrors = {}

    REQUIRED_FIELDS.forEach((field) => {
      const value = formState.data[field]
      if (value !== undefined) {
        const error = validateField(field, value)
        if (error) {
          errors[field] = error
        }
      }
    })

    return errors
  }

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [field]: value,
      },
      errors: {
        ...prev.errors,
        [field]: undefined,
      },
    }))
  }

  const handleBlur = (field: keyof ContactFormData) => {
    const value = formState.data[field]
    if (value === undefined) return
    const error = validateField(field, value)
    if (error) {
      setFormState((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          [field]: error,
        },
      }))
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormState((prev) => ({ ...prev, errors }))
      return
    }

    setFormState((prev) => ({
      ...prev,
      isSubmitting: true,
      submitError: undefined,
    }))

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState.data),
      })

      if (!response.ok) {
        throw new Error('ארעה שגיאה בשליחה. נסו שוב או כתבו לנו ישירות במייל.')
      }

      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        isSubmitted: true,
        isSuccess: true,
      }))

      if (onClose) {
        setTimeout(() => onClose(), 3000)
      }
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        submitError: error instanceof Error ? error.message : 'לא הצלחנו לשלוח את הטופס. נסו שוב בעוד דקה.',
      }))
    }
  }

  const resetForm = () => {
    setFormState(initialState(selectedPackage))
  }

  if (formState.isSubmitted) {
    return (
      <div className="mx-auto max-w-md animate-scale-in rounded-lg bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">הטופס התקבל!</h3>
        <p className="mt-2 text-sm text-gray-600">
          נחזור אליכם עד יום העסקים הבא עם תיאום פגישה או חומרים לתמחור. בינתיים תוכלו לשלוח לנו חומרים נוספים למייל liormedan1@gmail.com.
        </p>
        {selectedPackage && (
          <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
            <span className="font-semibold">חבילת עניין: </span>
            {selectedPackage}
          </div>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={resetForm}
            className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2"
          >
            שלחו עוד פרטים
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              סגירה מהירה
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900">נשמח לשמוע עליכם</h3>
        <p className="mt-1 text-sm text-gray-600">
          מלאו כמה פרטים קצרים כדי שנוכל להכין פגישה או הצעה מדויקת. נחזור אליכם עם שלבים ברורים ומסמך דרישות ראשוני.
        </p>
        {selectedPackage && (
          <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-800">
            <span className="font-medium">חבילה שנבחרה: </span>
            {selectedPackage}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TextField
          id="name"
          label="שם מלא *"
          placeholder="לדוגמה: תמר לוי / Lior Studio"
          value={formState.data.name}
          onChange={(value) => handleInputChange('name', value)}
          onBlur={() => handleBlur('name')}
          error={formState.errors.name}
          disabled={formState.isSubmitting}
          delay="0.1s"
        />

        <TextField
          id="email"
          type="email"
          label="אימייל עבודה *"
          placeholder="name@company.com"
          value={formState.data.email}
          onChange={(value) => handleInputChange('email', value)}
          onBlur={() => handleBlur('email')}
          error={formState.errors.email}
          disabled={formState.isSubmitting}
          delay="0.2s"
        />

        <SelectField
          id="projectType"
          label="סוג הפרויקט *"
          value={formState.data.projectType}
          onChange={(value) => handleInputChange('projectType', value)}
          onBlur={() => handleBlur('projectType')}
          options={projectTypeOptions}
          placeholder="בחרו את סוג הפרויקט"
          error={formState.errors.projectType}
          disabled={formState.isSubmitting}
          delay="0.3s"
        />

        <TextAreaField
          id="message"
          label="מה המטרה של הדף? *"
          placeholder="ספרו לנו על ההצעה, הקהל ומה תרצו שיקרה אחרי שהלקוח משאיר פרטים."
          value={formState.data.message}
          onChange={(value) => handleInputChange('message', value)}
          onBlur={() => handleBlur('message')}
          error={formState.errors.message}
          disabled={formState.isSubmitting}
          delay="0.4s"
        />

        <TextField
          id="goals"
          label="איך נראה הצלחה בעיניכם? (לא חובה)"
          placeholder="לדוגמה: 50 לידים בחודש, חיבור ל-HubSpot, להעלות מהירות טעינה."
          value={formState.data.goals || ''}
          onChange={(value) => handleInputChange('goals', value)}
          disabled={formState.isSubmitting}
          delay="0.45s"
        />

        {formState.submitError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {formState.submitError}
          </div>
        )}

        <div className="animate-slide-in-up" style={{ animationDelay: '0.5s' }}>
          <button
            type="submit"
            disabled={formState.isSubmitting}
            className={`w-full rounded-lg py-3 px-6 text-white transition-all duration-300 ${
              formState.isSubmitting
                ? 'cursor-not-allowed bg-gray-400'
                : 'bg-slate-900 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg'
            }`}
          >
            {formState.isSubmitting ? 'שולחים את הפרטים...' : 'שלחו את הפרטים'}
          </button>
        </div>

        {onClose && (
          <div className="animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg py-2 text-sm text-gray-600 transition hover:text-gray-800"
              disabled={formState.isSubmitting}
            >
              ביטול וסגירה
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  placeholder,
  type = 'text',
  delay,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
  disabled?: boolean
  placeholder?: string
  type?: string
  delay?: string
}) {
  return (
    <div className="animate-slide-in-up" style={delay ? { animationDelay: delay } : undefined}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        className={`w-full rounded-lg border px-4 py-3 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-slate-700 hover:shadow-md ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

function TextAreaField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  placeholder,
  delay,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
  disabled?: boolean
  placeholder?: string
  delay?: string
}) {
  return (
    <div className="animate-slide-in-up" style={delay ? { animationDelay: delay } : undefined}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        className={`w-full resize-none rounded-lg border px-4 py-3 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-slate-700 hover:shadow-md ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

function SelectField({
  id,
  label,
  value,
  onChange,
  onBlur,
  options,
  placeholder,
  error,
  disabled,
  delay,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  options: string[]
  placeholder: string
  error?: string
  disabled?: boolean
  delay?: string
}) {
  return (
    <div className="animate-slide-in-up" style={delay ? { animationDelay: delay } : undefined}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        className={`w-full rounded-lg border px-4 py-3 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-slate-700 hover:shadow-md ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}
