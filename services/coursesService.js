const coursesData = require('../data/courses');

function getAllCourses() {
    return coursesData.getAll();
}

function getCourseById(id) {
    return coursesData.getById(id);
}

function createCourse(name, description) {
    if (!name) return null;
    const courses = coursesData.getAll();
    const maxId = courses.reduce((max, c) => (c.id > max ? c.id : max), 0);
    const newCourse = {
        id: maxId + 1,
        name,
        description: description || ''
    };
    return coursesData.add(newCourse);
}

function updateCourse(id, name, description) {
    const foundCourse = coursesData.getById(id);
    if (!foundCourse) return { error: 'NOT_FOUND' };
    if (!name) return { error: 'INVALID_DATA' };

    foundCourse.name = name;
    foundCourse.description = description !== undefined ? description : foundCourse.description;
    return { data: foundCourse };
}

function deleteCourse(id) {
    const index = coursesData.getIndex(id);
    if (index === -1) return false;
    coursesData.remove(index);
    return true;
}

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };