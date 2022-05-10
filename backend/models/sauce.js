const mongoose = require("mongoose");

const sauceShema = mongoose.Schema({
    // userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: String, required: true },
    usersDisliked: { type: String, required: true },

    //  Data ModelsSauce   ● userId : String — l'identifiant MongoDB unique de l'utilisateur qui a créé la sauce
    // ● name : String — nom de la sauce
    // ● manufacturer : String — fabricant de la sauce
    // ● description : String — description de la sauce
    // ● mainPepper : String — le principal ingrédient épicé de la sauce
    // ● imageUrl : String — l'URL de l'image de la sauce téléchargée par l'utilisateur
    // ● heat : Number — nombre entre 1 et 10 décrivant la sauce
    // ● likes : Number — nombre d'utilisateurs qui aiment (= likent) la sauce
    // ● dislikes : Number — nombre d'utilisateurs qui n'aiment pas (= dislike) la
    // sauce
    // ● usersLiked : [ "String <userId>" ] — tableau des identifiants des utilisateurs
    // qui ont aimé (= liked) la sauce
    // ● usersDisliked : [ "String <userId>" ] — tableau des identifiants des
    // utilisateurs qui n'ont pas aimé (= disliked) la sauce

    // userId: "02String — l'identifiant MongoDB unique de l'utilisateur qui a créé la sauce",
    //             name: "02String - nom de la sauce",
    //             manufacturer: "02String — fabricant de la sauce",
    //             description: "02String — description de la sauce",
    //             mainPepper: "02String — le principal ingrédient épicé de la sauce",
    //             imageUrl:
    //                 "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
    //             heat: 6,
    //             dislikes: 24,
    //             usersLiked: ["String <userId>"],
    //             usersDisliked: ["String <userId>"]
});

module.exports = mongoose.model("Sauce", sauceShema);
