const coursesService = require('../services/coursesService');

function handleServerError(res, error) {
    console.error('Courses controller error:', error);
    return res.status(500).json({
        message: "שגיאת שרת בטיפול בקורסים",
        details: (error instanceof Error ? error.message : String(error)).slice(0, 200)
    });
}

async function handleGetAll(req, res) {
    try {
        const courses = await coursesService.getAllCourses();
        return res.json(courses);
    } catch (error) {
        return handleServerError(res, error);
    }
}

async function handleGetById(req, res) {
    try {
        const course = await coursesService.getCourseById(parseInt(req.params.id));
        if (!course) return res.status(404).json({ message: "הקורס לא נמצא" });
        return res.json(course);
    } catch (error) {
        return handleServerError(res, error);
    }
}

async function handleCreate(req, res) {
    try {
        const newCourse = await coursesService.createCourse(req.body.name, req.body.description);
        if (!newCourse) return res.status(400).json({ message: "שם הקורס הוא שדה חובה" });
        return res.status(201).json(newCourse);
    } catch (error) {
        return handleServerError(res, error);
    }
}

async function handleUpdate(req, res) {
    try {
        const result = await coursesService.updateCourse(
            parseInt(req.params.id),
            req.body.name,
            req.body.description
        );
        if (result.error === 'NOT_FOUND') return res.status(404).json({ message: "הקורס לא נמצא" });
        if (result.error === 'INVALID_DATA') return res.status(400).json({ message: "חסרים שדות חובה" });
        return res.json(result.data);
    } catch (error) {
        return handleServerError(res, error);
    }
}

async function handleDelete(req, res) {
    try {
        const success = await coursesService.deleteCourse(parseInt(req.params.id));
        if (!success) return res.status(404).json({ message: "הקורס לא נמצא" });
        return res.json({ message: "הקורס נמחק בהצלחה" });
    } catch (error) {
        return handleServerError(res, error);
    }
}

module.exports = { handleGetAll, handleGetById, handleCreate, handleUpdate, handleDelete };
