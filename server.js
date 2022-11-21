const express = require('express')
require("dotenv").config();
const app = express()
const cors = require("cors");
port = process.env.PORT || 5000
const ObjectId = require('mongodb').ObjectId;

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.stqo7hs.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const dbName = process.env.DB_NAME;
const blogCollec = process.env.Bio_Collect;


async function run() {
  try {
    await client.connect();
    const blogCollections = client
    .db(dbName)
    .collection(blogCollec);


    app.get('/',(req,res)=>{
      res.send("This server is running")
    })
    // Get All Blogs 

    app.get("/blogs", async (req, res) => {
      const allblogs = await blogCollections.find({}).toArray();
      res.send(allblogs);
      console.log(allblogs)
    });

    
    app.get('/blogs/:id', async (req, res) => {
      const id = req.params;
      const query = { _id: ObjectId(id) };
      const result = await blogCollections.findOne(query);
      res.send(result);
    });


  } catch {}
}

run().catch(console.dir);






app.listen(port, () => {
  console.log(`our server is running ${port}`)
})