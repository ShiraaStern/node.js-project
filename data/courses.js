const fs = require('fs').promises;
const path = require('path');

const coursesFile = path.join(__dirname, 'courses.json');

async function getAll() {
    const contents = await fs.readFile(coursesFile, 'utf8');
    return JSON.parse(contents);
}

async function getById(id) {
    const courses = await getAll();
    return courses.find(course => course.id === id);
}

async function add(course) {
    const courses = await getAll();
    courses.push(course);
    await fs.writeFile(coursesFile, JSON.stringify(courses, null, 2));
    return course;
}

async function update(course) {
    const courses = await getAll();
    const index = courses.findIndex(item => item.id === course.id);
    if (index === -1) return false;
    courses[index] = course;
    await fs.writeFile(coursesFile, JSON.stringify(courses, null, 2));
    return true;
}

async function remove(id) {
    const courses = await getAll();
    const filteredCourses = courses.filter(course => course.id !== id);
    if (filteredCourses.length === courses.length) return false;
    await fs.writeFile(coursesFile, JSON.stringify(filteredCourses, null, 2));
    return true;
}

module.exports = { getAll, getById, add, update, remove };
