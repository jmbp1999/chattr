const User = require('../models/userModel');
const bcrypt = require('bcrypt');
module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        console.log({ username, email, password });
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) return res.json({ msg: 'Username already used', status: false });
        const emailCheck = await User.findOne({ email });
        if (emailCheck) return res.json({ msg: 'Email already used', status: false });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        console.log(user);
        delete user.password;
        console.log(user);
        return res.json({ status: true, user });
    } catch (ex) {
        next(ex);
    }
};
