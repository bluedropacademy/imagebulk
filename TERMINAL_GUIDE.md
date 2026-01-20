# 🖥️ מדריך טרמינל למתחילים

## 📖 מהו טרמינל?

**טרמינל** (Terminal) הוא תוכנה שמאפשרת לך לתקשר עם המחשב באמצעות פקודות טקסט.
במקום ללחוץ על אייקונים ותפריטים, אתה כותב פקודות שהמחשב מבצע.

---

## 🔍 איך פותחים טרמינל?

### 💻 Windows

**שלוש דרכים לפתוח:**

1. **Command Prompt (CMD)**
   - לחץ `Win + R`
   - הקלד: `cmd`
   - לחץ Enter

2. **PowerShell** (מומלץ!)
   - לחץ `Win + X`
   - בחר "Windows PowerShell" או "Terminal"

3. **Git Bash** (אם התקנת Git)
   - חפש "Git Bash" בתפריט Start
   - פתח אותו

### 🍎 Mac

**שלוש דרכים לפתוח:**

1. **דרך Spotlight**
   - לחץ `Cmd + Space`
   - הקלד: `terminal`
   - לחץ Enter

2. **דרך Finder**
   - פתח Finder
   - עבור ל: Applications → Utilities → Terminal

3. **קיצור דרך מהיר**
   - שמור ב-Dock לשימוש מהיר

### 🐧 Linux (Ubuntu/Debian)

**שלוש דרכים לפתוח:**

1. **קיצור מקלדת** (הכי מהיר!)
   - לחץ `Ctrl + Alt + T`

2. **דרך התפריט**
   - חפש "Terminal" בתפריט היישומים

3. **לחיצה ימנית**
   - לחץ לחיצה ימנית על שולחן העבודה
   - בחר "Open Terminal Here"

---

## 📂 איפה אני נמצא בטרמינל?

כשאתה פותח טרמינל, אתה נמצא ב**תיקייה מסוימת** (נקראת "Working Directory").

### לבדוק איפה אתה נמצא:

**Windows (CMD/PowerShell):**
```cmd
cd
```

**Mac/Linux:**
```bash
pwd
```

התוצאה תראה משהו כמו:
- Windows: `C:\Users\YourName`
- Mac: `/Users/YourName`
- Linux: `/home/YourName`

---

## 🚶 ניווט בין תיקיות

### ראה מה יש בתיקייה הנוכחית:

**Windows:**
```cmd
dir
```

**Mac/Linux:**
```bash
ls
```

**גרסה עם פרטים נוספים (Mac/Linux):**
```bash
ls -la
```

### עבור לתיקייה אחרת:

```bash
cd שם_התיקייה
```

**דוגמאות:**
```bash
# עבור לתיקיית Documents
cd Documents

# עבור לתיקייה בתוך תיקייה
cd Documents/Projects

# חזור תיקייה אחת אחורה
cd ..

# חזור לתיקיית הבית שלך
cd ~
```

---

## 🎯 פקודות בסיסיות חשובות

### 1️⃣ יצירת תיקייה חדשה

**Windows:**
```cmd
mkdir שם_התיקייה
```

**Mac/Linux:**
```bash
mkdir שם_התיקייה
```

### 2️⃣ יצירת קובץ חדש

**Windows:**
```cmd
type nul > קובץ.txt
```

**Mac/Linux:**
```bash
touch קובץ.txt
```

### 3️⃣ צפייה בתוכן קובץ

**Windows:**
```cmd
type קובץ.txt
```

**Mac/Linux:**
```bash
cat קובץ.txt
```

### 4️⃣ מחיקת קובץ

**Windows:**
```cmd
del קובץ.txt
```

**Mac/Linux:**
```bash
rm קובץ.txt
```

### 5️⃣ מחיקת תיקייה

**Windows:**
```cmd
rmdir /s תיקייה
```

**Mac/Linux:**
```bash
rm -rf תיקייה
```

⚠️ **שים לב:** פקודת המחיקה היא סופית! אין "Recycle Bin" בטרמינל.

### 6️⃣ ניקוי המסך

**Windows:**
```cmd
cls
```

**Mac/Linux:**
```bash
clear
```

---

## 🚀 איך להריץ את הפרויקט הזה?

### שלב 1: פתח טרמינל
עקוב אחר ההוראות למעלה לפי מערכת ההפעלה שלך.

### שלב 2: נווט לתיקיית הפרויקט

אם הורדת את הפרויקט למחשב, עבור אליו:

```bash
cd נתיב/לפרויקט/imagebulk
```

**דוגמה:**
```bash
# Windows
cd C:\Users\YourName\Downloads\imagebulk

# Mac/Linux
cd ~/Downloads/imagebulk
```

**טיפ:** אתה יכול לגרור את התיקייה לטרמינל במקום להקליד את הנתיב!

### שלב 3: וודא שאתה בתיקייה הנכונה

```bash
# Mac/Linux
pwd

# Windows
cd
```

האם אתה רואה את הנתיב לתיקיית imagebulk? מעולה! 🎉

### שלב 4: וודא שיש לך Node.js מותקן

```bash
node --version
```

אם אתה רואה מספר גרסה (למשל `v20.10.0`) - מצוין! ✅
אם לא - [הורד והתקן Node.js](https://nodejs.org)

### שלב 5: התקן את החבילות הנדרשות

```bash
npm install
```

זה יקח כמה דקות... המתן בסבלנות ☕

### שלב 6: הפעל את השרת

```bash
npm run dev
```

או השתמש בסקריפט המוכן:

**Mac/Linux:**
```bash
./start.sh
```

**Windows (עם Python מותקן):**
```bash
python start-server.py
```

### שלב 7: פתח את הדפדפן

הטרמינל יציג לך כתובת, משהו כמו:
```
➜  Local:   http://localhost:3000/
```

העתק את הכתובת והדבק אותה בדפדפן! 🌐

---

## 💡 טיפים מועילים

### 📝 השלמה אוטומטית (Tab Completion)
במקום להקליד שמות ארוכים:
1. התחל להקליד את השם
2. לחץ `Tab`
3. הטרמינל ישלים את השם בשבילך!

**דוגמה:**
```bash
cd Doc[Tab]  →  cd Documents/
```

### 🔙 היסטוריה של פקודות
- **חץ למעלה** ⬆️ - פקודה קודמת
- **חץ למטה** ⬇️ - פקודה הבאה

### 📋 העתקה והדבקה
- **Windows:**
  - העתק: `Ctrl + C` (או לחיצה ימנית)
  - הדבק: `Ctrl + V` (או לחיצה ימנית)

- **Mac:**
  - העתק: `Cmd + C`
  - הדבק: `Cmd + V`

- **Linux:**
  - העתק: `Ctrl + Shift + C`
  - הדבק: `Ctrl + Shift + V`

### 🛑 עצירת תהליך
אם משהו תקוע או רץ לאין סוף:
- לחץ `Ctrl + C`

---

## 🆘 פתרון בעיות נפוצות

### ❌ "command not found" / "אינו מזוהה כפקודה"
**פירוש:** התוכנה לא מותקנת או לא בנתיב המערכת.

**פתרון:**
1. וודא שהתקנת את התוכנה (Node.js, Git וכו')
2. נסה לסגור ולפתוח מחדש את הטרמינל
3. בדוק שהנתיב למערכת מוגדר נכון

### ❌ "Permission denied" / "אין הרשאה"
**פירוש:** אין לך הרשאות להריץ את הפקודה.

**פתרון Linux/Mac:**
```bash
sudo [הפקודה שלך]
```
זה ידרוש את סיסמת המנהל שלך.

**פתרון Windows:**
פתח את הטרמינל כמנהל (Run as Administrator)

### ❌ "No such file or directory"
**פירוש:** הקובץ או התיקייה לא קיימים.

**פתרון:**
1. בדוק איות (גדולות/קטנות חשובות!)
2. וודא שאתה בתיקייה הנכונה
3. השתמש ב-`ls` (או `dir`) לראות מה יש

---

## 📚 רוצה ללמוד עוד?

### משאבים מומלצים בעברית:
- [מדריך CMD ל-Windows](https://www.youtube.com/results?search_query=%D7%9E%D7%93%D7%A8%D7%99%D7%9A+cmd)
- [מדריך Terminal ל-Mac](https://www.youtube.com/results?search_query=%D7%98%D7%A8%D7%9E%D7%99%D7%A0%D7%9C+mac)
- [מדריך Bash ל-Linux](https://www.youtube.com/results?search_query=bash+%D7%9E%D7%93%D7%A8%D7%99%D7%9A)

### משאבים באנגלית:
- [Command Line Crash Course](https://www.youtube.com/results?search_query=command+line+crash+course)
- [Linux/Mac Terminal Tutorial](https://www.youtube.com/results?search_query=terminal+tutorial)

---

## 🎓 סיכום מהיר

| פעולה | Windows | Mac/Linux |
|-------|---------|-----------|
| איפה אני? | `cd` | `pwd` |
| רשימת קבצים | `dir` | `ls` |
| עבור לתיקייה | `cd תיקייה` | `cd תיקייה` |
| חזור אחורה | `cd ..` | `cd ..` |
| צור תיקייה | `mkdir שם` | `mkdir שם` |
| מחק קובץ | `del קובץ` | `rm קובץ` |
| נקה מסך | `cls` | `clear` |
| עצור פקודה | `Ctrl + C` | `Ctrl + C` |

---

## ✨ מוכן להתחיל!

עכשיו אתה יודע:
- ✅ מהו טרמינל
- ✅ איך לפתוח אותו
- ✅ איך לנווט בין תיקיות
- ✅ פקודות בסיסיות
- ✅ איך להריץ את הפרויקט הזה

**בהצלחה! 🚀**

אם יש לך שאלות, אל תהסס לשאול!
