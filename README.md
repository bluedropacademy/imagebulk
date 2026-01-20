# 🎨 ImageBulk - יצירת תמונות בכמות

אפליקציה ליצירת תמונות AI בכמות באמצעות Nano Banana Pro API של kie.ai.

## ✨ תכונות

- 🚀 יצירת עשרות תמונות בבת אחת
- 📝 ממשק פשוט להזנת prompts (שורה לכל תמונה)
- ⚙️ בחירת הגדרות: רזולוציה, יחס גובה-רוחב, פורמט
- 📊 מעקב אחר התקדמות בזמן אמת
- 🖼️ תצוגה חיה של התמונות שנוצרות
- 📦 הורדת כל התמונות כקובץ ZIP אחד
- 🇮🇱 ממשק בעברית

## 🛠️ טכנולוגיות

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Axios
- JSZip

## 📋 דרישות מקדימות

- Node.js 18+
- npm או yarn
- API Key מ-[kie.ai](https://kie.ai)

## 🚀 התקנה

1. **התקנת חבילות:**
```bash
npm install
```

2. **הפעלת שרת פיתוח:**
```bash
npm run dev
```

3. **פתיחת הדפדפן:**
האתר ייפתח אוטומטית ב-`http://localhost:3000`

## 💡 שימוש

1. **הזן API Key** - קבל מפתח מ-[kie.ai](https://kie.ai)
2. **כתוב Prompts** - שורה אחת לכל תמונה שתרצה ליצור
3. **בחר הגדרות** - רזולוציה (1K/2K/4K), יחס גובה-רוחב, פורמט
4. **לחץ "צור תמונות"** - המערכת תתחיל ליצור את כל התמונות
5. **הורד תמונות** - הורד תמונה בודדת או את כולן כ-ZIP

## 📊 מחירים (kie.ai)

- **1K-2K**: $0.09 לתמונה
- **4K**: $0.12 לתמונה

## 🔧 פקודות

- `npm run dev` - הפעלת שרת פיתוח
- `npm run build` - בניית הפרויקט לייצור
- `npm run preview` - תצוגה מקדימה של הבניה

## 📝 דוגמאות Prompts

```
A beautiful sunset over the ocean with palm trees
A futuristic city at night with flying cars
A cute cat playing with a ball of yarn
A mountain landscape with snow peaks
A modern office space with plants
```

## 🔐 אבטחה

- ה-API Key נשמר רק בזיכרון הדפדפן
- לא נשמר בשרת או בקבצים
- מומלץ לא לשתף את ה-API Key

## 📄 רישיון

MIT

## 🙏 תודות

- [kie.ai](https://kie.ai) - ספק ה-API
- [Google DeepMind](https://deepmind.google) - Nano Banana Pro (Gemini 3.0)