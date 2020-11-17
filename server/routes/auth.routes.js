const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'The minimum length of password is 6 symbols')
            .isLength({ min: 6 })
    ],
    async (req, res) =>{
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect email or password is provided'
            })
        }

        try{
            const {email, password, first_name, last_name, admin} = req.body;
            const candidate = await User.findOne({ email });
            if (candidate) {
                return res.status(400).json({ message: 'The user already exists' })
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword, first_name, last_name, admin });
            await user.save();

            res.status(201).json({ message: 'The user is created' });
        }catch(e){
            console.log(e);
            res.status(500).json({ message: 'Something went wrong, please try again' });
        }
    }
)

router.post(
    '/login',
    [
        check('email', 'Please enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) =>{
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect email or password is provided'
                })
            }

            const {email, password} = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'The user is not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect email or password is provided' });
            }

            const token = jwt.sign(
                { userId: user.id },
                 process.env.JWTSECRET,
                { expiresIn: '4h' }
            );

            res.json({ token, userId: user.id, first_name: user.first_name, last_name: user.last_name, admin: user.admin });
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, please try again' });
        }
    }
)

module.exports = router;