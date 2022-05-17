const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const validator = require('validator');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Remplissez votre email correctement. Merci'],
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Remplissez votre email correctement. Merci');
            }
        },
    },

    password: {
        type: String,
        required: [
            true,
            'Remplissez votre mot de passe. Choisir au moins 8 caractères. Merci.',
        ],
        minlength: 8,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error(
                    'Remplissez votre mot de passe correctement(8 caracteres). Merci'
                );
            }
        },
    },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
