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
    const newCourse = {
        id: courses.length + 1,
        name,
        description: description || ''
    };
    return coursesData.add(newCourse);
}

function updateCourse(id, name, description) {
    const foundCourse = coursesData.getById(id);
    if (!foundCourse || !name) return null;

    foundCourse.name = name;
    foundCourse.description = description || foundCourse.description;
    return foundCourse;
}

function deleteCourse(id) {
    const index = coursesData.getIndex(id);
    if (index === -1) return false;
    coursesData.remove(index);
    return true;
}

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };