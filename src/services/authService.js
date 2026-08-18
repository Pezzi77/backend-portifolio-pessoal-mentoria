const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const store = require('../models/inMemoryStore');

const JWT_SECRET = process.env.JWT_SECRET || 'mentor-secret';
const SALT_ROUNDS = 10;

// Remove o campo password antes de expor o usuário pela API.
const omitPassword = (user) => {
  if (!user) return user;
  const { password, ...rest } = user;
  return rest;
};

const registerInstructor = async ({ name, email, password }) => {
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
    password: await bcrypt.hash(password, SALT_ROUNDS),
    role: 'instrutor'
  };

  store.createUser(user);
  return omitPassword(user);
};

const registerStudent = async ({ name, email, password, age, height, weight }) => {
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
    password: await bcrypt.hash(password, SALT_ROUNDS),
    age,
    height,
    weight,
    role: 'aluno'
  };

  store.createUser(user);
  return omitPassword(user);
};

const login = async ({ email, password }) => {
  const user = store.getUserByEmail(email);
  // Mesma mensagem para e-mail inexistente e senha errada:
  // não revela se o e-mail está cadastrado.
  const senhaConfere = user && (await bcrypt.compare(password, user.password));
  if (!senhaConfere) {
    const error = new Error('Credenciais inválidas');
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
  return { token, user: omitPassword(user) };
};

const getStudentById = (id) => omitPassword(store.getUserById(id));

const getAllStudents = () =>
  store.getUsers().filter((user) => user.role === 'aluno').map(omitPassword);

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
