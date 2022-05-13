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
exports.rateSauce = (req, res, next) => {
    let likeRate = req.body.like;
    let userId = req.body.userId;
    let sauceId = req.params.id;

    // like =1 j'aime
    if (likeRate === 1) {
        Sauce.updateOne(
            { _id: sauceId },
            { $push: { usersLiked: userId }, $inc: { likes: +1 } }
        )
            .then(() => res.status(201).json({ message: 'LIKE rate' }))
            .catch((error) => res.status(400).json({ error }));
    }
    // like =0
    else if (likeRate === 0) {
        Sauce.findOne({ _id: sauceId })
            .then((sauce) => {
                // ?????
                // trouver userId requete = à valeur dans tableau usersLiked
                if (Sauce.find({ usersLiked: req.body.userId })) {
                    //if (Sauce.find({ usersLiked: userId })) {
                    //if (Sauce.findOne({ usersLiked: userId })) {

                    Sauce.updateOne(
                        { _id: sauceId },
                        {
                            $pull: { usersLiked: userId },
                            $inc: { likes: -1 },
                        }
                    )
                        .then(() =>
                            res
                                .status(201)
                                .json({ message: `LIKE/DISLIKE no rate` })
                        )
                        .catch((error) => res.status(400).json({ error }));
                }
                // ?????req.body.userId
                if (Sauce.find({ userDisLiked: req.body.userId })) {
                    //
                    Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $pull: { usersDisliked: userId },
                            $inc: { dislikes: -1 },
                        }
                    )
                        .then(() =>
                            res
                                .status(201)
                                .json({ message: `LIKE/DISLIKE no rate` })
                        )
                        .catch((error) => res.status(400).json({ error }));
                }
            })
            .catch((error) => res.status(404).json({ error }));
    }
    // dislike =-1
    else if (likeRate === -1) {
        Sauce.updateOne(
            { _id: sauceId },
            { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } }
        )
            .then(() => {
                res.status(201).json({ message: `DISLIKE rate` });
            })
            .catch((error) => res.status(400).json({ error }));
    }
};

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
