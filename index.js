require('dotenv').config(); // טוען את משתני הסביבה מקובץ .env

const express = require('express');
const chalk = require('chalk');

// ייבוא הראוטרים
const coursesRouter = require('./routes/courses');
const studentsRouter = require('./routes/students');
const enrollmentsRouter = require('./routes/enrollments');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ==========================================
// ה-Middleware של האימות (Authentication)
// ==========================================
const authenticateRequest = (req, res, next) => {
    // הדפסה לטרמינל בשביל לוודא שהפונקציה נקראת בכל קריאה
    console.log(chalk.yellow(`[LOG] Incoming request: ${req.method} ${req.url}`));

    const SECRET_KEY = process.env.SECRET_KEY; // הערך נטען ממשתני הסביבה
    const clientKey = req.get('auth-key'); // שליפת ה-header

    // בדיקה: אם לא נשלח header או שהערך שגוי -> מחזירים 401
    if (!clientKey || clientKey !== SECRET_KEY) {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized. Missing or invalid auth-key header."
        });
    }

    // אם הכל תקין, ממשיכים הלאה לראוטרים!
    next();
};

// הפעלת ה-Middleware באופן גלובלי (לפני כל הראוטרים!)
app.use(authenticateRequest);

// חיבור הראוטרים לנתיבים הראשיים שלהם
app.use('/courses', coursesRouter);
app.use('/students', studentsRouter);
app.use('/enrollments', enrollmentsRouter);

app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "השרת פועל בהצלחה",
        description: "מערכת ניהול מודולרית לקורסים ותלמידים מבוססת Express"
    });
});

app.listen(PORT, () => {
    console.log(chalk.blue.bold('--------------------------------------------------'));
    console.log(chalk.green.bold(`🚀 השרת עלה בהצלחה ומקשיב בכתובת: http://localhost:${PORT}`));
    console.log(chalk.blue.bold('--------------------------------------------------'));
});