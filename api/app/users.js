const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
    const {email, password, displayName} = req.body;

    const userData = {
        email,
        password,
        displayName,
        avatarImage: null
    };

    console.log(req.file);
    if (req.file) {
        userData.avatarImage = 'uploads/' + req.file.filename;
    }

    try{
        const user = new User(userData);

        user.generateToken();
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return res.status(401).send({message: 'Credentials are wrong'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(401).send({message: 'Credentials are wrong'});
    }

    user.generateToken();
    await user.save({validateBeforeSave: false});

    res.send(user);
});

router.post('/facebookLogin', async (req, res) => {

});

router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Success'};

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();
    await user.save({validateBeforeSave: false});

    res.send({success, user});
});

module.exports = router;