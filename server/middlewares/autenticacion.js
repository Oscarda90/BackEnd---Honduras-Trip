const jwt = require('jsonwebtoken');

//verificar TOKEN
let verificaToken = (req, res, next) => {

	let token = req.get('token'); //obtiene el header(token)

	jwt.verify(token, process.env.SEED, (err, decoded) => {

		if(err) {
			return res.status(401).json({
				ok: false,
				err: {
					message: 'Token no válido'
				}
			});
		}

		req.usuario = decoded.usuario;
		next();

	});
};

module.exports = {
	verificaToken
};