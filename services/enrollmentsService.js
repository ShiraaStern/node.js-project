const enrollmentsData = require('../data/enrollments');

function getAllRegistrations() {
    return enrollmentsData.getAll();
}

function getRegistrationById(id) {
    return enrollmentsData.getById(id);
}

function createRegistration(studentId, courseId) {
    if (!studentId || !courseId) return Promise.resolve(null);
    return enrollmentsData.getAll().then(registrations => {
        const maxId = registrations.reduce((max, registration) => (registration.id > max ? registration.id : max), 0);
        const newRegistration = {
            id: maxId + 1,
            studentId: parseInt(studentId),
            courseId: parseInt(courseId)
        };
        return enrollmentsData.add(newRegistration);
    });
}

function updateRegistration(id, studentId, courseId) {
    if (!studentId || !courseId) return Promise.resolve({ error: 'INVALID_DATA' });
    return enrollmentsData.getById(id).then(foundReg => {
        if (!foundReg) return { error: 'NOT_FOUND' };
        foundReg.studentId = parseInt(studentId);
        foundReg.courseId = parseInt(courseId);
        return enrollmentsData.update(foundReg).then(() => ({ data: foundReg }));
    });
}

function deleteRegistration(id) {
    return enrollmentsData.remove(id);
}

module.exports = { getAllRegistrations, getRegistrationById, createRegistration, updateRegistration, deleteRegistration };