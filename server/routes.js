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
                  firstState: "",
                  goalState: "",
                  dailyTask: "",
                  firstDay: new Date(),
                  lastDay: "",
                  }, 

                  pokegoal2:{pokemon: "x",
                  pokeimg: "x",
                  pokelvl: 0,
                  goalType: "x",
                  firstState: "",
                  goalState: "",
                  dailyTask: "",
                  firstDay: new Date(),
                  lastDay: "",
                  }, 

                  pokegoal3:{pokemon: "x",
                  pokeimg: "x",
                  pokelvl: 0,
                  goalType: "x",
                  firstState: "",
                  goalState: "",
                  dailyTask: "",
                  firstDay: new Date(),
                  lastDay: "",
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


router.post(`/:pokeId/:pokemon/setgoaldets/:pokegoal`, async (req, res) => {
  console.log("req.body", req.body);
  console.log("params", req.params);
  const myGoalDets = req.body;
  let { pokegoal, pokeId, pokemon } = req.params;
  pokeId = Number(pokeId);
  // console.log("myGoalDets", myGoalDets);
  // console.log("pokeId", pokeId);
  // console.log("pokegoal", pokegoal);
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db('poketrainer');
    // Check if a user with the same sub already exists
    const existingUser = await db.collection("users").findOne({ pokeId: pokeId });
    if (existingUser) {
      let myPokeGoalUpdated = {...existingUser.pokeGoals[pokegoal], ...myGoalDets};
      console.log("myPokeGoalUpdated", myPokeGoalUpdated);
      // Update the existing user's data with the data from req.body
      const updateResult = await db.collection("users").updateOne(
        { pokeId: pokeId },
        { $set: {[`pokeGoals.${pokegoal}`]: {...myPokeGoalUpdated}} } // Replace the existing user's data with the new data
      );
      console.log("existing user:", existingUser);
      console.log("updatedResult:", updateResult);

      if (updateResult.matchedCount > 0) {
        return res.status(200).json({ status: 200, data: existingUser, pokegoalUpdated: myPokeGoalUpdated });
      }
      // return res.status(200).json({ status: 200, data: existingUser });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, error: err.message });
  } finally {
    client.close();
    console.log("Now disconnected!!");
  }
});


router.post(`/:pokeId/:pokemon/setgoaldates/:pokegoal`, async (req, res) => {
  console.log("req.body", req.body);
  console.log("params", req.params);
  const myGoalDates = req.body;
  let { pokegoal, pokeId, pokemon } = req.params;
  pokeId = Number(pokeId);
  // console.log("myGoalDets", myGoalDets);
  // console.log("pokeId", pokeId);
  // console.log("pokegoal", pokegoal);
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db('poketrainer');
    // Check if a user with the same sub already exists
    const existingUser = await db.collection("users").findOne({ pokeId: pokeId });
    if (existingUser) {
      let myPokeGoalUpdated = {...existingUser.pokeGoals[pokegoal], ...myGoalDates};
      console.log("myPokeGoalUpdated", myPokeGoalUpdated);
      // Update the existing user's data with the data from req.body
      const updateResult = await db.collection("users").updateOne(
        { pokeId: pokeId },
        { $set: {[`pokeGoals.${pokegoal}`]: {...myPokeGoalUpdated}} } // Replace the existing user's data with the new data
      );
      console.log("existing user:", existingUser);
      // console.log("updatedResult:", updateResult);

      if (updateResult.matchedCount > 0) {
        return res.status(200).json({ status: 200, data: existingUser, pokegoalUpdated: myPokeGoalUpdated });
      }
      // return res.status(200).json({ status: 200, data: existingUser });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, error: err.message });
  } finally {
    client.close();
    console.log("Now disconnected!!");
  }
});


router.post(`/:pokeId/:pokemon/:pokegoal/setgoaldays/`, async (req, res) => {
  // console.log("req.body", req.body);
  // console.log("params", req.params);
  const {daysObj, checkDays} = req.body;
  const myGoalDays = daysObj;
  let { pokegoal, pokeId, pokemon } = req.params;
  pokeId = Number(pokeId);
  console.log("checkdays", checkDays);
  console.log("daysObj", daysObj);
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db('poketrainer');
    // Check if a user with the same sub already exists
    const existingUser = await db.collection("users").findOne({ pokeId: pokeId });
    if (existingUser) {
      let myPokeGoalUpdated = {...existingUser.pokeGoals[pokegoal], 
                              myJourney: {...myGoalDays},
                              checkDays};
      console.log("myPokeGoalUpdated", myPokeGoalUpdated);
      // Update the existing user's data with the data from req.body
      const updateResult = await db.collection("users").updateOne(
        { pokeId: pokeId },
        { $set: {[`pokeGoals.${pokegoal}`]: {...myPokeGoalUpdated}} } // Replace the existing user's data with the new data
      );
      // console.log("existing user:", existingUser);

      if (updateResult.matchedCount > 0) {
        return res.status(200).json({ status: 200, data: existingUser, pokegoalUpdated: myPokeGoalUpdated });
      }
    }
    }catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, error: err.message });
  } finally {
    client.close();
    console.log("Now disconnected!!");
  }
});


router.post(`/delete-pokegoal/:pokegoal/:pokeId`, async (req, res) => {
  let {  pokeId, pokegoal } = req.params;
  const myOldPokegoal = req.body;
  const myPokegoal2Delete = pokegoal;
  // console.log("req.body", req.body);
  // console.log("req.params", req.params);
  console.log("-------------------------", req.params);
  console.log("myOldPokegoal", myOldPokegoal);
  console.log("pokegoal", pokegoal);
  pokeId = Number(pokeId);
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db('poketrainer');
    // Check if a user with the same sub already exists
    const existingUser = await db.collection("users").findOne({ pokeId: pokeId });
    if (existingUser) {
      let index = 1 ;
      index = (existingUser?.index) 
            ? (existingUser.index + 1) 
            : 1;
      let myPokeGoalUpdated = {pokemon: "x",
                              pokeimg: "x",
                              pokelvl: 0,
                              goalType: "x",
                              firstState: "",
                              goalState: "",
                              dailyTask: "",
                              firstDay: new Date(),
                              lastDay: "",
                              };
      console.log("index here", index);
      console.log("myPokegoal to delete", myPokegoal2Delete)
      console.log("myPokeGoalUpdated", myPokeGoalUpdated);
      // Update the existing user's data with the data from req.body
      const updateResult = await db.collection("users").updateOne(
        { pokeId: pokeId },
        { $set: {
              [`pokeGoals.${myPokegoal2Delete}`]: {...myPokeGoalUpdated},
              index: index ,      
              oldPokegoals: { ...existingUser.oldPokegoals,
                 [`oldPokegoal${index}`]: {...myOldPokegoal}} 
              } } 
      );
      // console.log("existing user:", existingUser);

      // if (updateResult.matchedCount > 0) {
        return res.status(200).json({ status: 200, data: existingUser, pokegoalUpdated: myPokeGoalUpdated });
      // }
    }
    }catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, error: err.message });
  } finally {
    client.close();
    console.log("Now disconnected!!");
  }
});
module.exports = router;
// module.exports = {router, seats};
