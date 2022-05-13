const mongoose = require('mongoose');
// like / dislike
const likeRate = 1;
const dislikeRate = -1;
const updatelikeRate = 0;

const sauceShema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, default: 0 },
    likes: {
        type: Number,
        default: 0,
        // min: [0],
    },
    dislikes: {
        type: Number,
        default: 0,
        // min: [0],
    },
    // pb[0]
    usersLiked: { type: Array, default: [] },
    usersDisliked: { type: Array, default: [] },
    // usersLiked: { type: Array, required: true },
    // usersDisliked: { type: Array, required: true },

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
});

module.exports = mongoose.model('Sauce', sauceShema);
