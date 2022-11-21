mongodb+srv://elites:<password>@cluster0.stqo7hs.mongodb.net/?retryWrites=true&w=majority


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://elites:<password>@cluster0.stqo7hs.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fl2wrhe.mongodb.net/?retryWrites=true&w=majority`


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.stqo7hs.mongodb.net/?retryWrites=true&w=majority`