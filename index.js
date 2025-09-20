// /* eslint-disable @typescript-eslint/no-require-imports */
// import express from 'express';
// import cors from 'cors';
// import dotenv from "dotenv"; 
// import { MongoClient, ServerApiVersion } from "mongodb";
// dotenv.config();
// const app=express();
// const port=process.env.PORT||5000;
// // app.use(cors());
// app.use(
//   cors()
// );
// app.use(express.json());
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fxxuhv1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//     try{
//         // await client.connect();
//         const database=client.db('airbnb');
//         const placesinDhakaData=database.collection("placesinDhaka");
//         const destinationsData=database.collection("destinations");
//         const busanData=database.collection("busan");
//         const kuaData=database.collection("kualalampur");

//         app.get("/places-in-dhaka",async(req,res)=>{
//             const cursor=placesinDhakaData.find();
//             const result=await cursor.toArray();
//             res.send(result);
//         })
//          app.get("/places-in-busan",async(req,res)=>{
//             const cursor=busanData.find();
//             const result=await cursor.toArray();
//             // console.log(result);
//             res.send(result);
//         })
//         app.get("/places-in-kualalampur",async(req,res)=>{
//             const cursor=kuaData.find();
//             const result=await cursor.toArray();
//             // console.log(result);
//             res.send(result);
//         })
//         app.get("/search-destinations",async(req,res)=>{
//             const cursor=destinationsData.find();
//             const result=await cursor.toArray();
//             res.send(result);
//         })
//      } finally {
//   }
// }
// run().catch(console.dir);

// app.listen(port, () => {
//   console.log(`server is running on port ${port}`);
// });
import express from 'express';
import cors from 'cors';
import { MongoClient, ServerApiVersion } from "mongodb";

const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fxxuhv1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function getCollections() {
  // await client.connect();
  const database = client.db('airbnb');
  return {
    placesinDhakaData: database.collection("placesinDhaka"),
    destinationsData: database.collection("destinations"),
    busanData: database.collection("busan"),
    kuaData: database.collection("kualalampur"),
  };
}

// Routes

app.get("/", (req, res) => {
  res.send("Airbnb backend is running!");
});

app.get("/places-in-dhaka", async (req, res) => {
  const { placesinDhakaData } = await getCollections();
  const result = await placesinDhakaData.find().toArray();
  res.json(result);
});

app.get("/places-in-busan", async (req, res) => {
  const { busanData } = await getCollections();
  const result = await busanData.find().toArray();
  res.json(result);
});

app.get("/places-in-kualalampur", async (req, res) => {
  const { kuaData } = await getCollections();
  const result = await kuaData.find().toArray();
  res.json(result);
});

app.get("/search-destinations", async (req, res) => {
  const { destinationsData } = await getCollections();
  const result = await destinationsData.find().toArray();
  res.json(result);
});


export default app;
