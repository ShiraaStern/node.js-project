const enrollmentsService = require('../services/enrollmentsService');

function handleServerError(res, error) {
    console.error('Enrollments controller error:', error);
    res.status(500).json({ message: "שגיאת שרת בטיפול בהרשמות" });
}

function handleGetAll(req, res) {
    enrollmentsService.getAllRegistrations()
        .then(registrations => res.json(registrations))
        .catch(error => handleServerError(res, error));
}

function handleGetById(req, res) {
    enrollmentsService.getRegistrationById(parseInt(req.params.id))
        .then(registration => {
            if (!registration) return res.status(404).json({ message: "הרישום לא נמצא" });
            res.json(registration);
        })
        .catch(error => handleServerError(res, error));
}

function handleCreate(req, res) {
    enrollmentsService.createRegistration(req.body.studentId, req.body.courseId)
        .then(newRegistration => {
            if (!newRegistration) return res.status(400).json({ message: "מזהה תלמיד ומזהה קורס הם שדות חובה" });
            res.status(201).json(newRegistration);
        })
        .catch(error => handleServerError(res, error));
}

function handleUpdate(req, res) {
    enrollmentsService.updateRegistration(parseInt(req.params.id), req.body.studentId, req.body.courseId)
        .then(result => {
            if (result.error === 'NOT_FOUND') return res.status(404).json({ message: "הרישום לא נמצא" });
            if (result.error === 'INVALID_DATA') return res.status(400).json({ message: "חסרים שדות חובה" });
            res.json(result.data);
        })
        .catch(error => handleServerError(res, error));
}

function handleDelete(req, res) {
    enrollmentsService.deleteRegistration(parseInt(req.params.id))
        .then(success => {
            if (!success) return res.status(404).json({ message: "הרישום לא נמצא" });
            res.json({ message: "הרישום בוטל בהצלחה" });
        })
        .catch(error => handleServerError(res, error));
}

module.exports = { handleGetAll, handleGetById, handleCreate, handleUpdate, handleDelete };
