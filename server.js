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

mongoose.connect('mongodb://servispacement_db_user:test@ac-wrbrxfi-shard-00-00.r3itdqv.mongodb.net:27017,ac-wrbrxfi-shard-00-01.r3itdqv.mongodb.net:27017,ac-wrbrxfi-shard-00-02.r3itdqv.mongodb.net:27017/Flygana?ssl=true&replicaSet=atlas-10s15u-shard-0&authSource=admin&appName=Cluster0', {
});

 

// Define a schema for our data

const itemSchema = new mongoose.Schema({
  Pclient: String,
  Nclient:String,
  depart: String,
  arrivee: String,
  horaire: String,
  prix: Number,
  tmps: Number,
  classe: String,
  Nvol: String,
  places: Number,
  vplaces: Number,
  Vol: Boolean,
  dist: Number,
});

 

// Define a model based on the schema

const Item = mongoose.model('Item', itemSchema);

 

// Define routes
app.use(cors()); 



/////////////////////////////////////////////////////////////  Post/récup les billets quands réservés
app.post('/billet', async (req, res) => {
  try {
 const item = new Item(req.body);
  await item.save();
  res.json(item);
  } catch (error){
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.get('/billets', async (req, res) => {
  const items = await Item.find({Vol : false});  
  res.json(items);
});
//////////////////////////////////////////////////////////////////////// Supprimer une fois le vol terminé


app.delete('/delBil/:Nvol', async (req, res) => {
  const item = req.params.Nvol;
  await Item.deleteMany({Nvol: item});
  res.json({ deleted: item });
});

///////////////////////////////////////////////////////////////// Post/get un nouveau vol

app.post('/vol', async (req, res) => {
  try {
 const item = new Item(req.body);
  await item.save();
  res.json(item);
  } catch (error){
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.get('/vol', async (req, res) => {
  const items = await Item.find({Vol : true});  
  res.json(items);
});
////////////////////////////////////////////////////////Places


app.post('/place/:Nvol', async (req, res) => {
  try {
 const item = await Item.findOne({Vol: true, Nvol: req.params.Nvol});
  await item.updateOne({
    $inc: { vplaces: 1 }
  });
  if (!item) {
  return res.status(404).json({ message: "Item not found" });
}
  res.json(item);
  } catch (error){
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.get('/place/:Nvol', async (req, res) => {
  const item = await Item.find({Vol : true, Nvol: req.params.Nvol});  
  res.json(item);
});






app.use(express.static("public"));

// Start the server

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});