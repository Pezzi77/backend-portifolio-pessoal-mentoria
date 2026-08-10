const express = require('express');
const controller = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/auth/login', controller.login);
router.post('/instructors/register', controller.registerInstructor);

router.post('/students/register', controller.registerStudent);
router.get('/students/me', authMiddleware.requireAuthenticatedUser, controller.getCurrentStudent);
router.get('/students', authMiddleware.requireInstructor, controller.getStudents);
router.get('/students/:id', authMiddleware.requireInstructor, controller.getStudentDetails);
router.post('/students/:id/sheet', authMiddleware.requireInstructor, controller.createStudentSheet);
router.patch('/students/:id/sheet', authMiddleware.requireInstructor, controller.updateStudentSheet);
router.get('/students/:id/sheet', authMiddleware.requireAuthenticatedUser, controller.getStudentSheet);
router.post('/students/:id/frequency', authMiddleware.requireAuthenticatedUser, controller.registerFrequency);

module.exports = router;
