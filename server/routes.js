const router = require("express").Router();
const { MongoClient, ObjectId } = require("mongodb");

require('dotenv').config();

const {MONGO_URI} = process.env;

const options = {   useNewUrlParser: true,
                    useUnifiedTopology: true,};

router.get("/get-user/:pokeId", async (req, res) => {//from PokeHome
  let { pokeId } = req.params;
  pokeId = Number(pokeId);
  console.log("params", req.params, pokeId);
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db('poketrainer');

    // Check if a user with the same sub already exists
    const existingUser = await db.collection("users").findOne({ pokeId });

    if (existingUser) {
      console.log("user found", existingUser);
      return res.status(201).json({ status: 201, data: existingUser });
    }else{
      console.log("user not found", existingUser);
      return res.status(409).json({ status: 409, error: "User does not exist" });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, error: err.message });
  } finally {
    client.close();
    console.log("Now disconnected!!");
  }
});

router.post("/create-get-user", async (req, res) => {//from PokeSignin
  const { name, sub, nickname, picture } = req.body;
  console.log(req.body);
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db('poketrainer');

    // Check if a user with the same sub already exists
    const existingUser = await db.collection("users").findOne({ sub });

    if (existingUser) {
      // return res.status(409).json({ status: 409, error: "User already exists" });
      console.log("user found", existingUser);
      return res.status(200).json({ status: 201, data: existingUser });
    }

    // Find the number of existing users to calculate the next pokeId
    const existingUsersCount = await db.collection("users").countDocuments();

    // Calculate the next pokeId (starting from 100)
    const nextPokeId = 100 + existingUsersCount;
    // Fix 30 days from now
    const today = new Date();
    const dueDate = new Date(today.getTime()); // Create a new Date object based on the current date
    dueDate.setDate(today.getDate() + 30);
    // Create the new user object with pokeId
    const newUser = {
      ...req.body,
      pokeId: nextPokeId,
      pokeGoals: {pokegoal1:{pokemon: "x",
                  pokeimg: "x",
                  pokelvl: 0,
                  goalType: "x",
                  currentState: "",
                  goalState: "",
                  firstDay: new Date(),
                  lastDay: dueDate,
                  }, 

                  pokegoal2:{pokemon: "x",
                  pokeimg: "x",
                  pokelvl: 0,
                  goalType: "x",
                  currentState: "",
                  goalState: "",
                  firstDay: new Date(),
                  lastDay: dueDate,
                  }, 

                  pokegoal3:{pokemon: "x",
                  pokeimg: "x",
                  pokelvl: 0,
                  goalType: "x",
                  currentState: "",
                  goalState: "",
                  firstDay: new Date(),
                  lastDay: dueDate,
                  }},
    };
    console.log("new user", newUser);

    // Insert the new user into the database
    const result = await db.collection("users").insertOne(newUser);
    console.log("result", result, "count", existingUsersCount);

    res.status(201).json({ status: 201, data: newUser });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, error: err.message });
  } finally {
    client.close();
    console.log("Now disconnected!!");
  }
});


router.post("/assign-goal", async (req, res) => {
  const { _id, sub, pokeGoals   } = req.body;
  // console.log(req.body);
  // console.log("pokeGoals", pokeGoals);
  // console.log("_id", _id);
  // console.log("sub", sub);
  let id = new ObjectId(_id);
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db('poketrainer');
    // Check if a user with the same sub already exists
    const existingUser = await db.collection("users").findOne({ _id: id });
    if (existingUser) {
      // Update the existing user's data with the data from req.body
      const updateResult = await db.collection("users").updateOne(
        { _id: id },
        { $set: {pokeGoals} } // Replace the existing user's data with the new data
      );
      // console.log("update result:", updateResult);
      if (updateResult.matchedCount > 0) {
        return res.status(200).json({ status: 200, data: existingUser });
      }

      return res.status(200).json({ status: 200, data: existingUser });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, error: err.message });
  } finally {
    client.close();
    console.log("Now disconnected!!");
  }
});

module.exports = router;
// module.exports = {router, seats};
