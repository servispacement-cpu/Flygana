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

const Schemab = new mongoose.Schema({
  depart: String,
  arrivee: String,
  horaire: String,
  Nvol: String,
  places1: Number,
  places2: Number,
  dist: Number,

  Pclient: String,
  Nclient:String,
  prix: Number,
  tmps: Number,
  classe: String,
});

const Schemav = new mongoose.Schema({
  depart: String,
  arrivee: String,
  horaire: String,
  Nvol: String,
  places1: Number,
  places2: Number,
  dist: Number,
});
 

// Define a model based on the schema

const Itemb = mongoose.model('Itemb', Schemab);
const Itemv = mongoose.model('Itemv', Schemav);

 

// Define routes
app.use(cors()); 



/////////////////////////////////////////////////////////////  Post/récup les billets quands réservés
app.post('/billet', async (req, res) => {
  try {
 const item = new Itemb(req.body);
  await item.save();
  res.json(item);
  } catch (error){
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.get('/billets', async (req, res) => {
  const items = await Itemb.find();  
  res.json(items);
});
//////////////////////////////////////////////////////////////////////// Supprimer une fois le vol terminé


app.delete('/delBil/:Nvol', async (req, res) => {
  const item = decodeURIComponent(req.params.Nvol);
  await Itemb.deleteMany({Nvol: item});
  await Itemv.deleteMany({Nvol: item})
  res.json({ deleted: item });
});

///////////////////////////////////////////////////////////////// Post/get un nouveau vol

app.post('/vol', async (req, res) => {
  try {
 const item = new Itemv(req.body);
  await item.save();
  res.json(item);
  } catch (error){
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.get('/vol', async (req, res) => {
  const items = await Itemv.find();  
  res.json(items);
});

////////////////////////////////////////////////////////Places



app.get('/place/:Nvol/:classe', async (req, res) => {
  const Nvol = decodeURIComponent(req.params.Nvol);
  const classe=decodeURIComponent(req.params.classe);
  const item = await Itemb.countDocuments({Nvol: Nvol, classe: classe});  
  res.json(item);
});


////////////////////////////////////////  Verif Nvol exist

app.get('/vNvol/:Nvol', async (req, res) => {
  const Nvol = decodeURIComponent(req.params.Nvol);
  const item = await Itemv.findOne({Nvol: Nvol});
  if (item){  
  res.json(true);
  } else {
    res.json(false);
  }
});

app.use(express.static("public"));

// Start the server

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});