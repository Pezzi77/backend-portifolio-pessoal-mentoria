const authService = require('../services/authService');

const registerInstructor = (req, res, next) => {
  try {
    const user = authService.registerInstructor(req.body);
    res.status(201).json({ message: 'Instrutor cadastrado com sucesso', user });
  } catch (error) {
    next(error);
  }
};

const registerStudent = (req, res, next) => {
  try {
    const user = authService.registerStudent(req.body);
    res.status(201).json({ message: 'Aluno cadastrado com sucesso', user });
  } catch (error) {
    next(error);
  }
};

const login = (req, res, next) => {
  try {
    const result = authService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getStudents = (req, res, next) => {
  try {
    const students = authService.getAllStudents();
    res.status(200).json({ students });
  } catch (error) {
    next(error);
  }
};

const getStudentDetails = (req, res, next) => {
  try {
    const student = authService.getStudentById(req.params.id);
    if (!student) {
      const error = new Error('Aluno não encontrado');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ student });
  } catch (error) {
    next(error);
  }
};

const getCurrentStudent = (req, res, next) => {
  try {
    const student = authService.getStudentById(req.user.id);
    if (!student) {
      const error = new Error('Aluno não encontrado');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ student });
  } catch (error) {
    next(error);
  }
};

const createStudentSheet = (req, res, next) => {
  try {
    const result = authService.createStudentSheet(req.params.id, req.body);
    res.status(201).json({ message: 'Ficha atribuída ao aluno com sucesso', sheet: result.sheet });
  } catch (error) {
    next(error);
  }
};

const updateStudentSheet = (req, res, next) => {
  try {
    const result = authService.updateStudentSheet(req.params.id, req.body);
    res.status(200).json({ message: 'Ficha atualizada com sucesso', sheet: result.sheet });
  } catch (error) {
    next(error);
  }
};

const getStudentSheet = (req, res, next) => {
  try {
    const sheet = authService.getStudentSheet(req.params.id);
    res.status(200).json(sheet);
  } catch (error) {
    next(error);
  }
};

const registerFrequency = (req, res, next) => {
  try {
    const result = authService.registerFrequency(req.params.id, req.body.date);
    res.status(201).json({ message: 'Frequência registrada com sucesso', frequency: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerInstructor,
  registerStudent,
  login,
  getStudents,
  getStudentDetails,
  getCurrentStudent,
  getStudentSheet,
  createStudentSheet,
  updateStudentSheet,
  registerFrequency
};
