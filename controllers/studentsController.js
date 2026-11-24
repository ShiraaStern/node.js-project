const studentsService = require('../services/studentsService');

function handleServerError(res, error) {
    console.error('Students controller error:', error);
    return res.status(500).json({
        message: "שגיאת שרת בטיפול בתלמידים",
        details: (error instanceof Error ? error.message : String(error)).slice(0, 200)
    });
}

async function handleGetAll(req, res) {
    try {
        const students = await studentsService.getAllStudents();
        return res.json(students);
    } catch (error) {
        return handleServerError(res, error);
    }
}

async function handleGetById(req, res) {
    try {
        const student = await studentsService.getStudentById(parseInt(req.params.id));
        if (!student) return res.status(404).json({ message: "התלמיד לא נמצא" });
        return res.json(student);
    } catch (error) {
        return handleServerError(res, error);
    }
}

async function handleCreate(req, res) {
    try {
        const newStudent = await studentsService.createStudent(req.body.name, req.body.email);
        if (!newStudent) return res.status(400).json({ message: "שם ואימייל הם שדות חובה" });
        return res.status(201).json(newStudent);
    } catch (error) {
        return handleServerError(res, error);
    }
}

async function handleUpdate(req, res) {
    try {
        const result = await studentsService.updateStudent(
            parseInt(req.params.id),
            req.body.name,
            req.body.email
        );
        if (result.error === 'NOT_FOUND') return res.status(404).json({ message: "התלמיד לא נמצא" });
        if (result.error === 'INVALID_DATA') return res.status(400).json({ message: "חסרים שדות חובה" });
        return res.json(result.data);
    } catch (error) {
        return handleServerError(res, error);
    }
}

async function handleDelete(req, res) {
    try {
        const success = await studentsService.deleteStudent(parseInt(req.params.id));
        if (!success) return res.status(404).json({ message: "התלמיד לא נמצא" });
        return res.json({ message: "התלמיד נמחק בהצלחה" });
    } catch (error) {
        return handleServerError(res, error);
    }
}

module.exports = { handleGetAll, handleGetById, handleCreate, handleUpdate, handleDelete };
