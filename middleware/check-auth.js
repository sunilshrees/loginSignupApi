const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // space baata split bhayera 1 position ko

        const verify = jwt.verify(
            token,
            'token verify garna chaine kura env banayera rakhna ni milxa'
        );

        // console.log(verify);
        // if (verify.userType === 'adming') {
        //     next();
        // }
        // else{
        //     res.status(400).json({error:'not admin'})
        // }

        next();
    } catch (error) {
        res.status(400).json({ error: 'invalid token' });
    }
};
