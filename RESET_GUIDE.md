# מדריך איפוס הגדרות האפליקציה

## בעיה שנפתרה
תוסף הנגישות ורצועת הקוקיז שמרו הגדרות ב-localStorage ולא התאתחלו בכל טעינה של האפליקציה.

## פתרונות שנוספו

### 1. כפתור איפוס בפיתוח
- בסביבת פיתוח יופיע כפתור "🔄 איפוס הכל" בפינה השמאלית העליונה
- לחיצה עליו תאפס את כל ההגדרות ותרענן את הדף

### 2. איפוס אוטומטי עם פרמטר URL
הוסף `?auto-reset=true` לכתובת כדי לאפס אוטומטי:
```
http://localhost:3000?auto-reset=true
```

### 3. כפתורי איפוס ברכיבים
- **תוסף נגישות**: כפתור "איפוס מלא + רענון" (אדום)
- **רצועת קוקיז**: כפתור "איפוס הכל" 

### 4. איפוס ידני בקונסול
```javascript
// איפוס כל ההגדרות
localStorage.removeItem('cms-accessibility')
localStorage.removeItem('cms-cookie-consent')
location.reload()
```

## איך זה עובד
1. הרכיבים בודקים ב-sessionStorage אם יש דגל איפוס
2. אם כן - מוחקים את ההגדרות מ-localStorage ומתאתחלים
3. sessionStorage נמחק אוטומטית ברענון דף

## לפרודקשן
כפתור הפיתוח לא יופיע בפרודקשן אלא אם תוסיף `?show-reset=true` לכתובת.