const http = require('http');
const chalk = require('chalk');

const PORT = 3000;

// 1. מערך הקורסים
const courses = [
    { id: 1, name: 'פיתוח Frontend ברמת מומחה', description: 'לימוד מעמיק של React ו-JavaScript' },
    { id: 2, name: 'מבוא ל-Node.js ו-Backend', description: 'בניית שרתים, מערכת קבצים ופיתוח API' },
    { id: 3, name: 'ארכיטקטורת ענן ו-DevOps', description: 'פריסת אפליקציות וניהול שרתים' }
];

// 2. יצירת השרת
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(courses));
});

// 3. הפעלת השרת והדפסת הלוגים הצבעוניים בטרמינל
server.listen(PORT, () => {
    console.log(chalk.blue.bold('--------------------------------------------------'));
    console.log(chalk.green.bold(`🚀 השרת עלה בהצלחה ומקשיב בכתובת: http://localhost:${PORT}`));
    console.log(chalk.blue.bold('--------------------------------------------------'));
    
    // *** השורה החדשה שמדפיסה את רשימת הקורסים בצורה צבעונית ומעוצבת בטרמינל ***
    console.log(chalk.yellow.bold('📋 הנה רשימת הקורסים הקיימים במערכת:'));
    console.log(chalk.cyan(JSON.stringify(courses, null, 2))); 
    
    console.log(chalk.blue.bold('--------------------------------------------------'));
});