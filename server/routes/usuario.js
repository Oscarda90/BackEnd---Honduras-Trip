const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const Usuario = require('../models/usuario');

app.get('/usuario', (req, res) => {

	let desde = req.query.desde || 0;
	desde = Number(desde); //lo onvierte a numero

	let limite = req.query.limite || 5;
	limite = Number(limite);
	
	Usuario.find({estado:true}, 'nombre email estado')
		   .skip(desde)
		   .limit(limite)
		   .exec((err, usuarios) => {

				if (err) {
					return res.status(400).json({
						ok: false,
						err
					});
				}

				Usuario.count({estado:true}, (err, conteo) => {

					res.json({
						ok: true,
						usuarios,
						Total: conteo
					});					

				});


		   });	

});

app.post('/usuario', (req, res) => {

	let body = req.body;

	let usuario = new Usuario({
		nombre: body.nombre,
		apellido: body.apellido,
		email: body.email,
		password: bcrypt.hashSync(body.password, 10),
		fechaNac: body.fechaNac,
		role: body.role
	});

	usuario.save((err, usuarioDB) => {
		
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			usuario: usuarioDB
		});
	});

});

app.put('/usuario/:id', (req, resp) => {

	let id = req.params.id;
	let body = _.pick( req.body, ['nombre','email','img','role','estado']);

	Usuario.findByIdAndUpdate(id, body, {new: true, runValidatos: true}, (err, usuarioDB) => {

		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		resp.json({
			ok: true,
			usuario: usuarioDB
		});
	});
});

app.delete('/usuario/:id', (req, res) => {
	
	let id = req.params.id;

	//Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
	
	let cambiaEstado = {
		estado: false
	};

	Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true}, (err, usuarioBorrado) => {

		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		if (!usuarioBorrado) {
			return res.status(400).json({
				ok: false,
				err: {
					message: 'Usuario no encontrado'
				}
			});		
		}

		res.json({
			ok: true,
			usuario: usuarioBorrado
		});
	});
});

module.exports = app;