let registrations = [
    { id: 1, studentId: 1, courseId: 1 }, 
    { id: 2, studentId: 2, courseId: 2 }  
];

function getAll() { return registrations; }
function getById(id) { return registrations.find(r => r.id === id); }
function add(reg) { registrations.push(reg); return reg; }
function remove(index) { registrations.splice(index, 1); }
function getIndex(id) { return registrations.findIndex(r => r.id === id); }

module.exports = { getAll, getById, add, remove, getIndex };