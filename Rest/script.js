const express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const colours = require('colors');
const Joi = require('joi');

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/friendsDB')
.then(() => console.log('Connected to MongoDB'.green))
.catch(err => console.error('Could not connect to MongoDB:'.red, err));

const friendSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true }
});

const Friend = mongoose.model('Friend', friendSchema);

const friendValidationSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
        .pattern(/^03[0-9]{2}-?[0-9]{7}$/)
        .required()
        .messages({
            'string.pattern.base': 'Phone number must be in the format 03XX-XXXXXXX or 03XXXXXXXXX'
        }),
    age: Joi.number().min(1).max(120).required()
});

app.get('/', (req, res) => {
    res.send('I am a RESTful API');
});

app.patch('/api/updateEmailByAge', async (req, res) => {
    try {
        const { newEmail } = req.body; 

        if (!newEmail) {
            return res.status(400).send('New email is required'.red);
        }

        const result = await Friend.updateMany(
            { age: { $gt: 10 } }, 
            { $set: { email: newEmail } } 
        );

        if (result.modifiedCount === 0) {
            return res.status(404).send('No friends found with age > 10'.yellow);
        }

        res.send(`${result.modifiedCount} friends' emails updated successfully`.green);
    } catch (err) {
        res.status(500).send('Error updating emails'.red);
    }
});

app.get('/api/friends', async (req, res) => {
    try {
        const friends = await Friend.find();
        res.send(friends);
    } catch (err) {
        res.status(500).send('Error retrieving friends'.red);
    }
});

app.get('/api/friends/:id', async (req, res) => {
    try {
        const friend = await Friend.findById(req.params.id);
        if (!friend) return res.status(404).send('Friend not found'.yellow);
        res.send(friend);
    } catch (err) {
        res.status(500).send('Error retrieving friend'.red);
    }
});

app.post('/api/addfriends', async (req, res) => {
    const { error } = friendValidationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message.red);
    
    try {
        const newFriend = new Friend({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age
        });

        await newFriend.save();
        res.send(newFriend);
    } catch (err) {
        res.status(400).send(err.message.red);
    }
});

app.patch('/api/friends/:id', async (req, res) => {
    try {
        const friend = await Friend.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!friend) return res.status(404).send('Friend not found'.yellow);
        res.send(friend);
    } catch (err) {
        res.status(400).send(err.message.red);
    }
});

app.delete('/api/friends/:id', async (req, res) => {
    try {
        const friend = await Friend.findByIdAndDelete(req.params.id);
        if (!friend) return res.status(404).send('Friend not found'.yellow);
        res.send(friend);
    } catch (err) {
        res.status(500).send('Error deleting friend'.red);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`.cyan);
});