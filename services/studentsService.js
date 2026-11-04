const studentsData = require('../data/students');

function getAllStudents() {
    return studentsData.getAll();
}

function getStudentById(id) {
    return studentsData.getById(id);
}

function createStudent(name, email) {
    if (!name || !email) return Promise.resolve(null);
    return studentsData.getAll().then(students => {
        const maxId = students.reduce((max, student) => (student.id > max ? student.id : max), 0);
        const newStudent = { id: maxId + 1, name, email };
        return studentsData.add(newStudent);
    });
}

function updateStudent(id, name, email) {
    if (!name || !email) return Promise.resolve({ error: 'INVALID_DATA' });
    return studentsData.getById(id).then(foundStudent => {
        if (!foundStudent) return { error: 'NOT_FOUND' };
        foundStudent.name = name;
        foundStudent.email = email;
        return studentsData.update(foundStudent).then(() => ({ data: foundStudent }));
    });
}

function deleteStudent(id) {
    return studentsData.remove(id);
}

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };