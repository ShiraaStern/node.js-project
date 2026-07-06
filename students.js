const express = require('express');
const router = express.Router();

// 1. מערך זמני של תלמידים
const students = [
    { id: 1, name: 'ישראל ישראלי', email: 'israel@example.com' },
    { id: 2, name: 'רחלי כהן', email: 'racheli@example.com' }
];

// 2. מערך זמני של רישומים (ממוקם כאן כדי שלא נצטרך קובץ נפרד!)
const registrations = [
    { id: 1, studentId: 1, courseId: 1 }, 
    { id: 2, studentId: 2, courseId: 2 }  
];

// ==========================================
//          CRUD תלמידים (Students)
// ==========================================

// GET - קבלת כל התלמידים
router.get('/', (req, res) => {
    res.json(students);
});

// GET - קבלת תלמיד בודד לפי ID
router.get('/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const foundStudent = students.find(s => s.id === studentId);

    if (!foundStudent) {
        return res.status(404).json({ message: "התלמיד לא נמצא" });
    }
    res.json(foundStudent);
});

// POST - הוספת תלמיד חדש
router.post('/', (req, res) => {
    if (!req.body.name || !req.body.email) {
        return res.status(400).json({ message: "שם ואימייל הם שדות חובה" });
    }

    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        email: req.body.email
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
});

// PUT - עדכון תלמיד קיים
router.put('/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const foundStudent = students.find(s => s.id === studentId);

    if (!foundStudent) {
        return res.status(404).json({ message: "התלמיד לא נמצא" });
    }

    if (!req.body.name || !req.body.email) {
        return res.status(400).json({ message: "שם ואימייל הם שדות חובה" });
    }

    foundStudent.name = req.body.name;
    foundStudent.email = req.body.email;

    res.json(foundStudent);
});

// DELETE - מחיקת תלמיד
router.delete('/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex === -1) {
        return res.status(404).json({ message: "התלמיד לא נמצא" });
    }

    students.splice(studentIndex, 1);
    res.json({ message: "התלמיד נמחק בהצלחה" });
});


// ==========================================
//          CRUD רישום (Registrations)
//       (יושב כאן בתוך קובץ התלמידים)
// ==========================================

// GET - קבלת כל הרישומים (נתיב: /students/registrations/all)
router.get('/registrations/all', (req, res) => {
    res.json(registrations);
});

// GET - קבלת רישום בודד לפי ID
router.get('/registrations/:id', (req, res) => {
    const regId = parseInt(req.params.id);
    const foundReg = registrations.find(r => r.id === regId);

    if (!foundReg) {
        return res.status(404).json({ message: "הרישום לא נמצא" });
    }
    res.json(foundReg);
});

// POST - יצירת רישום חדש (הרשמת תלמיד לקורס)
router.post('/registrations', (req, res) => {
    if (!req.body.studentId || !req.body.courseId) {
        return res.status(400).json({ message: "מזהה תלמיד ומזהה קורס הם שדות חובה" });
    }

    const newRegistration = {
        id: registrations.length + 1,
        studentId: parseInt(req.body.studentId),
        courseId: parseInt(req.body.courseId)
    };

    registrations.push(newRegistration);
    res.status(201).json(newRegistration);
});

// PUT - עדכון רישום קיים
router.put('/registrations/:id', (req, res) => {
    const regId = parseInt(req.params.id);
    const foundReg = registrations.find(r => r.id === regId);

    if (!foundReg) {
        return res.status(404).json({ message: "הרישום לא נמצא" });
    }

    if (!req.body.studentId || !req.body.courseId) {
        return res.status(400).json({ message: "מזהה תלמיד ומזהה קורס הם שדות חובה" });
    }

    foundReg.studentId = parseInt(req.body.studentId);
    foundReg.courseId = parseInt(req.body.courseId);

    res.json(foundReg);
});

// DELETE - ביטול רישום (מחיקה)
router.delete('/registrations/:id', (req, res) => {
    const regId = parseInt(req.params.id);
    const regIndex = registrations.findIndex(r => r.id === regId);

    if (regIndex === -1) {
        return res.status(404).json({ message: "הרישום לא נמצא" });
    }

    registrations.splice(regIndex, 1);
    res.json({ message: "הרישום בוטל בהצלחה" });
});

module.exports = router;