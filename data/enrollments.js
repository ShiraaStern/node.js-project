const fs = require('fs').promises;
const path = require('path');

const enrollmentsFile = path.join(__dirname, 'enrollments.json');

async function getAll() {
    const contents = await fs.readFile(enrollmentsFile, 'utf8');
    return JSON.parse(contents);
}

async function getById(id) {
    const enrollments = await getAll();
    return enrollments.find(enrollment => enrollment.id === id);
}

async function add(enrollment) {
    const enrollments = await getAll();
    enrollments.push(enrollment);
    await fs.writeFile(enrollmentsFile, JSON.stringify(enrollments, null, 2));
    return enrollment;
}

async function update(enrollment) {
    const enrollments = await getAll();
    const index = enrollments.findIndex(item => item.id === enrollment.id);
    if (index === -1) return false;
    enrollments[index] = enrollment;
    await fs.writeFile(enrollmentsFile, JSON.stringify(enrollments, null, 2));
    return true;
}

async function remove(id) {
    const enrollments = await getAll();
    const filteredEnrollments = enrollments.filter(item => item.id !== id);
    if (filteredEnrollments.length === enrollments.length) return false;
    await fs.writeFile(enrollmentsFile, JSON.stringify(filteredEnrollments, null, 2));
    return true;
}

module.exports = { getAll, getById, add, update, remove };
