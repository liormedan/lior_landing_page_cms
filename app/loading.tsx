import { 
  SkeletonHero, 
  SkeletonTechnology, 
  SkeletonProjectCard, 
  SkeletonCard, 
  SkeletonDemo, 
  SkeletonFAQ, 
  SkeletonContactForm 
} from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="min-h-screen animate-fade-in" role="main" aria-label="טוען תוכן...">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-700/70/20 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-slate-400/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-sky-300/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 left-1/2 w-5 h-5 bg-sky-200/25 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      </div>
      
      <div className="relative">
        {/* Hero Section Skeleton */}
        <SkeletonHero />
        
        {/* Technology Showcase Skeleton */}
        <SkeletonTechnology />
        
        {/* Project Gallery Skeleton */}
        <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <div className="animate-pulse">
                <div className="h-8 bg-slate-200 rounded w-64 mx-auto mb-4"></div>
                <div className="h-5 bg-slate-200 rounded w-96 mx-auto"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <SkeletonProjectCard key={item} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Services Cards Skeleton */}
        <div className="py-12 sm:py-16 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <div className="animate-pulse">
                <div className="h-8 bg-slate-200 rounded w-64 mx-auto mb-4"></div>
                <div className="h-5 bg-slate-200 rounded w-96 mx-auto"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[1, 2, 3, 4, 5].map((item) => (
                <SkeletonCard key={item} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Demo Section Skeleton */}
        <SkeletonDemo />
        
        {/* FAQ Section Skeleton */}
        <SkeletonFAQ />
        
        {/* Contact Section Skeleton */}
        <SkeletonContactForm />
      </div>
    </main>
  )
}
