const coursesService = require('../services/coursesService');

function handleGetAll(req, res) {
    res.json(coursesService.getAllCourses());
}

function handleGetById(req, res) {
    const course = coursesService.getCourseById(parseInt(req.params.id));
    if (!course) return res.status(404).json({ message: "הקורס לא נמצא" });
    res.json(course);
}

function handleCreate(req, res) {
    const newCourse = coursesService.createCourse(req.body.name, req.body.description);
    if (!newCourse) return res.status(400).json({ message: "שם הקורס הוא שדה חובה" });
    res.status(201).json(newCourse);
}

function handleUpdate(req, res) {
    const updated = coursesService.updateCourse(parseInt(req.params.id), req.body.name, req.body.description);
    if (!updated) return res.status(400).json({ message: "הקורס לא נמצא או שחסרים שדות חובה" });
    res.json(updated);
}

function handleDelete(req, res) {
    const success = coursesService.deleteCourse(parseInt(req.params.id));
    if (!success) return res.status(404).json({ message: "הקורס לא נמצא" });
    res.json({ message: "הקורס נמחק בהצלחה" });
}

module.exports = { handleGetAll, handleGetById, handleCreate, handleUpdate, handleDelete };