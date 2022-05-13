const Sauce = require('../models/Sauce');
const fs = require('fs');

//new-sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
            req.file.filename
        }`,
    });
    sauce
        .save()
        .then(() => {
            res.status(201).json({
                message: 'Post Sauce saved successfully!',
            });
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id,
    })
        .then((sauce) => {
            res.status(200).json(sauce);
        })
        .catch((error) => {
            res.status(404).json({
                error: error,
            });
        });
};

/*----
name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: Array, required: true },
    usersDisliked: { type: Array, required: true },
*/

// 02
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file
        ? {
              ...JSON.parse(req.body.sauce),
              imageUrl: `${req.protocol}://${req.get('host')}/images/${
                  req.file.filename
              }`,
          }
        : { ...req.body };
    Sauce.updateOne(
        { _id: req.params.id },
        { ...sauceObject, _id: req.params.id }
    )
        .then(() => {
            res.status(201).json({
                message: 'Sauce updated successfully!',
            });
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

// rateSauce
//let rateArray = { likes, dislikes, usersLiked, usersDisliked };
exports.rateSauce = (req, res, next) => {
    let like = req.body.like;

    let userId = req.body.userId;
    let sauceId = req.params.id;
    // console.log(
    //     `req like : ${like} de l'userId : ${userId} et pour la sauce ${sauceId}`
    // );

    // si like= 0  neutre
    /*---
    - retire 1 à l'array dislikes ou likes
    - retire userId du tableau usersLiked ou usersDisliked
    */
    if (like === 0) {
        Sauce.updateOne(
            { _id: req.params.id },
            { usersLiked: userId, likes: -1 }
        )
            .then(() => {
                res.status(201).json({
                    message:
                        'Sauce RATING (ni plus ni moins) updated successfully!',
                });
            })
            .catch((error) => {
                res.status(400).json({
                    error: error,
                });
            });
    }

    // si like = 1 'j'aime"
    /*---
    -  add +1 à l'array likes
    - add userId du tableau usersDisliked
    */
    else if (like === 1) {
        Sauce.updateOne(
            { _id: req.params.id },
            { usersLiked: userId, likes: +1 }
        )
            .then(() => {
                res.status(201).json({
                    message: 'Sauce RATING like updated successfully!',
                });
            })
            .catch((error) => {
                res.status(400).json({
                    error: error,
                });
            });
    }

    // si like =-1  'je n'aime pas'
    /*---
    -  add +1 à l'array dislikes
    - add userId du tableau usersDisliked
    */
    else if (like === -1) {
        Sauce.updateOne(
            { _id: req.params.id },
            { usersDisliked: userId, dislikes: +1 }
        )
            .then(() => {
                res.status(201).json({
                    message: 'Sauce RATING dislike updated successfully!',
                });
            })
            .catch((error) => {
                res.status(400).json({
                    error: error,
                });
            });
    }
};

//
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() =>
                        res.status(200).json({ message: 'Image supprimée !' })
                    )
                    .catch((error) => res.status(400).json({ error }));
            });
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then((sauces) => {
            res.status(200).json(sauces);
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};
