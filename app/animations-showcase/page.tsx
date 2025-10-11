import { 
  FadeInUp, 
  ScaleIn, 
  RotateIn, 
  SlideInFromSide, 
  TypewriterEffect, 
  CountUp 
} from '@/components/ui/micro-animations';
import { 
  AnimatedButton, 
  AnimatedCard, 
  LoadingSpinner, 
  AnimatedProgressBar 
} from '@/components/ui/interactive-elements';
import { 
  ScrollReveal, 
  StaggeredList 
} from '@/components/ui/page-transitions';
import { 
  FloatingElements, 
  InteractiveParticles, 
  MouseTracker 
} from '@/components/ui/floating-elements';
import AnimatedText from '@/components/animated-text';

export default function AnimationsShowcase() {
  const cardItems = [
    'פיתוח אתרים מתקדמים',
    'עיצוב UI/UX מקצועי', 
    'אופטימיזציה לביצועים',
    'תמיכה טכנית מלאה'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 relative overflow-hidden">
      {/* אלמנטים צפים ברקע */}
      <FloatingElements />
      <InteractiveParticles />
      <MouseTracker />
      
      <div className="relative z-10 container mx-auto px-4 py-16 space-y-16">
        
        {/* כותרת ראשית */}
        <section className="text-center space-y-8">
          <FadeInUp delay={200}>
            <h1 className="text-5xl md:text-7xl font-bold">
              <AnimatedText variant="gradient">
                מערכת אנימציות מתקדמת
              </AnimatedText>
            </h1>
          </FadeInUp>
          
          <SlideInFromSide direction="right" delay={400}>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              <TypewriterEffect 
                text="חוויית משתמש מתקדמת עם אנימציות חלקות ואינטראקטיביות מודרניות"
                speed={80}
              />
            </p>
          </SlideInFromSide>
        </section>

        {/* סטטיסטיקות */}
        <ScrollReveal>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <ScaleIn delay={600}>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 hover-lift">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  <CountUp end={150} />+
                </div>
                <p className="text-gray-600 dark:text-gray-300">פרויקטים הושלמו</p>
              </div>
            </ScaleIn>
            
            <ScaleIn delay={800}>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 hover-lift">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  <CountUp end={98} />%
                </div>
                <p className="text-gray-600 dark:text-gray-300">שביעות רצון לקוחות</p>
              </div>
            </ScaleIn>
            
            <ScaleIn delay={1000}>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 hover-lift">
                <div className="text-4xl font-bold text-pink-600 mb-2">
                  <CountUp end={24} />/7
                </div>
                <p className="text-gray-600 dark:text-gray-300">תמיכה טכנית</p>
              </div>
            </ScaleIn>
          </section>
        </ScrollReveal>

        {/* כפתורים אינטראקטיביים */}
        <ScrollReveal>
          <section className="text-center space-y-8">
            <RotateIn delay={1200}>
              <h2 className="text-3xl font-bold">
                <AnimatedText variant="wave">
                  כפתורים אינטראקטיביים
                </AnimatedText>
              </h2>
            </RotateIn>
            
            <div className="flex flex-wrap justify-center gap-4">
              <AnimatedButton variant="primary" size="lg">
                התחל עכשיו
              </AnimatedButton>
              <AnimatedButton variant="secondary" size="lg">
                למד עוד
              </AnimatedButton>
              <AnimatedButton variant="ghost" size="lg">
                צור קשר
              </AnimatedButton>
            </div>
          </section>
        </ScrollReveal>

        {/* כרטיסים עם אפקטים שונים */}
        <ScrollReveal>
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                <AnimatedText variant="pulse">
                  כרטיסים אינטראקטיביים
                </AnimatedText>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatedCard hoverEffect="lift" className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-4 animate-bounce-subtle"></div>
                <h3 className="font-bold mb-2">Hover Lift</h3>
                <p className="text-sm text-gray-600">אפקט הרמה עדין</p>
              </AnimatedCard>
              
              <AnimatedCard hoverEffect="tilt" className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-4 animate-wiggle"></div>
                <h3 className="font-bold mb-2">Hover Tilt</h3>
                <p className="text-sm text-gray-600">אפקט הטיה תלת-ממדי</p>
              </AnimatedCard>
              
              <AnimatedCard hoverEffect="glow" className="p-6 text-center">
                <div className="w-12 h-12 bg-pink-500 rounded-full mx-auto mb-4 animate-heartbeat"></div>
                <h3 className="font-bold mb-2">Hover Glow</h3>
                <p className="text-sm text-gray-600">אפקט זוהר מסביב</p>
              </AnimatedCard>
              
              <AnimatedCard hoverEffect="scale" className="p-6 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-4 animate-pulse"></div>
                <h3 className="font-bold mb-2">Hover Scale</h3>
                <p className="text-sm text-gray-600">אפקט הגדלה</p>
              </AnimatedCard>
            </div>
          </section>
        </ScrollReveal>

        {/* רשימה עם Stagger */}
        <ScrollReveal>
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                <AnimatedText variant="rainbow">
                  השירותים שלנו
                </AnimatedText>
              </h2>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <StaggeredList staggerDelay={150}>
                {cardItems.map((item, index) => (
                  <div key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 mb-4 hover-lift">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold">{item}</h3>
                    </div>
                  </div>
                ))}
              </StaggeredList>
            </div>
          </section>
        </ScrollReveal>

        {/* פרוגרס בר */}
        <ScrollReveal>
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-8">התקדמות הפרויקט</h2>
            </div>
            
            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>עיצוב</span>
                  <span>90%</span>
                </div>
                <AnimatedProgressBar progress={90} />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span>פיתוח</span>
                  <span>75%</span>
                </div>
                <AnimatedProgressBar progress={75} />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span>בדיקות</span>
                  <span>60%</span>
                </div>
                <AnimatedProgressBar progress={60} />
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* טעינה */}
        <ScrollReveal>
          <section className="text-center space-y-8">
            <h2 className="text-3xl font-bold mb-8">אינדיקטורי טעינה</h2>
            
            <div className="flex justify-center space-x-8 space-x-reverse">
              <div className="text-center">
                <LoadingSpinner size="sm" color="blue" />
                <p className="mt-2 text-sm">קטן</p>
              </div>
              <div className="text-center">
                <LoadingSpinner size="md" color="purple" />
                <p className="mt-2 text-sm">בינוני</p>
              </div>
              <div className="text-center">
                <LoadingSpinner size="lg" color="green" />
                <p className="mt-2 text-sm">גדול</p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* הוראות שימוש */}
        <ScrollReveal>
          <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">איך להשתמש?</h2>
            <div className="space-y-4 text-right max-w-2xl mx-auto">
              <p>• לחץ בכל מקום כדי ליצור פרטיקלים</p>
              <p>• הזז את העכבר כדי לראות את אפקט המעקב</p>
              <p>• גלול למטה כדי לראות אנימציות הופעה</p>
              <p>• העבר עכבר על הכרטיסים לאפקטים שונים</p>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}