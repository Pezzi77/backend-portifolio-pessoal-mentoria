const jwt = require('jsonwebtoken');
const store = require('../models/inMemoryStore');

const JWT_SECRET = process.env.JWT_SECRET || 'mentor-secret';

const registerInstructor = ({ name, email, password }) => {
  const existing = store.getUserByEmail(email);
  if (existing) {
    const error = new Error('E-mail já cadastrado');
    error.statusCode = 409;
    throw error;
  }

  const user = {
    id: `instrutor-${Date.now()}`,
    name,
    email,
    password,
    role: 'instrutor'
  };

  store.createUser(user);
  return user;
};

const registerStudent = ({ name, email, password, age, height, weight }) => {
  const existing = store.getUserByEmail(email);
  if (existing) {
    const error = new Error('E-mail já cadastrado');
    error.statusCode = 409;
    throw error;
  }

  const user = {
    id: `aluno-${Date.now()}`,
    name,
    email,
    password,
    age,
    height,
    weight,
    role: 'aluno'
  };

  store.createUser(user);
  return user;
};

const login = ({ email, password }) => {
  const user = store.getUserByEmail(email);
  if (!user || user.password !== password) {
    const error = new Error('Credenciais inválidas');
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
  return { token, user };
};

const getStudentById = (id) => store.getUserById(id);

const getAllStudents = () => store.getUsers().filter((user) => user.role === 'aluno');

const createStudentSheet = (studentId, sheet) => {
  const student = getStudentById(studentId);
  if (!student) {
    const error = new Error('Aluno não encontrado');
    error.statusCode = 404;
    throw error;
  }

  const assignedSheet = store.createStudentSheet(studentId, sheet);
  return { student, sheet: assignedSheet.sheet };
};

const updateStudentSheet = (studentId, sheet) => {
  const student = getStudentById(studentId);
  if (!student) {
    const error = new Error('Aluno não encontrado');
    error.statusCode = 404;
    throw error;
  }

  const updatedSheet = store.updateStudentSheet(studentId, sheet);
  return { student, sheet: updatedSheet.sheet };
};

const getStudentSheet = (id) => {
  const student = getStudentById(id);
  if (!student) {
    const error = new Error('Aluno não encontrado');
    error.statusCode = 404;
    throw error;
  }

  const sheet = store.getStudentSheet(id) || store.getSheetTemplate();
  return {
    student,
    sheet
  };
};

const registerFrequency = (studentId, date) => {
  const student = getStudentById(studentId);
  if (!student) {
    const error = new Error('Aluno não encontrado');
    error.statusCode = 404;
    throw error;
  }

  const frequency = store.addFrequency(studentId, date);
  return { studentId, date, frequency };
};

const getFrequencies = (studentId) => {
  const student = getStudentById(studentId);
  if (!student) {
    const error = new Error('Aluno não encontrado');
    error.statusCode = 404;
    throw error;
  }

  const frequencies = store.getFrequenciesByStudent(studentId);
  return frequencies;
};

module.exports = {
  registerInstructor,
  registerStudent,
  login,
  getStudentById,
  getAllStudents,
  getStudentSheet,
  createStudentSheet,
  updateStudentSheet,
  registerFrequency
  ,getFrequencies
};
