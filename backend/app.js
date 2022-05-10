/**
 * Cours OC
 */

const express = require("express");

// (ou bodyparser)
const app = express();
// connexion base de données

/* ---------------------------
accès à toutes les sortes CORPS de requetes au format JSON ?
(ou bodyparser)
*/
app.use(express.json());

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

//
const UserSauce = require("./models/UserSauce");
const Thing = require("./models/thing");

app.post("/api/stuff", (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body,
    });
    thing
        .save()
        .then(() => res.status(201).json({ message: "Objet enregistré !" }))
        .catch((error) => res.status(400).json({ error }));
});

app.get("/api/stuff/:id", (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then((thing) => res.status(200).json(thing))
        .catch((error) => res.status(404).json({ error }));
});

app.use("/api/stuff", (req, res, next) => {
    Thing.find()
        .then((things) => res.status(200).json(things))
        .catch((error) => res.status(400).json({ error }));
});

// POST
// endpoint : /api/auth/signup
app.post("/api/userSauce/", (req, res, next) => {
    delete req.body._id;
    const userSauce = new UserSauce({
        //email:req.body.email;
        ...req.body,
    });
    userSauce
        .save()
        .then(() => res.status(201).json({ message: "UserSauce cree" }))
        .catch((error) => res.status(400).json({ error }));
});

/* ---------------------------
Dans ce middleware, nous créons un groupe d'articles avec le schéma de données spécifique requis par le front-end. Nous envoyons ensuite ces articles sous la forme de données JSON, avec un code 200 pour une demande réussie.
*/
app.get("/api/userSauce/:id", (req, res, next) => {
    UserSauce.findOne({ _id: req.params.id })
        .then((userSauce) => res.status(200).json(userSauce))
        .catch((error) => res.status(404).json({ error }));
});
app.use("/api/userSauce/", (req, res, next) => {
    UserSauce.find()
        .then((usersSauce) => res.status(200).json(usersSauce))
        .catch((error) => res.status(400).json({ error }));
});

//app.use("/api/auth", (req, res, next) => {
// app.get("/api/auth/signup", (req, res, next) => {
//     const user = [
//         {
//             email: "test@site.com",
//             password: "motdepassehache",
//         },
//     ];
//     res.status(200).json(user);
// });

module.exports = app;
