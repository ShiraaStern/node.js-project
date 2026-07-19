const studentsService = require('../services/studentsService');

function handleGetAll(req, res) {
    res.json(studentsService.getAllStudents());
}

function handleGetById(req, res) {
    const student = studentsService.getStudentById(parseInt(req.params.id));
    if (!student) return res.status(404).json({ message: "התלמיד לא נמצא" });
    res.json(student);
}

function handleCreate(req, res) {
    const newStudent = studentsService.createStudent(req.body.name, req.body.email);
    if (!newStudent) return res.status(400).json({ message: "שם ואימייל הם שדות חובה" });
    res.status(201).json(newStudent);
}

function handleUpdate(req, res) {
    const updated = studentsService.updateStudent(parseInt(req.params.id), req.body.name, req.body.email);
    if (!updated) return res.status(400).json({ message: "התלמיד לא נמצא או שחסרים שדות חובה" });
    res.json(updated);
}

function handleDelete(req, res) {
    const success = studentsService.deleteStudent(parseInt(req.params.id));
    if (!success) return res.status(404).json({ message: "התלמיד לא נמצא" });
    res.json({ message: "התלמיד נמחק בהצלחה" });
}

module.exports = { handleGetAll, handleGetById, handleCreate, handleUpdate, handleDelete };