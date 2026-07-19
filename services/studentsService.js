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
    const newStudent = {
        id: students.length + 1,
        name,
        email
    };
    return studentsData.add(newStudent);
}

function updateStudent(id, name, email) {
    const foundStudent = studentsData.getById(id);
    if (!foundStudent || !name || !email) return null;

    foundStudent.name = name;
    foundStudent.email = email;
    return foundStudent;
}

function deleteStudent(id) {
    const index = studentsData.getIndex(id);
    if (index === -1) return false;
    studentsData.remove(index);
    return true;
}

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };