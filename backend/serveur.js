/**
 * SERVEUR
 * start 03/05/22
 */

// const { executeServerBuilder } = require("@angular-devkit/build-angular");
// const express=require("express");

var express = require("express");
var server = express();
var morgan = require("morgan");

// middleware
server.use(morgan("dev"));

//server.listen(process.env.PORT || 3000);
server.listen(3000);

// root
// fonction que se déclenche pr route de base
//executeServerBuilder.use("/", function(){
// server.use("/", function () {
//     console.log("Reception d'une demande cliente");
// });

// server.use("/", function (requete, reponse) {
//     console.log("Reception d'une demande cliente");
//     console.log(requete.path);
//     reponse.end("Bonjour client");
// });

// server.use("/", (requete, reponse) => {
//     console.log("Reception d'une demande cliente");
//     console.log(requete.path);
//     reponse.end("Bonjour client");
// });

//un seul param
server.use("/test", (requete) => {
    console.log("Reception d'une demande cliente");
    console.log("Liste des paramétres reçus");
    console.log(requete.query);
});

//routes
server.get("/", (requete, reponse) => {
    console.log("Demande reçue avec la méthode GET sur l'URL");
    reponse.end("Demande GET recue");
});

server.get("/test", (requete, reponse) => {
    console.log("Demande reçue avec la méthode GET sur l'URL /test");
    reponse.end("Demande GET recue");
});

//
server.post("/test", (requete, reponse) => {
    console.log("Demande reçue avec la méthode POST sur l'URL /test");
    reponse.end("Demande POST recue");
});

// erreurs de route
server.use((requete, reponse, suite) => {
    const error = new Error("Page non trouvée");
    error.status = 404;
    suite(error);
});

server.use((error, reponse, suite) => {
    reponse.status(error.status || 500);
    reponse.end(error, message);
});
