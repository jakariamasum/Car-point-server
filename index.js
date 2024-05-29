const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const userListCollection = client
      .db("carCollection")
      .collection("usersList");
    const productListingsBySellers = client
      .db("carCollection")
      .collection("oldCarsByUsers");
    const savedAdsListCollection = client
      .db("carCollection")
      .collection("savedAdsList");
    const feedbackListCollection = client
      .db("carCollection")
      .collection("allFeedbacks");
    const allBidsCollection = client.db("carCollection").collection("allBids");

    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_WEB_TOKEN, {
        expiresIn: "72h",
      });
      res.send({ token });
    });

    // verify token middleware
    const verifyToken = (req, res, next) => {
      const tokenAuthorization = req.headers.authorization;
      if (!tokenAuthorization) {
        return res.status(401).send({ message: "Unauthorized" });
      }
      const token = tokenAuthorization.split(" ")[1];
      // verify token
      jwt.verify(token, process.env.ACCESS_WEB_TOKEN, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Unauthorized" });
        }
        req.decoded = decoded;
        next();
      });
    };

    // verify admin middleware
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userListCollection.findOne(query);
      const isAdmin = user?.userType === "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "Forbidden access!" });
      }
      next();
    };

    // post new created user data to database
    app.post("/newUserApi", async (req, res) => {
      const newUserInfo = req.body;
      const query = { email: newUserInfo?.email };
      const existingUser = await userListCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "User already exists", insertedId: null });
      } else {
        const result = await userListCollection.insertOne(newUserInfo);
        res.send(result);
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
