const studentsData = require('../data/students');

function getAllStudents() {
    return studentsData.getAll();
}

function getStudentById(id) {
    return studentsData.getById(id);
}

function createStudent(name, email) {
    if (!name || !email) return null;
    const students = studentsData.getAll();
    const maxId = students.reduce((max, s) => (s.id > max ? s.id : max), 0);
    const newStudent = {
        id: maxId + 1,
        name,
        email
    };
    return studentsData.add(newStudent);
}

function updateStudent(id, name, email) {
    const foundStudent = studentsData.getById(id);
    if (!foundStudent) return { error: 'NOT_FOUND' };
    if (!name || !email) return { error: 'INVALID_DATA' };

    foundStudent.name = name;
    foundStudent.email = email;
    return { data: foundStudent };
}

function deleteStudent(id) {
    const index = studentsData.getIndex(id);
    if (index === -1) return false;
    studentsData.remove(index);
    return true;
}

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };