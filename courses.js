const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'פיתוח Frontend ברמת מומחה', description: 'לימוד מעמיק של React ו-JavaScript' },
    { id: 2, name: 'מבוא ל-Node.js ו-Backend', description: 'בניית שרתים, מערכת קבצים ופיתוח API' },
    { id: 3, name: 'ארכיטקטורת ענן ו-DevOps', description: 'פריסת אפליקציות וניהול שרתים' }
];

// http://localhost:3000/courses
router.get('/', (req, res) => {
    res.json(courses);
});

module.exports = router;