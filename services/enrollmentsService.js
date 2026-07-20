const enrollmentsData = require('../data/enrollments');

function getAllRegistrations() {
    return enrollmentsData.getAll();
}

function getRegistrationById(id) {
    return enrollmentsData.getById(id);
}

function createRegistration(studentId, courseId) {
    if (!studentId || !courseId) return null;
    const registrations = enrollmentsData.getAll();
    const maxId = registrations.reduce((max, r) => (r.id > max ? r.id : max), 0);
    const newRegistration = {
        id: maxId + 1,
        studentId: parseInt(studentId),
        courseId: parseInt(courseId)
    };
    return enrollmentsData.add(newRegistration);
}

function updateRegistration(id, studentId, courseId) {
    const foundReg = enrollmentsData.getById(id);
    if (!foundReg) return { error: 'NOT_FOUND' };
    if (!studentId || !courseId) return { error: 'INVALID_DATA' };

    foundReg.studentId = parseInt(studentId);
    foundReg.courseId = parseInt(courseId);
    return { data: foundReg };
}

function deleteRegistration(id) {
    const index = enrollmentsData.getIndex(id);
    if (index === -1) return false;
    enrollmentsData.remove(index);
    return true;
}

module.exports = { getAllRegistrations, getRegistrationById, createRegistration, updateRegistration, deleteRegistration };