const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos = {
	values: ['ADMIN_ROLE', 'USER_ROLE'],
	message: '{VALUE} no es un rol válido'
};

let usuarioSchema = new Schema({
	nombre: {
		type: String,
		required: [true, 'El nombre es necesario']
	},
	apellido: {
		type: String,
		required: [true, 'El apellido es necesario']
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'El correo es necesario']
	},
	password: {
		type: String,
		required: [true, 'La contraseña es obligatoria']
	},
	img: {
		type: String,
		required: false
	},
	fechaNac: {
		type: String,
		required: [true, 'La fecha de nacimientoo es necesaria']
	},
	role: {
		type: String,
		default: 'USER_ROLE',
		enum: rolesValidos
	},
	estado: {
		type: Boolean,
		default: true
	}
});

usuarioSchema.methods.toJSON = function () {
	let user = this;
	let userObject = user.toObject(); //de esta manera tengo todas las propiedades y metodos
	delete userObject.password;

	return userObject;
}

usuarioSchema.plugin( uniqueValidator, {message: '{PATH} debe de ser unico'} );

module.exports = mongoose.model('Usuario', usuarioSchema);
