const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

app.use(express.json());

const MyFriends = [ 
    { id: 1, name: 'Omair', email : 'omair@gmail.com' },
    { id: 2, name: 'Ameer', email: 'ameer@gmail.com' },
    { id: 3, name: 'Zaid', email : 'zaid@gmail.com' }
]

app.get('/', (req, res) => {
  res.send('I am a RESTful API');
});

app.get('/api/friends', (req, res) => {
    res.send(MyFriends);
});

app.get('/api/friends/:id', (req, res) => {
    const Frinedid = parseInt(req.params.id);
    const friend = MyFriends.find(friend => friend.id === Frinedid);
    if (!friend) res.status(404).send('The friend with the given ID was not found');
    res.send(friend);
});

app.post('/api/addfriends', (req, res) => {
    const friend = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email
    };
    MyFriends.push(friend);
    res.send(friend);
    console.log(MyFriends);
    
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});