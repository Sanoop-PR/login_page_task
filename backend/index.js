const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/login');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    console.log(username,user)
    if(user) {
      if(user.password === password){
          res.json("Success")
      }else{
          res.json("The password is incorrect")
      }
  }else{
      res.json("No record existed")
  }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = new User({
      username,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/ecommerce', (req, res) => {
  const token = req.headers.authorization;
  const ecommerceData = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
  ];
  res.json(ecommerceData);
});

app.get('/',(req,res)=>{
    res.send("server started")
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
