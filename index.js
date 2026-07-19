const express = require('express');
const chalk = require('chalk');

// ייבוא הראוטרים החדשים והמסודרים
const coursesRouter = require('./routes/courses');
const studentsRouter = require('./routes/students');
const enrollmentsRouter = require('./routes/enrollments');

const app = express();
const PORT = 3000;

app.use(express.json());

// חיבור הראוטרים לנתיבים הראשיים שלהם
app.use('/courses', coursesRouter);
app.use('/students', studentsRouter);
// הרישומים מופרדים כעת בצורה נקייה לישות משלהם!
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