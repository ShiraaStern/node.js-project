const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'פיתוח Frontend ברמת מומחה', description: 'לימוד מעמיק של React ו-JavaScript' },
    { id: 2, name: 'מבוא ל-Node.js ו-Backend', description: 'בניית שרתים, מערכת קבצים ופיתוח API' },
    { id: 3, name: 'ארכיטקטורת ענן ו-DevOps', description: 'פריסת אפליקציות וניהול שרתים' }
];

// 1. GET - קבלת כל הקורסים
router.get('/', (req, res) => {
    res.json(courses);
});

// 2. GET - קבלת קורס בודד לפי מזהה
router.get('/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const foundCourse = courses.find(c => c.id === courseId);
    if (!foundCourse) {
        return res.status(404).json({ message: "הקורס לא נמצא" });
    }
    res.json(foundCourse);
});

// 3. POST - הוספת קורס חדש
router.post('/', (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ message: "שם הקורס הוא שדה חובה" });
    }
    const newCourse = {
        id: courses.length + 1,
        name: req.body.name,
        description: req.body.description || ''
    };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

// 4. PUT - עדכון קורס קיים
router.put('/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const foundCourse = courses.find(c => c.id === courseId);

    if (!foundCourse) {
        return res.status(404).json({ message: "הקורס לא נמצא" });
    }
    if (!req.body.name) {
        return res.status(400).json({ message: "שם הקורס הוא שדה חובה" });
    }

    foundCourse.name = req.body.name;
    foundCourse.description = req.body.description || foundCourse.description;
    res.json(foundCourse);
});

// 5. DELETE - מחיקת קורס
router.delete('/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const courseIndex = courses.findIndex(c => c.id === courseId);

    if (courseIndex === -1) {
        return res.status(404).json({ message: "הקורס לא נמצא" });
    }

    courses.splice(courseIndex, 1);
    res.json({ message: "הקורס נמחק בהצלחה" });
});

module.exports = router;