import AnimatedText, { TypingAnimatedText } from './animated-text';

export default function AnimatedTextDemo() {
  return (
    <div className="space-y-8 p-8">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">
          <AnimatedText variant="gradient">
            מערכת ניהול תוכן מתקדמת
          </AnimatedText>
        </h1>
        
        <h2 className="text-3xl font-semibold">
          <AnimatedText variant="wave">
            אתר מעוצב ומהיר
          </AnimatedText>
        </h2>
        
        <h3 className="text-2xl">
          <AnimatedText variant="rainbow">
            טכנולוגיות מתקדמות
          </AnimatedText>
        </h3>
        
        <p className="text-xl">
          <AnimatedText variant="pulse">
            פתרונות דיגיטליים חדשניים
          </AnimatedText>
        </p>
      </div>

      <div className="border-t pt-8">
        <h3 className="text-xl font-semibold mb-4">אפקט הקלדה:</h3>
        <TypingAnimatedText 
          text="ברוכים הבאים לעתיד הדיגיטלי!"
          variant="gradient"
          speed={150}
          className="text-2xl font-bold"
        />
      </div>

      <div className="border-t pt-8">
        <h3 className="text-xl font-semibold mb-4">דוגמאות נוספות:</h3>
        <div className="space-y-4">
          <div className="text-lg">
            פיתוח <AnimatedText variant="gradient" className="font-bold">Next.js</AnimatedText> מתקדם
          </div>
          <div className="text-lg">
            עיצוב עם <AnimatedText variant="wave" className="font-bold">Tailwind CSS</AnimatedText>
          </div>
          <div className="text-lg">
            ניהול תוכן עם <AnimatedText variant="rainbow" className="font-bold">Sanity CMS</AnimatedText>
          </div>
          <div className="text-lg">
            ביצועים <AnimatedText variant="pulse" className="font-bold">מעולים</AnimatedText>
          </div>
        </div>
      </div>
    </div>
  );
}