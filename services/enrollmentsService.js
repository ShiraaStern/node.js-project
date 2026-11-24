const enrollmentsData = require('../data/enrollments');

function parsePositiveInteger(value) {
    if (typeof value !== 'number' && typeof value !== 'string') return null;
    if (typeof value === 'string' && value.trim() === '') return null;

    const parsedValue = Number(value);
    return Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue : null;
}

async function getAllRegistrations() {
    return await enrollmentsData.getAll();
}

async function getRegistrationById(id) {
    return await enrollmentsData.getById(id);
}

async function createRegistration(studentId, courseId) {
    const parsedStudentId = parsePositiveInteger(studentId);
    const parsedCourseId = parsePositiveInteger(courseId);
    if (parsedStudentId === null || parsedCourseId === null) return null;

    const registrations = await enrollmentsData.getAll();
    const maxId = registrations.reduce((max, registration) => (registration.id > max ? registration.id : max), 0);
    const newRegistration = {
        id: maxId + 1,
        studentId: parsedStudentId,
        courseId: parsedCourseId
    };
    return await enrollmentsData.add(newRegistration);
}

async function updateRegistration(id, studentId, courseId) {
    const parsedStudentId = parsePositiveInteger(studentId);
    const parsedCourseId = parsePositiveInteger(courseId);
    if (parsedStudentId === null || parsedCourseId === null) return { error: 'INVALID_DATA' };

    const foundReg = await enrollmentsData.getById(id);
    if (!foundReg) return { error: 'NOT_FOUND' };
    foundReg.studentId = parsedStudentId;
    foundReg.courseId = parsedCourseId;
    await enrollmentsData.update(foundReg);
    return { data: foundReg };
}

async function deleteRegistration(id) {
    return await enrollmentsData.remove(id);
}

module.exports = { getAllRegistrations, getRegistrationById, createRegistration, updateRegistration, deleteRegistration };