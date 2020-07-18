const express = require('express');
const bcrypt = require("bcrypt");
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const User = require('../models/User');
const upload = require('../multer').avatar;

const router = express.Router();

router.post('/', upload.single('avatar'), async (req, res) => {
    const userData = {
        role: req.body.role,
        username: req.body.username,
        password: req.body.password,
        displayName: req.body.displayName
    };
    if (req.file) {
        userData.avatar = req.file.filename;
    }

    const user = new User(userData);

    try {
        user.generateToken();
        await user.save();
        return res.send(user);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).send({error: 'Not a fount!'});
        }
        return res.send(users)
    } catch (e) {
        return res.status(500).send(e)
    }
});
router.get('/:id', auth, async (req, res) => {

    try {
        const user = await User.findOne({_id: req.params.id});
        if (!user) {
            return res.status(404).send({error: 'Not a fount!'});
        }
        console.log(user);
        return res.send(user)
    } catch (e) {
        return res.status(500).send(e)
    }
});
router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(400).send({error: 'Username or password not correct!'});
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Username or password not correct!'});
    }


    user.generateToken();

    await user.save();
    return res.send(user);
});


router.delete('/sessions', async (req, res) => {
    const success = {message: 'Success'};

    try {
        const token = req.get('Authorization').split(' ')[1];

        if (!token) return res.send(success);

        const user = await User.findOne({token});
        console.log(user)
        if (!user) return res.send(success);

        user.generateToken();
        await user.save();

        return res.send(success);
    } catch (e) {
        return res.send(success);
    }
});

router.put('/:id',[ auth,upload.single('avatar')], async (req, res) => {
    const user = req.body;

    const editableUser = await User.findOne({_id: req.params.id});
    if (user.password) {
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(user.password, salt);
        await User.updateOne({_id: req.params.id}, {password: user.password});
    }

    editableUser.username = user.username;
    editableUser.displayName = user.displayName;
    editableUser.role = user.role;


    if (req.file) {
        editableUser.avatar = req.file.filename;
    }

    await editableUser.save();

    res.send(editableUser);
});
router.delete('/:id',[auth,permit('admin')], async (req, res) => {

    const user = req.user;

    const deleteUser = await User.findById(req.params.id);

    if(!deleteUser){
        return res.status(404).send({message: 'User not a found!!!'})
    }
    if(deleteUser._id.toString() !== user._id.toString() && user.role !== 'admin'){
        return res.status(403).send({message: 'You are not authorized to delete this user!!!'})
    }

    await User.deleteOne({_id: req.params.id});
    return res.send({message:'ok'})
});

module.exports = router;