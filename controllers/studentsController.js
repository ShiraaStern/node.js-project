const studentsService = require('../services/studentsService');

function handleServerError(res, error) {
    console.error('Students controller error:', error);
    res.status(500).json({ message: "שגיאת שרת בטיפול בתלמידים" });
}

function handleGetAll(req, res) {
    studentsService.getAllStudents()
        .then(students => res.json(students))
        .catch(error => handleServerError(res, error));
}

function handleGetById(req, res) {
    studentsService.getStudentById(parseInt(req.params.id))
        .then(student => {
            if (!student) return res.status(404).json({ message: "התלמיד לא נמצא" });
            res.json(student);
        })
        .catch(error => handleServerError(res, error));
}

function handleCreate(req, res) {
    studentsService.createStudent(req.body.name, req.body.email)
        .then(newStudent => {
            if (!newStudent) return res.status(400).json({ message: "שם ואימייל הם שדות חובה" });
            res.status(201).json(newStudent);
        })
        .catch(error => handleServerError(res, error));
}

function handleUpdate(req, res) {
    studentsService.updateStudent(parseInt(req.params.id), req.body.name, req.body.email)
        .then(result => {
            if (result.error === 'NOT_FOUND') return res.status(404).json({ message: "התלמיד לא נמצא" });
            if (result.error === 'INVALID_DATA') return res.status(400).json({ message: "חסרים שדות חובה" });
            res.json(result.data);
        })
        .catch(error => handleServerError(res, error));
}

function handleDelete(req, res) {
    studentsService.deleteStudent(parseInt(req.params.id))
        .then(success => {
            if (!success) return res.status(404).json({ message: "התלמיד לא נמצא" });
            res.json({ message: "התלמיד נמחק בהצלחה" });
        })
        .catch(error => handleServerError(res, error));
}

module.exports = { handleGetAll, handleGetById, handleCreate, handleUpdate, handleDelete };
