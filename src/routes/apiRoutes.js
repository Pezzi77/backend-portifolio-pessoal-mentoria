const express = require('express');
const controller = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
	try {
		// Aplicação sobrecarregada
		if (process.env.MAINTENANCE === 'true') {
			return res.status(503).json({
				status: 'unavailable',
				message: 'Service temporarily unavailable (maintenance)'
			});
		}

		// Resposta normal
		return res.status(200).json({
			status: 'ok',
			uptime: process.uptime(),
			timestamp: new Date().toISOString(),
		});
	} catch (err) {
		// Error
		return res.status(500).json({ message: 'Internal server error' });
	}
});

router.post('/auth/login', controller.login);
router.post('/instructors/register', authMiddleware.requireInstructor, controller.registerInstructor);

router.post('/students/register', controller.registerStudent);
router.get('/me', authMiddleware.requireAuthenticatedUser, controller.getCurrentStudent);
router.get('/students', authMiddleware.requireInstructor, controller.getStudents);
router.get('/students/:id', authMiddleware.requireInstructor, controller.getStudentDetails);
router.post('/students/:id/sheet', authMiddleware.requireInstructor, controller.createStudentSheet);
router.patch('/students/:id/sheet', authMiddleware.requireInstructor, controller.updateStudentSheet);
router.get('/students/:id/sheet', authMiddleware.requireAuthenticatedUser, controller.getStudentSheet);
router.post('/students/:id/frequency', authMiddleware.requireAuthenticatedUser, controller.registerFrequency);
router.get('/students/:id/frequency', authMiddleware.requireInstructor, controller.getFrequencies);

module.exports = router;
