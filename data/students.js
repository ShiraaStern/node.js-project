let students = [
    { id: 1, name: 'ישראל ישראלי', email: 'israel@example.com' },
    { id: 2, name: 'רחלי כהן', email: 'racheli@example.com' }
];

function getAll() { return students; }
function getById(id) { return students.find(s => s.id === id); }
function add(student) { students.push(student); return student; }
function remove(index) { students.splice(index, 1); }
function getIndex(id) { return students.findIndex(s => s.id === id); }

module.exports = { getAll, getById, add, remove, getIndex };