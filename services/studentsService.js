const studentsData = require('../data/students');

async function getAllStudents() {
    return await studentsData.getAll();
}

async function getStudentById(id) {
    return await studentsData.getById(id);
}

async function createStudent(name, email) {
    if (!name || !email) return null;
    const students = await studentsData.getAll();
    const maxId = students.reduce((max, student) => (student.id > max ? student.id : max), 0);
    const newStudent = { id: maxId + 1, name, email };
    return await studentsData.add(newStudent);
}

async function updateStudent(id, name, email) {
    if (!name || !email) return { error: 'INVALID_DATA' };
    const foundStudent = await studentsData.getById(id);
    if (!foundStudent) return { error: 'NOT_FOUND' };
    foundStudent.name = name;
    foundStudent.email = email;
    await studentsData.update(foundStudent);
    return { data: foundStudent };
}

async function deleteStudent(id) {
    return await studentsData.remove(id);
}

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };