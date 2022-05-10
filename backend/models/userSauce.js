const mongoose = require("mongoose");

const userSauceShema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    //     email : String — adresse e-mail de l'utilisateur [unique]
    // ● password : String — mot de passe de l'utilisateur haché
});

module.exports = mongoose.model("UserSauce", userSauceShema);
