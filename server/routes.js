const router = require("express").Router();
const { MongoClient } = require("mongodb");

require('dotenv').config();

const {MONGO_URI} = process.env;

const options = {   useNewUrlParser: true,
                    useUnifiedTopology: true,};

router.post("/create-user", async (req, res) => {
    const { name, sub, nickname, picture } = req.body;
  console.log(req.body);
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db('poketrainer');

    // Check if a user with the same sub already exists
    const existingUser = await db.collection("users").findOne({ sub });

    if (existingUser) {
      return res.status(409).json({ status: 409, error: "User already exists" });
    }

    // Find the number of existing users to calculate the next pokeId
    const existingUsersCount = await db.collection("users").countDocuments();

    // Calculate the next pokeId (starting from 100)
    const nextPokeId = 100 + existingUsersCount;

    // Create the new user object with pokeId
    const newUser = {
      ...req.body,
      pokeId: nextPokeId,
    };
    console.log("new user", newUser);
    // Insert the new user into the database
    const result = await db.collection("users").insertOne(newUser);
    // console.log("result", result, "count", existingUsersCount);

    res.status(201).json({ status: 201, data: newUser });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, error: err.message });
  } finally {
    client.close();
    console.log("Now disconnected!!");
  }
})


router.post("/api/book-seat", 
// bookSeat

// async (req, res) => {
//   const { seatId, creditCard, expiration } = req.body;

//   if (!state) {
//     state = {
//       bookedSeats: randomlyBookSeats(30),
//     };
//   }

//   await delay(Math.random() * 3000);

//   const isAlreadyBooked = !!state.bookedSeats[seatId];
//   if (isAlreadyBooked) {
//     return res.status(400).json({
//       message: "This seat has already been booked!",
//     });
//   }

//   if (!creditCard || !expiration) {
//     return res.status(400).json({
//       status: 400,
//       message: "Please provide credit card information!",
//     });
//   }

//   if (lastBookingAttemptSucceeded) {
//     lastBookingAttemptSucceeded = !lastBookingAttemptSucceeded;

//     return res.status(500).json({
//       message: "An unknown error has occurred. Please try your request again.",
//     });
//   }

//   lastBookingAttemptSucceeded = !lastBookingAttemptSucceeded;

//   state.bookedSeats[seatId] = true;

//   return res.status(200).json({
//     status: 200,
//     success: true,
//   });}
  );

module.exports = router;
// module.exports = {router, seats};
