const bcrypt = require('bcryptjs');

// Senhas dos usuários seed são hasheadas no carregamento do módulo,
// assim o login usa o mesmo bcrypt.compare dos usuários criados via API.
const users = [
  {
    id: 'instrutor-0',
    name: 'felipe',
    email: 'felipe@academia.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'instrutor'
  },
  {
    id: 'aluno-0',
    name: 'lucas',
    email: 'lucas@academia.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'aluno'
  }
];
const frequencies = [];
const studentSheets = [];

const sheetTemplate = {
  id: 'sheet-1',
  groups: [
    {
      name: 'Peito',
      exercises: ['Supino Reto', 'Supino Inclinado', 'Supino Declinado']
    },
    {
      name: 'Costas',
      exercises: ['Remada Baixa', 'Pulldown', 'Barra Livre']
    },
    {
      name: 'Perna',
      exercises: ['Agachamento', 'Cadeira Extensora', 'Posterior']
    },
    {
      name: 'Ombro',
      exercises: ['Desenvolvimento', 'Encolhimento', 'Elevação Lateral']
    }
  ]
};

const createUser = (user) => {
  users.push(user);
  return user;
};

const getUsers = () => users;

const getUserByEmail = (email) => users.find((user) => user.email === email);

const getUserById = (id) => users.find((user) => user.id === id);

const addFrequency = (studentId, date) => {
  const frequency = { id: `freq-${Date.now()}`, studentId, date };
  frequencies.push(frequency);
  return frequency;
};

const getFrequenciesByStudent = (studentId) => frequencies.filter((item) => item.studentId === studentId);

const createStudentSheet = (studentId, sheet) => {
  const existing = studentSheets.find((item) => item.studentId === studentId);
  if (existing) {
    const error = new Error('Ficha já existe para este aluno');
    error.statusCode = 409;
    throw error;
  }

  const studentSheet = { studentId, sheet };
  studentSheets.push(studentSheet);
  return studentSheet;
};

const updateStudentSheet = (studentId, sheet) => {
  const existing = studentSheets.find((item) => item.studentId === studentId);
  if (!existing) {
    const error = new Error('Ficha não encontrada para este aluno');
    error.statusCode = 404;
    throw error;
  }

  existing.sheet = sheet;
  return existing;
};

const getStudentSheet = (studentId) => {
  const record = studentSheets.find((item) => item.studentId === studentId);
  return record ? record.sheet : null;
};

const getSheetTemplate = () => sheetTemplate;

module.exports = {
  createUser,
  getUsers,
  getUserByEmail,
  getUserById,
  addFrequency,
  getFrequenciesByStudent,
  createStudentSheet,
  updateStudentSheet,
  getStudentSheet,
  getSheetTemplate
};
