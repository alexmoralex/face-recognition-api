const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const register = require('./controllers/register');
const sign = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-vertical-92033',
    user : 'tzzndngvrqcrsi',
    password : '',
    database : 'face-recognition'
  }
});

db.select('*').from('users').then(data => console.log(data));

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('connected');
})

app.post('/signin', (req, res) => sign.handleSign(req,res,db,bcrypt))
app.post('/register', (req, res) => register.handleRegister(req,res,db,bcrypt))
app.get('/profile/:id', (req, res) => profile.handleProfile(req,res,db))
app.put('/image', (req, res) => image.handleImage(req,res,db))
app.post('/imageurl', (req, res) => image.handleApiCall(req,res))

app.listen(process.env.PORT || 3001, () => console.log(`app is running on port ${process.env.PORT}`))

