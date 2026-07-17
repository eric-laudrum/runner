const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.registerUser = async (req, res) => {
    try {
        const {email, password, confirmPassword} = req.body;

        if (!email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Error: All fields are required' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Error: Passwords do not match' });
        }

        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.status(400).json({message: 'Error: User already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: 'User created successfully.'
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

exports.loginUser = async( req, res) => {
    try{
        const{ email, password } = req.body;

        const user = await User.findOne({ email });

        if( !user ){
            return res.status(400).json({ message: 'Error: invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '7d' }
        );

        res.status(200).json({
            token,
            user: { id: user._id, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}