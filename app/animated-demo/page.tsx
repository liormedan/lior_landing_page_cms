import AnimatedTextDemo from '@/components/animated-text-demo';

export default function AnimatedDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto py-16">
        <AnimatedTextDemo />
      </div>
    </div>
  );
}