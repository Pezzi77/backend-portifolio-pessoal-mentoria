const users = [];
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
    existing.sheet = sheet;
    return existing;
  }

  const studentSheet = { studentId, sheet };
  studentSheets.push(studentSheet);
  return studentSheet;
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
  getStudentSheet,
  getSheetTemplate
};
