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
    const updated = enrollmentsService.updateRegistration(parseInt(req.params.id), req.body.studentId, req.body.courseId);
    if (!updated) return res.status(400).json({ message: "הרישום לא נמצא או שחסרים שדות חובה" });
    res.json(updated);
}

function handleDelete(req, res) {
    const success = enrollmentsService.deleteRegistration(parseInt(req.params.id));
    if (!success) return res.status(404).json({ message: "הרישום לא נמצא" });
    res.json({ message: "הרישום בוטל בהצלחה" });
}

module.exports = { handleGetAll, handleGetById, handleCreate, handleUpdate, handleDelete };