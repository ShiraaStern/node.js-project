const enrollmentsService = require('../services/enrollmentsService');

function handleServerError(res, error) {
    console.error('Enrollments controller error:', error);
    return res.status(500).json({
        message: "שגיאת שרת בטיפול בהרשמות",
        details: (error instanceof Error ? error.message : String(error)).slice(0, 200)
    });
}

async function handleGetAll(req, res) {
    try {
        const registrations = await enrollmentsService.getAllRegistrations();
        return res.json(registrations);
    } catch (error) {
        return handleServerError(res, error);
    }
}

async function handleGetById(req, res) {
    try {
        const registration = await enrollmentsService.getRegistrationById(parseInt(req.params.id));
        if (!registration) return res.status(404).json({ message: "הרישום לא נמצא" });
        return res.json(registration);
    } catch (error) {
        return handleServerError(res, error);
    }
}

async function handleCreate(req, res) {
    try {
        const newRegistration = await enrollmentsService.createRegistration(req.body.studentId, req.body.courseId);
        if (!newRegistration) return res.status(400).json({ message: "מזהי תלמיד וקורס חייבים להיות מספרים שלמים וחיוביים" });
        return res.status(201).json(newRegistration);
    } catch (error) {
        return handleServerError(res, error);
    }
}

async function handleUpdate(req, res) {
    try {
        const result = await enrollmentsService.updateRegistration(
            parseInt(req.params.id),
            req.body.studentId,
            req.body.courseId
        );
        if (result.error === 'NOT_FOUND') return res.status(404).json({ message: "הרישום לא נמצא" });
        if (result.error === 'INVALID_DATA') return res.status(400).json({ message: "מזהי תלמיד וקורס חייבים להיות מספרים שלמים וחיוביים" });
        return res.json(result.data);
    } catch (error) {
        return handleServerError(res, error);
    }
}

async function handleDelete(req, res) {
    try {
        const success = await enrollmentsService.deleteRegistration(parseInt(req.params.id));
        if (!success) return res.status(404).json({ message: "הרישום לא נמצא" });
        return res.json({ message: "הרישום בוטל בהצלחה" });
    } catch (error) {
        return handleServerError(res, error);
    }
}

module.exports = { handleGetAll, handleGetById, handleCreate, handleUpdate, handleDelete };
