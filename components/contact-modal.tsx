'use client'

import { useEffect } from 'react'
import ContactForm from './contact-form'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPackage?: string
}

export default function ContactModal({ isOpen, onClose, selectedPackage }: ContactModalProps) {
  // Handle escape key and focus management
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      
      // Focus trap - focus the modal when it opens
      const modal = document.querySelector('[role="dialog"]')
      if (modal) {
        ;(modal as HTMLElement).focus()
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      aria-describedby="contact-modal-description"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-all duration-300 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md animate-scale-in">
          <ContactForm 
            selectedPackage={selectedPackage} 
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  )
}