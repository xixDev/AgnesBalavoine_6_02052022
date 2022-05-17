// token
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // si erreur au niveau des headers
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(
            token,
            '2077adb93ec0582018664642477026fcf972e08fc345663d5814c1fff355b34f7a2f3ba9c663dba58c1249557bab5b84d2b3ebefae5032ecc34c776c457ad926c218a8fb60e3b0b21773875e38b7e3fa6e95d6fe8e758e6c895948afe4ab943ad7180ccfdf7d2e4ccfd9e3008977e4d9bceef8c5376900cec5dae484c7db9309f75b65d0136257b79fe72bf7c5ec8bc9f1a71f46da1f38f8fe6930e85010538c04b24d6493051312c38eb6f96d07ea469a96aae532011a0e3c4a08a6b4475a60'
        );
        //const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;

        //  securite sur la route delete
        req.auth = { userId };

        //
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!'),
        });
    }
};
