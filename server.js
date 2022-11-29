const express = require('express')
require("dotenv").config();
const app = express()
const cors = require("cors");
port = process.env.PORT || 5000
var ObjectId = require('mongodb').ObjectId

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.stqo7hs.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Blog Collection 
const dbName = process.env.DB_NAME;
const blogCollec = process.env.Blog_Collect;
const usersCollec = process.env.usersCollect;


// Category Collection 
const categoryCollection = process.env.CategoryCol;



async function run() {
  try {
    await client.connect();
    const blogCollections = client.db(dbName).collection(blogCollec);
    const usersCollections = client.db(dbName).collection(usersCollec);
    const categories = client.db(dbName).collection(categoryCollection);



// Home Route 

    app.get('/',(req,res)=>{
      res.send("This server is running")
    })

 // Check Admin
    app.get('/hello/dashboards/login',(req,res)=>{
      const data = req.body;
      console.log(data)

    })


    // Get All Blogs

    app.get("/blogs", async (req, res) => {
      const allblogs = await blogCollections.find({}).toArray();
      res.send(allblogs);
    });



   // Show single page blog 

    app.get('/blogs/:id', async (req, res) => {
      const id = req.params;
      const query = { _id: ObjectId(id) };
      const result = await blogCollections.findOne(query);
      res.send(result);
    });

  
// Show Categories 


app.get('/categories',async (req,res)=>{
  const allCategories = await categories.find({}).toArray();
  res.send(allCategories);
})



    // Dashbord Add new post 

    app.post(("/addnewarticle",(req,res)=>{
      const data = req.body
      console.log(data)
    }))
  
  


  } catch {}
}

run().catch(console.dir);






app.listen(port, () => {
  console.log(`our server is running ${port}`)
})