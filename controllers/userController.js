const User = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err,
            });
        } else {
            // const user = new User({
            //     username: req.body.username,
            //     password: hash,
            //     email: req.body.email,
            // });

            // user.save()
            //     .then((result) => {
            //         res.status(200).json({
            //             user: result,
            //         });
            //     })
            //     .catch((err) => {
            //         res.status(400).json({ error: 'invalid' });
            //     });
            try {
                const user = await User.create({
                    username: req.body.username,
                    password: hash,
                    email: req.body.email,
                });
                res.status(200).json(user);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        }
    });
};
const login = (req, res) => {
    User.find({ username: req.body.username })
        .exec()
        .then((user) => {
            if (user.length < 1) {
                return res.status(400).json({ msg: 'user not found' });
            }
            bcrypt.compare(
                req.body.password,
                user[0].password,
                (err, result) => {
                    if (!result) {
                        return res
                            .status(400)
                            .json({ msg: 'password matching failed' });
                    }
                    if (result) {
                        const token = jwt.sign(
                            {
                                username: user[0].username,
                                email: user[0].email,
                            },
                            'token verify garna chaine kura env banayera rakhna ni milxa',
                            {
                                expiresIn: '24h',
                            }
                        );
                        res.status(200).json({
                            username: user[0].username,
                            email: user[0].email,
                            token: token,
                        });
                    }
                }
            );
        })
        .catch((err) => {
            res.status(400).json({ error: 'invalid' });
        });
};

module.exports = {
    signUp,
    login,
};
