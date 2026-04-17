import dns from 'dns';
import express from 'express';
import mongoose from 'mongoose';
import cors  from 'cors';

//dns.setDefaultResultOrder('ipv4first');

// Create a new Express.js instance
const app = express();

 

// Set up middleware

app.use(express.json());

 

// Connect to the MongoDB database

mongoose.connect('mongodb://servispacement_db_user:sett@ac-wrbrxfi-shard-00-00.r3itdqv.mongodb.net:27017,ac-wrbrxfi-shard-00-01.r3itdqv.mongodb.net:27017,ac-wrbrxfi-shard-00-02.r3itdqv.mongodb.net:27017/?ssl=true&replicaSet=atlas-10s15u-shard-0&authSource=admin&appName=Cluster0', {

});

 

// Define a schema for our data

const itemSchema = new mongoose.Schema({
  //restaurant: String,
  nom: String,
  age: Number,
});

 

// Define a model based on the schema

const Item = mongoose.model('Item', itemSchema);

 

// Define routes
app.use(cors()); 



app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.get('/item', async (req, res) => {
  if (!req.query || !req.query.id) {
    return res.status(400).json({ error: 'ID manquant' });
  }
  const item = await Item.findById(req.query.id);
  res.json(item);
});

app.post('/items', async (req, res) => {
  const item = await Item.findById(req.body.id);
  await item.updateOne({
   "nom": req.body.nom,
   "age": req.body.age,
  });
  res.json(item);
});

app.post('/restaurant', async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.json(item);
});


app.use(express.static("public"));

// Start the server

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});