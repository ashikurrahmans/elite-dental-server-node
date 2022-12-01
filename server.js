const express = require('express')
require("dotenv").config();
const app = express()
const cors = require("cors");
port = process.env.PORT || 4000
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
    app.get('/users',(req,res)=>{
      const data = req.body;
      console.log(data)
      res.send(data)

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
  

    app.delete("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await blogCollections.deleteOne(query);
      res.send(result);
    })

  
// Show Categories 


app.get('/categories',async (req,res)=>{
  const allCategories = await categories.find({}).toArray();
  res.send(allCategories);
})


// Add New Category Form Dashboard 

app.post("/categories",async(req,res)=>{
  const newCategory = req.body;
  const result = await categories.insertOne(newCategory);
  res.send(result)
})


// Delete a Category From Dashboard

app.delete("/categories/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await categories.deleteOne(query);
  res.send(result);
})


    // // Dashbord Add new post 

    // app.post(("",(req,res)=>{
    //   const data = req.body
    //   console.log(data)
    // }))
  
  


  } catch {}
}

run().catch(console.dir);



app.listen(port, () => {
  console.log(`our server is running ${port}`)
})