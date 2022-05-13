const express = require("express");
// URL image
const path = require('path');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// (ou bodyparser)
const app = express();

const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");
//const stuffRoutes = require("./routes/stuff");

// connexion base de données
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log("Connexion à MongoDB réussie :)"))
    .catch(() => console.log("Connexion à MongoDB échouée..."));
/* ---------------------------
Ces headers permettent :
d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
*/
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

// cf P5
app.use('/images', express.static(path.join(__dirname, 'images')));
// ?
// app.use(express.static("images"));
// app.use(express.urlencoded({ extended: true }));

/* ---------------------------
accès à toutes les sortes CORPS de requetes au format JSON ?
(ou bodyparser)
*/
app.use(express.json());

// import stuff / route
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);
//app.use("/api/sauce", sauceRoutes);
//app.use("/api/stuff", stuffRoutes);

module.exports = app;
