const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'mentor-secret';

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

const requireInstructor = (req, res, next) => {
  authenticate(req, res, () => {
    if (req.user.role !== 'instrutor') {
      return res.status(403).json({ message: 'Acesso negado para este perfil' });
    }
    next();
  });
};

const requireAuthenticatedUser = (req, res, next) => {
  authenticate(req, res, () => {
    if (req.user.role !== 'aluno' && req.user.role !== 'instrutor') {
      return res.status(403).json({ message: 'Acesso negado para este perfil' });
    }

    if (req.user.role === 'aluno' && req.params.id && req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Você só pode acessar seus próprios dados' });
    }

    next();
  });
};

module.exports = {
  authenticate,
  requireInstructor,
  requireAuthenticatedUser
};
