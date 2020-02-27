
//Puerto
process.env.PORT = process.env.PORT || 3000;

//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Vencimiento del token
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//SEED de autenticacion
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//Base de Datos
let urlDB;

if( process.env.NODE_ENV === 'dev') {
urlDB = 'mongodb://localhost:27017/turismo';
} else {
	urlDB = 'mongodb+srv://oscarda:8lMoBbudvkhkMehW@cluster0-dgmcv.mongodb.net/usuario';
}



process.env.URLDB = urlDB;