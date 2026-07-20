const enrollmentsService = require('../services/enrollmentsService');

function handleGetAll(req, res) {
    res.json(enrollmentsService.getAllRegistrations());
}

function handleGetById(req, res) {
    const reg = enrollmentsService.getRegistrationById(parseInt(req.params.id));
    if (!reg) return res.status(404).json({ message: "הרישום לא נמצא" });
    res.json(reg);
}

function handleCreate(req, res) {
    const newReg = enrollmentsService.createRegistration(req.body.studentId, req.body.courseId);
    if (!newReg) return res.status(400).json({ message: "מזהה תלמיד ומזהה קורס הם שדות חובה" });
    res.status(201).json(newReg);
}

function handleUpdate(req, res) {
    const result = enrollmentsService.updateRegistration(parseInt(req.params.id), req.body.studentId, req.body.courseId);
    if (result.error === 'NOT_FOUND') return res.status(404).json({ message: "הרישום לא נמצא" });
    if (result.error === 'INVALID_DATA') return res.status(400).json({ message: "חסרים שדות חובה" });
    res.json(result.data);
}

function handleDelete(req, res) {
    const success = enrollmentsService.deleteRegistration(parseInt(req.params.id));
    if (!success) return res.status(404).json({ message: "הרישום לא נמצא" });
    res.json({ message: "הרישום בוטל בהצלחה" });
}

module.exports = { handleGetAll, handleGetById, handleCreate, handleUpdate, handleDelete };