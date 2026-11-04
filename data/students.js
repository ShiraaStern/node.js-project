const fs = require('fs').promises;
const path = require('path');

const studentsFile = path.join(__dirname, 'students.json');

async function getAll() {
    const contents = await fs.readFile(studentsFile, 'utf8');
    return JSON.parse(contents);
}

async function getById(id) {
    const students = await getAll();
    return students.find(student => student.id === id);
}

async function add(student) {
    const students = await getAll();
    students.push(student);
    await fs.writeFile(studentsFile, JSON.stringify(students, null, 2));
    return student;
}

async function update(student) {
    const students = await getAll();
    const index = students.findIndex(item => item.id === student.id);
    if (index === -1) return false;
    students[index] = student;
    await fs.writeFile(studentsFile, JSON.stringify(students, null, 2));
    return true;
}

async function remove(id) {
    const students = await getAll();
    const filteredStudents = students.filter(student => student.id !== id);
    if (filteredStudents.length === students.length) return false;
    await fs.writeFile(studentsFile, JSON.stringify(filteredStudents, null, 2));
    return true;
}

module.exports = { getAll, getById, add, update, remove };
