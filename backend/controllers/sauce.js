const Sauce = require('../models/Sauce');
const fs = require('fs');

// create SAUCE
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
                message: 'Add sauce !',
            });
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

// get one SAUCE
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

//  like/dislike SAUCE
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
                if (sauce.usersLiked.includes(userId)) {
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
                } else if (sauce.usersDisliked.includes(userId)) {
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

// update SAUCE
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

// delete SAUCE
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (!sauce) {
                res.status(404).json({
                    error: new Error('No such Sauce!'),
                });
            }
            if (sauce.userId !== req.auth.userId) {
                res.status(400).json({
                    error: new Error('Unauthorized request!'),
                });
            }
            // delete sauce and image
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

// all SAUCE
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
