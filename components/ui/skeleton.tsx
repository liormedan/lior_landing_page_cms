interface SkeletonProps {
  className?: string
  width?: string
  height?: string
  rounded?: boolean
  delay?: number
}

export function Skeleton({ className = '', width, height, rounded = false, delay = 0 }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] animate-shimmer ${
        rounded ? 'rounded-full' : 'rounded'
      } ${className}`}
      style={{ 
        width, 
        height,
        animationDelay: `${delay}ms`,
        animationDuration: '2s'
      }}
      role="status"
      aria-label="טוען תוכן..."
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4">
        <Skeleton width="64px" height="64px" rounded />
      </div>
      <Skeleton width="60%" height="24px" className="mx-auto mb-2" />
      <Skeleton width="80%" height="16px" className="mx-auto mb-4" />
      <div className="space-y-2">
        <Skeleton width="100%" height="12px" />
        <Skeleton width="90%" height="12px" />
        <Skeleton width="85%" height="12px" />
      </div>
    </div>
  )
}

export function SkeletonProjectCard() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
      <Skeleton width="100%" height="192px" />
      <div className="p-6">
        <Skeleton width="70%" height="24px" className="mb-2" />
        <Skeleton width="100%" height="16px" className="mb-2" />
        <Skeleton width="85%" height="16px" className="mb-4" />
        <div className="flex gap-2 mb-4">
          <Skeleton width="80px" height="24px" rounded />
          <Skeleton width="90px" height="24px" rounded />
        </div>
        <Skeleton width="100%" height="40px" />
      </div>
    </div>
  )
}

export function SkeletonHero() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <Skeleton width="200px" height="32px" className="mx-auto mb-6" rounded />
        <Skeleton width="80%" height="48px" className="mx-auto mb-4" />
        <Skeleton width="60%" height="48px" className="mx-auto mb-6" />
        <Skeleton width="70%" height="20px" className="mx-auto mb-8" />
        <Skeleton width="200px" height="48px" className="mx-auto" rounded />
      </div>
    </div>
  )
}

export function SkeletonFAQ() {
  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <Skeleton width="300px" height="36px" className="mx-auto mb-4" />
          <Skeleton width="60%" height="20px" className="mx-auto" />
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {[1, 2, 3].map((category) => (
            <div key={category} className="space-y-3">
              <Skeleton width="200px" height="24px" className="mb-4" />
              <div className="space-y-2">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="border border-slate-200 rounded-lg p-4">
                    <Skeleton width="80%" height="20px" className="mb-2" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SkeletonTechnology() {
  return (
    <div className="py-12 sm:py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <Skeleton width="400px" height="36px" className="mx-auto mb-4" />
          <Skeleton width="70%" height="20px" className="mx-auto" />
        </div>

        {/* Technology Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3].map((tech) => (
            <div key={tech} className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4">
                <Skeleton width="64px" height="64px" rounded />
              </div>
              <Skeleton width="60%" height="24px" className="mx-auto mb-2" />
              <Skeleton width="100%" height="16px" className="mb-2" />
              <Skeleton width="90%" height="16px" className="mb-4" />
              <div className="space-y-2">
                <Skeleton width="100%" height="12px" />
                <Skeleton width="85%" height="12px" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SkeletonDemo() {
  return (
    <div className="py-12 sm:py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content Side */}
          <div>
            <Skeleton width="300px" height="36px" className="mb-4" />
            <Skeleton width="100%" height="20px" className="mb-2" />
            <Skeleton width="90%" height="20px" className="mb-6" />
            
            <div className="space-y-3 mb-6">
              {[1, 2, 3, 4].map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <Skeleton width="20px" height="20px" rounded />
                  <Skeleton width="80%" height="16px" />
                </div>
              ))}
            </div>
            
            <Skeleton width="180px" height="48px" rounded />
          </div>

          {/* Demo Image Side */}
          <div>
            <Skeleton width="100%" height="400px" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function SkeletonContactForm() {
  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Skeleton width="250px" height="36px" className="mx-auto mb-4" />
          <Skeleton width="70%" height="20px" className="mx-auto" />
        </div>

        {/* Form */}
        <div className="bg-slate-50 rounded-xl p-6 sm:p-8">
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <Skeleton width="80px" height="16px" className="mb-2" />
              <Skeleton width="100%" height="48px" />
            </div>

            {/* Email Field */}
            <div>
              <Skeleton width="100px" height="16px" className="mb-2" />
              <Skeleton width="100%" height="48px" />
            </div>

            {/* Project Type Field */}
            <div>
              <Skeleton width="120px" height="16px" className="mb-2" />
              <Skeleton width="100%" height="48px" />
            </div>

            {/* Message Field */}
            <div>
              <Skeleton width="80px" height="16px" className="mb-2" />
              <Skeleton width="100%" height="120px" />
            </div>

            {/* Submit Button */}
            <Skeleton width="150px" height="48px" className="mx-auto" rounded />
          </div>
        </div>
      </div>
    </div>
  )
}

export function SkeletonPricing() {
  return (
    <div className="py-12 sm:py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <Skeleton width="300px" height="36px" className="mx-auto mb-4" />
          <Skeleton width="60%" height="20px" className="mx-auto" />
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3].map((plan, index) => (
            <div 
              key={plan} 
              className={`bg-white rounded-xl shadow-lg p-6 border ${
                index === 1 ? 'border-sky-500 ring-2 ring-sky-500' : 'border-slate-200'
              }`}
            >
              {/* Popular Badge for middle card */}
              {index === 1 && (
                <div className="text-center mb-4">
                  <Skeleton width="100px" height="24px" className="mx-auto" rounded />
                </div>
              )}
              
              {/* Plan Name */}
              <Skeleton width="60%" height="24px" className="mx-auto mb-2" />
              
              {/* Price */}
              <Skeleton width="80px" height="36px" className="mx-auto mb-4" />
              
              {/* Features */}
              <div className="space-y-3 mb-6">
                {[1, 2, 3, 4, 5].map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <Skeleton width="16px" height="16px" rounded />
                    <Skeleton width="85%" height="16px" />
                  </div>
                ))}
              </div>
              
              {/* CTA Button */}
              <Skeleton width="100%" height="48px" rounded />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}