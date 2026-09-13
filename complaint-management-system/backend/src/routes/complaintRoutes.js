const r = require('express').Router();
const c = require('../controllers/complaintController');
const { auth, roles } = require('../middleware/auth');

r.get('/', auth, c.list);
r.get('/categories', auth, c.categories);

r.post('/', auth, roles('USER', 'ADMIN'), c.create);

r.get('/:id', auth, c.getOne);

r.patch('/:id/status', auth, roles('STAFF', 'ADMIN'), c.updateStatus);

r.patch('/:id/assign', auth, roles('ADMIN'), c.assign);

r.post('/:id/comments', auth, c.comment);

module.exports = r;