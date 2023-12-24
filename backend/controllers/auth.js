const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports.register = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();
        res.status(201).send("User created");
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
};

module.exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(404).json({ error: "Incorect credentials" })
        
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        
        if (!isCorrect) return res.status(404).json({ error: "Incorect credentials" })
        
        const { password, ...others } = user._doc;
        res
            .status(200)
            .json(others);
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
};

