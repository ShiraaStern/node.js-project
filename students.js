const express = require('express');
const router = express.Router();

const students = [
    { id: 101, name: 'ישראל ישראלי', email: 'israel@example.com', enrolledCourseId: 1 },
    { id: 102, name: 'אברהם כהן', email: 'avraham@example.com', enrolledCourseId: 2 },
    { id: 103, name: 'משה לוי', email: 'moshe@example.com', enrolledCourseId: 1 }
];

// http://localhost:3000/students
router.get('/', (req, res) => {
    res.json(students);
});

module.exports = router;