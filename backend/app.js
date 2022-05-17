const express = require('express');
// URL image
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var helmet = require('helmet');
// (ou bodyparser)
const app = express();

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
// connexion base de données
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('MongoDB connexion OK :)'))
    .catch(() => console.log('MongoDB connexion fail......'));
/* ---------------------------
Ces headers permettent :
d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    next();
});

// gestionnaire de routage
app.use('/images', express.static(path.join(__dirname, 'images')));
// cf P5
app.use(express.static('images'));
app.use(express.urlencoded({ extended: true }));

/* ---------------------------
accès à toutes les sortes CORPS de requetes au format JSON ?
(ou bodyparser)
*/
app.use(express.json());
app.use(helmet());

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;
