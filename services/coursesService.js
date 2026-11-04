const coursesData = require('../data/courses');

function getAllCourses() {
    return coursesData.getAll();
}

function getCourseById(id) {
    return coursesData.getById(id);
}

async function createCourse(name, description) {
    if (!name) return null;
    const courses = await coursesData.getAll();
    const maxId = courses.reduce((max, c) => (c.id > max ? c.id : max), 0);
    const newCourse = {
        id: maxId + 1,
        name,
        description: description || ''
    };
    return coursesData.add(newCourse);
}

async function updateCourse(id, name, description) {
    const foundCourse = await coursesData.getById(id);
    if (!foundCourse) return { error: 'NOT_FOUND' };
    if (!name) return { error: 'INVALID_DATA' };

    foundCourse.name = name;
    foundCourse.description = description !== undefined ? description : foundCourse.description;
    return coursesData.update(foundCourse).then(() => ({ data: foundCourse }));
}

async function deleteCourse(id) {
    return coursesData.remove(id);
}

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };