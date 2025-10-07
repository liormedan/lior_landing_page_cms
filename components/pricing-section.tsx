'use client'

import { useState } from 'react'
import { PricingPackage } from '@/types/landing-page'
import ContactForm from './contact-form'

interface PricingSectionProps {
  packages: PricingPackage[]
}

export default function PricingSection({ packages }: PricingSectionProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [showContactForm, setShowContactForm] = useState(false)

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName)
    setShowContactForm(true)
  }

  const handleCloseContactForm = () => {
    setShowContactForm(false)
    setSelectedPackage(null)
  }

  return (
    <section className="relative py-20 sm:py-24 section-divider">
      <div className="container mx-auto px-4">
        <div className="section-light max-w-6xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            חבילות מחיר שקופות
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            בחרו את החבילה המתאימה לכם - ללא עלויות נסתרות, עם תמיכה מלאה ואחריות מוחלטת
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={pkg.name}
              className={`relative bg-white rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-slide-in-up ${
                pkg.highlighted 
                  ? 'ring-4 ring-blue-500 ring-opacity-50 scale-105 bg-gradient-to-br from-white to-blue-50' 
                  : 'hover:scale-105'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {pkg.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    המומלץ ביותר
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Package Name */}
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-4 ${
                    pkg.highlighted ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {pkg.name}
                  </h3>
                  
                  {/* Price */}
                  <div className="mb-6">
                    {pkg.price === 'יצירת קשר' ? (
                      <div className={`text-3xl font-bold ${
                        pkg.highlighted ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        יצירת קשר
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span className={`text-4xl font-bold ${
                          pkg.highlighted ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                          {pkg.price}
                        </span>
                        <span className="text-gray-500 mr-2">חד פעמי</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      className="flex items-start animate-slide-in-right"
                      style={{ animationDelay: `${(index * 0.1) + (featureIndex * 0.05)}s` }}
                    >
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ml-3 ${
                        pkg.highlighted 
                          ? 'bg-blue-100' 
                          : 'bg-green-100'
                      }`}>
                        <svg 
                          className={`w-3 h-3 ${
                            pkg.highlighted ? 'text-blue-600' : 'text-green-600'
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={3} 
                            d="M5 13l4 4L19 7" 
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handlePackageSelect(pkg.name)}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    pkg.highlighted
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 animate-glow'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {pkg.ctaText}
                </button>

                {/* Additional Info for Premium */}
                {pkg.name === 'פרימיום' && (
                  <p className="text-center text-sm text-gray-500 mt-4 animate-slide-in-up" style={{ animationDelay: '0.5s' }}>
                    מחיר מותאם לפי דרישות הפרויקט
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 text-center animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              מה כלול בכל החבילות?
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-right">
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">אחריות מלאה לשנה</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">הדרכה מלאה על המערכת</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">עדכונים אוטומטיים</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">גיבויים אוטומטיים</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">אבטחה ברמה גבוהה</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">תעודת SSL חינם</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-12 text-center animate-slide-in-up" style={{ animationDelay: '0.7s' }}>
          <div className="inline-flex items-center bg-green-50 border border-green-200 rounded-full px-6 py-3">
            <svg className="w-6 h-6 text-green-600 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-green-800 font-medium">
              אחריות החזר כספי מלא תוך 30 יום
            </span>
          </div>
        </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-lg font-bold text-gray-900">יצירת קשר</h3>
              <button
                onClick={handleCloseContactForm}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <ContactForm 
                selectedPackage={selectedPackage || undefined}
                onClose={handleCloseContactForm}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
