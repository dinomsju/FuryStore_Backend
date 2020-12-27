const User = require('../models/models.user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRegister = async (req, res, next) => {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send({ err: 'Địa chỉ email đã tồn tại!' });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    let user = new User({
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        password: hashedPassword,
        phone: req.body.phone,
        address: req.body.address,
        profilePicture: '',
    });
    user.save()
        .then(user => {
            res.json({
                message: "Đăng kí thành công!"
            });
        })
        .catch(error => {
            res.json({
                error: "Đăng kí thất bại!"
            });
        });
}

const userLogin = async (req, res, next) => {
    let email = req.body.email
    let password = req.body.password

    const user = await User.findOne({ email });
    if (!user) {
        res.status(400).send({ err: 'Địa chỉ email hoặc mật khẩu không đúng!' });
    }
    const passMatching = await bcrypt.compare(password, user.password);
    if (!passMatching) {
        res.status(400).send({ err: 'Địa chỉ email hoặc mật khẩu không đúng!' });
    }
    try {
        jwt.sign(
            { userId: user._id },
            process.env.SECRET_TOKEN,
            { expiresIn: '3600s' },
            (err, token) => {
                if (err) {
                    res.status(400).err
                }
                res.status(200).send({
                    userId: user._id,
                    name: user.name,
                    password,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    profilePicture: user.profilePicture,
                    token: token,
                    loginAt: Date.now(),
                    expireTime: Date.now() + 60 * 60 * 1000,
                })
            }
        )
    } catch (error) {
        res.status(400).send(err);
    }
}

module.exports = {
    userRegister,
    userLogin
}