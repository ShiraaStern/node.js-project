const coursesService = require('../services/coursesService');

function handleServerError(res, error) {
    console.error('Courses controller error:', error);
    res.status(500).json({ message: "שגיאת שרת בטיפול בקורסים" });
}

function handleGetAll(req, res) {
    coursesService.getAllCourses()
        .then(courses => res.json(courses))
        .catch(error => handleServerError(res, error));
}

function handleGetById(req, res) {
    coursesService.getCourseById(parseInt(req.params.id))
        .then(course => {
            if (!course) return res.status(404).json({ message: "הקורס לא נמצא" });
            res.json(course);
        })
        .catch(error => handleServerError(res, error));
}

function handleCreate(req, res) {
    coursesService.createCourse(req.body.name, req.body.description)
        .then(newCourse => {
            if (!newCourse) return res.status(400).json({ message: "שם הקורס הוא שדה חובה" });
            res.status(201).json(newCourse);
        })
        .catch(error => handleServerError(res, error));
}

function handleUpdate(req, res) {
    coursesService.updateCourse(parseInt(req.params.id), req.body.name, req.body.description)
        .then(result => {
            if (result.error === 'NOT_FOUND') return res.status(404).json({ message: "הקורס לא נמצא" });
            if (result.error === 'INVALID_DATA') return res.status(400).json({ message: "חסרים שדות חובה" });
            res.json(result.data);
        })
        .catch(error => handleServerError(res, error));
}

function handleDelete(req, res) {
    coursesService.deleteCourse(parseInt(req.params.id))
        .then(success => {
            if (!success) return res.status(404).json({ message: "הקורס לא נמצא" });
            res.json({ message: "הקורס נמחק בהצלחה" });
        })
        .catch(error => handleServerError(res, error));
}

module.exports = { handleGetAll, handleGetById, handleCreate, handleUpdate, handleDelete };
