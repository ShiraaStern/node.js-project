const express = require('express');
const chalk = require('chalk');

// ייבוא הראוטרים של הקורסים והתלמידים
const coursesRouter = require('./courses');
const studentsRouter = require('./students');

const app = express();
const PORT = 3000;

// חיבור הראוטרים לנתיבים הייעודיים שלהם
app.use('/courses', coursesRouter);
app.use('/students', studentsRouter);

// http://localhost:3000 - נתיב ראשי שמחזיר אובייקט JSON פשוט
app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "השרת פועל בהצלחה",
        description: "מערכת ניהול מודולרית לקורסים ותלמידים מבוססת Express"
    });
});

// הפעלת השרת
app.listen(PORT, () => {
    console.log(chalk.blue.bold('--------------------------------------------------'));
    console.log(chalk.green.bold(`🚀 השרת עלה בהצלחה ומקשיב בכתובת: http://localhost:${PORT}`));
    console.log(chalk.blue.bold('--------------------------------------------------'));
});