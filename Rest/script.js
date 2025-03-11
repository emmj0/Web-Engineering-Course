const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');

const app = express();
const port = 3000;

app.use(express.json());

const MyFriends = [
    { id: 1, name: 'Omair', email: 'omair@gmail.com', phone: '0301-2345678' },
    { id: 2, name: 'Ameer', email: 'ameer@gmail.com', phone: '0321-9876543' },
    { id: 3, name: 'Zaid', email: 'zaid@gmail.com', phone: '0333-4567890' }
];

const friendSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
        .pattern(/^03[0-9]{2}-?[0-9]{7}$/) 
        .required()
        .messages({
            'string.pattern.base': 'Phone number must be in the format 03XX-XXXXXXX or 03XXXXXXXXX'
        })
});

app.get('/', (req, res) => {
    res.send('I am a RESTful API');
});

app.get('/api/friends', (req, res) => {
    res.send(MyFriends);
});

app.get('/api/friends/:id', (req, res) => {
    const friendId = parseInt(req.params.id);
    const friend = MyFriends.find(friend => friend.id === friendId);
    if (!friend) return res.status(404).send('The friend with the given ID was not found');
    res.send(friend);
});

app.post('/api/addfriends', (req, res) => {
    const { error } = friendSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const friend = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    };

    MyFriends.push(friend);
    res.send(friend);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
