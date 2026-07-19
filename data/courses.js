let courses = [
    { id: 1, name: 'פיתוח Frontend ברמת מומחה', description: 'לימוד מעמיק של React ו-JavaScript' },
    { id: 2, name: 'מבוא ל-Node.js ו-Backend', description: 'בניית שרתים, מערכת קבצים ופיתוח API' },
    { id: 3, name: 'ארכיטקטורת ענן ו-DevOps', description: 'פריסת אפליקציות וניהול שרתים' }
];

function getAll() { return courses; }
function getById(id) { return courses.find(c => c.id === id); }
function add(course) { courses.push(course); return course; }
function remove(index) { courses.splice(index, 1); }
function getIndex(id) { return courses.findIndex(c => c.id === id); }

module.exports = { getAll, getById, add, remove, getIndex };